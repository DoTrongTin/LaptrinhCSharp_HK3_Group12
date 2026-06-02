using MediatR;
using Microsoft.Extensions.Logging;

namespace TuneVault.Application.Common.Behaviors;

public class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        var requestName = typeof(TRequest).Name;
        logger.LogInformation("Executing request: {RequestName}", requestName);

        try
        {
            var result = await next();
            logger.LogInformation("Request completed: {RequestName}", requestName);
            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Request failed: {RequestName}", requestName);
            throw;
        }
    }
}
