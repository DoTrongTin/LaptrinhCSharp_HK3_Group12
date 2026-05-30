# TuneVault — Media Streaming Web Application

## Stack
- Backend: ASP.NET Core 8 Web API — Clean Architecture
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Database: SQL Server (EF Core 8)
- Auth: JWT + ASP.NET Core Identity
- Real-time: SignalR
- AI: Anthropic Claude API (bonus)

## Chạy local

### Backend
```bash
cd TuneVault.API
# Tạo appsettings.Development.json với connection string thật
dotnet ef database update --project ../TuneVault.Infrastructure
dotnet run
# Swagger: http://localhost:5000/swagger
```

### Frontend
```bash
cd tunevault-frontend
cp .env.example .env
npm install
npm run dev
# App: http://localhost:5173
```

## Migration
```bash
dotnet ef migrations add <TenMigration> \
  --project TuneVault.Infrastructure \
  --startup-project TuneVault.API
dotnet ef database update --startup-project TuneVault.API
```

## Tài khoản seed mặc định
- Admin: admin@tunevault.com / Admin@123
- User:  user@tunevault.com  / User@123
