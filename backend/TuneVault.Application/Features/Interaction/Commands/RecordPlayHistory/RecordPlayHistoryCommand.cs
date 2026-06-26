using MediatR;
using System;

namespace TuneVault.Application.Features.Interactions.Commands.RecordPlayHistory
{
    public class RecordPlayHistoryCommand : IRequest<Unit>
    {
        public Guid UserId { get; set; }
        public Guid MediaId { get; set; }
    }
}