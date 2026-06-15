using System.Net;
using System.Text.Json;
using FluentValidation;
using TuneVault.Application.Common.Models;

namespace TuneVault.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Cho phép Request đi tiếp vào Controller
                await _next(context);
            }
            catch (Exception ex)
            {
                // Ghi log lỗi để dev check
                _logger.LogError(ex, "Lỗi hệ thống: {Message}", ex.Message);
                
                // Xử lý và trả về JSON
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            
            var statusCode = HttpStatusCode.InternalServerError;
            var errors = new List<string>();
            var message = "Đã xảy ra lỗi hệ thống cục bộ.";

            switch (exception)
            {
                case ValidationException validationEx:
                    // Lỗi từ FluentValidation (nhập thiếu thông tin, sai định dạng...)
                    statusCode = HttpStatusCode.BadRequest;
                    message = "Dữ liệu đầu vào không hợp lệ.";
                    errors = validationEx.Errors.Select(e => e.ErrorMessage).ToList();
                    break;
                    
                case UnauthorizedAccessException:
                    // Lỗi chưa đăng nhập
                    statusCode = HttpStatusCode.Unauthorized;
                    message = exception.Message;
                    break;
                    
                // (Bạn có thể thêm các case lỗi custom khác ở đây)
            }

            context.Response.StatusCode = (int)statusCode;

            var response = ApiResponse<object>.FailureResponse(errors, message);
            var jsonResponse = JsonSerializer.Serialize(response, new JsonSerializerOptions 
            { 
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
            });

            return context.Response.WriteAsync(jsonResponse);
        }
    }
}