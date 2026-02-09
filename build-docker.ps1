Write-Host "🚀 Building Weather Dashboard Docker Images..." -ForegroundColor Cyan

# Build Backend
Write-Host "`n📦 Building Backend Image..." -ForegroundColor Yellow
docker build -t weather-backend:latest -f server/Dockerfile server/

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend image built successfully" -ForegroundColor Green

# Build Frontend
Write-Host "`n🌐 Building Frontend Image..." -ForegroundColor Yellow
docker build -t weather-frontend:latest -f client/Dockerfile client/

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend image built successfully" -ForegroundColor Green

# List images
Write-Host "`n📋 Built Images:" -ForegroundColor Cyan
docker images | Select-String "weather-"

Write-Host "`n🎉 Docker images built successfully!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Run with Docker Compose: docker-compose up" -ForegroundColor White
Write-Host "2. Tag for Docker Hub: docker tag weather-backend:latest yourusername/weather-backend:latest" -ForegroundColor White
Write-Host "3. Push to Docker Hub: docker push yourusername/weather-backend:latest" -ForegroundColor White
