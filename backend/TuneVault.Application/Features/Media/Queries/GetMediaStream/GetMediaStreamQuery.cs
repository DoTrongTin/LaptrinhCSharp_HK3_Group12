using MediatR;
using System;
using TuneVault.Application.Features.Media.DTOs;

namespace TuneVault.Application.Features.Media.Queries.GetMediaStream
{
    public class GetMediaStreamQuery : IRequest<string?>
    {
        public Guid Id { get; set; }
    }
}