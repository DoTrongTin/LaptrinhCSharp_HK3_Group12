using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TuneVault.Application.Common.Behaviors;

namespace TuneVault.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // 1. Đăng ký AutoMapper (Nếu bạn có xài)
           services.AddAutoMapper(cfg => cfg.AddMaps(typeof(DependencyInjection).Assembly));

            // 2. Đăng ký toàn bộ FluentValidation Rules
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            // 3. Đăng ký MediatR và nhúng các Behaviors vào Pipeline
            services.AddMediatR(cfg => {
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
                
                // THỨ TỰ ĐĂNG KÝ BEHAVIOR CỰC KỲ QUAN TRỌNG (Cái nào đăng ký trước sẽ chạy trước)
                // Luồng chạy: Logging -> Auth -> Validation -> Handler
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehavior<,>));
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            });

            return services;
        }
    }
}