using MediatR;
using System;

namespace TuneVault.Application.Features.Media.Commands.DeleteMedia
{
    public class DeleteMediaCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
    }
}