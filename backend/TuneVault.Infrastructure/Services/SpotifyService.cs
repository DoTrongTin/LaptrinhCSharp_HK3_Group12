using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace TuneVault.Infrastructure.Services
{
    public class SpotifyService
    {
        private readonly HttpClient _httpClient;
        private readonly string _clientId;
        private readonly string _clientSecret;
        
        // Biến lưu trữ Token trong bộ nhớ tạm (In-memory cache)
        private string? _accessToken;
        private DateTime _tokenExpiration;

        public SpotifyService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _clientId = configuration["Spotify:ClientId"] ?? throw new ArgumentNullException("Spotify ClientId đang bị thiếu trong appsettings.json");
            _clientSecret = configuration["Spotify:ClientSecret"] ?? throw new ArgumentNullException("Spotify ClientSecret đang bị thiếu trong appsettings.json");
        }

        /// <summary>
        /// Hàm nội bộ tự động kiểm tra và lấy Access Token theo cơ chế Client Credentials Flow
        /// </summary>
        private async Task<string> GetAccessTokenAsync()
        {
            // Nếu token vẫn còn hạn (trừ hao 5 phút chống lệch giây giữa các server), sử dụng lại luôn
            if (!string.IsNullOrEmpty(_accessToken) && DateTime.UtcNow < _tokenExpiration)
            {
                return _accessToken;
            }

            var request = new HttpRequestMessage(HttpMethod.Post, "https://accounts.spotify.com/api/token");
            
            // Đóng gói Client ID & Secret thành biểu mẫu FormUrlEncoded theo yêu cầu của Spotify
            var collection = new List<KeyValuePair<string, string>>
            {
                new("grant_type", "client_credentials"),
                new("client_id", _clientId),
                new("client_secret", _clientSecret)
            };
            
            request.Content = new FormUrlEncodedContent(collection);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(jsonString);
            var root = doc.RootElement;

            _accessToken = root.GetProperty("access_token").GetString();
            int expiresIn = root.GetProperty("expires_in").GetInt32();
            
            // Tính thời gian hết hạn thực tế (Trừ bớt 300 giây ~ 5 phút cho an toàn)
            _tokenExpiration = DateTime.UtcNow.AddSeconds(expiresIn - 300); 

            return _accessToken!;
        }

        /// <summary>
        /// Lấy danh sách các bài hát/Album mới phát hành trên Spotify (Trending)
        /// </summary>
        public async Task<JsonElement> GetNewReleasesAsync()
        {
            var token = await GetAccessTokenAsync();
            
            var request = new HttpRequestMessage(HttpMethod.Get, "https://api.spotify.com/v1/browse/new-releases?limit=20");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(jsonString);
            
            // Trả về nhánh chứa mảng danh sách các item
            return doc.RootElement.GetProperty("albums").GetProperty("items").Clone();
        }

        /// <summary>
        /// Tìm kiếm bài hát theo từ khóa bất kỳ
        /// </summary>
        public async Task<JsonElement> SearchTracksAsync(string keyword)
        {
            var token = await GetAccessTokenAsync();
            
            var url = $"https://api.spotify.com/v1/search?q={Uri.EscapeDataString(keyword)}&type=track&limit=20";
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonString = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(jsonString);
            
            // Trả về nhánh chứa mảng danh sách bài hát tìm được
            return doc.RootElement.GetProperty("tracks").GetProperty("items").Clone();
        }
    }
}