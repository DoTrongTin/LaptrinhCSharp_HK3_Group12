using FluentValidation;
using MediatR;
using ValidationException = FluentValidation.ValidationException;

namespace TuneVault.Application.Common.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);

                // Chạy tất cả các rule kiểm tra của FluentValidation
                var validationResults = await Task.WhenAll(
                    _validators.Select(v => v.ValidateAsync(context, cancellationToken)));

                // Gom các lỗi lại
                var failures = validationResults
                    .SelectMany(r => r.Errors)
                    .Where(f => f != null)
                    .ToList();

                // Nếu có lỗi -> ném Exception chặn luôn
                if (failures.Count != 0)
                    throw new ValidationException(failures);
            }

            // Dữ liệu hợp lệ -> Cho phép đi tiếp tới trạm (Behavior) tiếp theo hoặc Handler
            return await next();
        }
    }
}