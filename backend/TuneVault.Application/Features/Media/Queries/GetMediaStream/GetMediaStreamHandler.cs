using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TuneVault.Domain.Interfaces;
using TuneVault.Application.Features.Media.DTOs;

namespace TuneVault.Application.Features.Media.Queries.GetMediaStream
{
    public class GetMediaStreamHandler : IRequestHandler<GetMediaStreamQuery, string?>
    {
        private readonly IMediaRepository _mediaRepository;

        public GetMediaStreamHandler(IMediaRepository mediaRepository)
        {
            _mediaRepository = mediaRepository;
        }

        public async Task<string?> Handle(GetMediaStreamQuery request, CancellationToken cancellationToken)
        {
            var mediaItem = await _mediaRepository.GetByIdAsync(request.Id, cancellationToken);
            
            // Trả về FilePath tương đối để Controller xử lý luồng đọc file vật lý
            return mediaItem?.FilePath;
        }
    }
}