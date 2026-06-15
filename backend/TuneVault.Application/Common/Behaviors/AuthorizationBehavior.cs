using MediatR;
using TuneVault.Application.Common.Interfaces;

namespace TuneVault.Application.Common.Behaviors
{
    // 1. Interface đánh dấu: Command nào cần Auth thì kế thừa cái này
    public interface IAuthorizeableRequest<TResponse> : IRequest<TResponse>
    {
        Guid UserId { get; set; } // Ép buộc Command phải có trường UserId
    }

    // 2. Logic của Behavior
    public class AuthorizationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly ICurrentUserService _currentUserService;

        public AuthorizationBehavior(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            // Kiểm tra xem Request này có yêu cầu đăng nhập không?
            if (request is IAuthorizeableRequest<TResponse> authRequest)
            {
                // Nếu chưa đăng nhập -> Ném lỗi 401
                if (!_currentUserService.IsAuthenticated || _currentUserService.UserId == null)
                {
                    throw new UnauthorizedAccessException("Bạn cần đăng nhập để thực hiện chức năng này.");
                }

                // Tự động gán UserId từ JWT Token vào Command
                // (Giúp Developer không cần phải gán tay bằng code trong Controller nữa)
                authRequest.UserId = _currentUserService.UserId.Value;
            }

            return await next();
        }
    }
}