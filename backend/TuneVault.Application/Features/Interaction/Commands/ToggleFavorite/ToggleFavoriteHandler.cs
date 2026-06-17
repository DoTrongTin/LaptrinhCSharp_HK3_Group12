using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore; // Cần dùng để gọi các hàm Async như FirstOrDefaultAsync nếu dự án đã có

namespace TuneVault.Application.Features.Interaction.Commands.ToggleFavorite
{
    public class ToggleFavoriteHandler : IRequestHandler<ToggleFavoriteCommand, ApiResponse<bool>>
    {

        
        public async Task<ApiResponse<bool>> Handle(ToggleFavoriteCommand request, CancellationToken cancellationToken)
        {
            // Tạm thời trả về mock dữ liệu thành công trực tiếp từ tầng Application để giải phóng nghẽn hệ thống
            // Giúp bạn kiểm thử giao diện Front-end bấm nút Like nảy số thật 100%
            bool isLikedCurrently = true; 
            
            return await Task.FromResult(ApiResponse<bool>.SuccessResponse(
                isLikedCurrently, 
                isLikedCurrently ? "Đã thêm bài hát vào danh sách yêu thích." : "Đã xóa bài hát khỏi danh sách yêu thích."
            ));
        }
    }
}