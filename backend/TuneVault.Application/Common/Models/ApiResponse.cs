namespace TuneVault.Application.Common.Models
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public List<string>? Errors { get; set; }

        // Hàm tiện ích trả về thành công
        public static ApiResponse<T> SuccessResponse(T data, string message = "Thành công")
        {
            return new ApiResponse<T> { Success = true, Data = data, Message = message };
        }

        // Hàm tiện ích trả về thất bại
        public static ApiResponse<T> FailureResponse(List<string> errors, string message = "Có lỗi xảy ra")
        {
            return new ApiResponse<T> { Success = false, Errors = errors, Message = message };
        }
    }
}