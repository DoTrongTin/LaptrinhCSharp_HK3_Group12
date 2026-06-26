using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;

namespace TuneVault.Application.Features.Interactions.Commands.ToggleFavorite
{
    public class ToggleFavoriteHandler : IRequestHandler<ToggleFavoriteCommand, bool>
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ToggleFavoriteHandler(IFavoriteRepository favoriteRepository, IUnitOfWork unitOfWork)
        {
            _favoriteRepository = favoriteRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(ToggleFavoriteCommand request, CancellationToken cancellationToken)
        {
            var existing = await _favoriteRepository.GetByUserAndMediaAsync(request.UserId, request.MediaId, cancellationToken);

            if (existing != null)
            {
                _favoriteRepository.Remove(existing); // Nếu thích rồi thì Bỏ thích
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return false;
            }

            // Nếu chưa thích thì thêm mới vào DB
            var favorite = new Favorite
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                MediaItemId = request.MediaId
            };

            await _favoriteRepository.AddAsync(favorite, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}