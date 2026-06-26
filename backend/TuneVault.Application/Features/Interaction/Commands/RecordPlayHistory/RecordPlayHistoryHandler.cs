using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TuneVault.Domain.Entities;
using TuneVault.Domain.Interfaces;

namespace TuneVault.Application.Features.Interactions.Commands.RecordPlayHistory
{
    public class RecordPlayHistoryHandler : IRequestHandler<RecordPlayHistoryCommand, Unit>
    {
        private readonly IPlayHistoryRepository _playHistoryRepository;
        private readonly IUnitOfWork _unitOfWork;

        public RecordPlayHistoryHandler(IPlayHistoryRepository playHistoryRepository, IUnitOfWork unitOfWork)
        {
            _playHistoryRepository = playHistoryRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(RecordPlayHistoryCommand request, CancellationToken cancellationToken)
        {
            // Kiểm tra xem bài hát này user đã từng nghe chưa
            var existing = await _playHistoryRepository.GetByUserAndMediaAsync(request.UserId, request.MediaId, cancellationToken);

            if (existing != null)
            {
                existing.PlayedAt = DateTime.UtcNow; // Cập nhật lại thời gian nghe mới nhất (để đẩy lên đầu danh sách)
            }
            else
            {
                var history = new PlayHistory
                {
                    Id = Guid.NewGuid(),
                    UserId = request.UserId,
                    MediaItemId = request.MediaId
                };
                await _playHistoryRepository.AddAsync(history, cancellationToken);
            }

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}