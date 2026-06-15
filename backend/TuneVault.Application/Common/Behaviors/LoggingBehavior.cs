using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace TuneVault.Application.Common.Behaviors
{
    public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

        public LoggingBehavior(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
        {
            _logger = logger;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            
            // 1. Ghi log trước khi chạy
            _logger.LogInformation("TuneVault Request Đang xử lý: {Name} {@Request}", requestName, request);

            var timer = new Stopwatch();
            timer.Start();

            // 2. Cho phép Request đi tiếp vào Handler
            var response = await next();

            timer.Stop();

            // 3. Ghi log thời gian hoàn thành
            _logger.LogInformation("TuneVault Request Hoàn thành: {Name} trong {ElapsedMilliseconds}ms", requestName, timer.ElapsedMilliseconds);

            // Cảnh báo nếu API chạy quá 3 giây (3000ms) - Tối ưu UX
            if (timer.ElapsedMilliseconds > 3000)
            {
                _logger.LogWarning("TuneVault Request Chạy chậm: {Name} mất {ElapsedMilliseconds}ms", requestName, timer.ElapsedMilliseconds);
            }

            return response;
        }
    }
}