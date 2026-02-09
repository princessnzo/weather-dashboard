Write-Host "🚀 Building Weather Dashboard with simpler approach..." -ForegroundColor Cyan

# Clean up any existing containers
docker-compose down

# Remove old images
docker rmi weather-dashboard-backend weather-dashboard-frontend -f 2>$null

# Build with no cache to ensure fresh build
Write-Host "`n📦 Building Backend..." -ForegroundColor Yellow
docker build --no-cache -t weather-backend:latest -f server/Dockerfile server/

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    Write-Host "Trying alternative approach..." -ForegroundColor Yellow
    
    # Try building in client directory first
    cd server
    npm install --only=production
    cd ..
    
    docker build -t weather-backend:latest -f server/Dockerfile server/
    
    if ($LASTEXITCODE -ne 0) {
        exit 1
    }
}
Write-Host "✅ Backend built successfully" -ForegroundColor Green

Write-Host "`n🌐 Building Frontend..." -ForegroundColor Yellow
docker build --no-cache -t weather-frontend:latest -f client/Dockerfile client/

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    Write-Host "Trying alternative approach..." -ForegroundColor Yellow
    
    # Try building in client directory first
    cd client
    npm install
    npm run build
    cd ..
    
    docker build -t weather-frontend:latest -f client/Dockerfile client/
    
    if ($LASTEXITCODE -ne 0) {
        exit 1
    }
}
Write-Host "✅ Frontend built successfully" -ForegroundColor Green

Write-Host "`n📋 Images built:" -ForegroundColor Cyan
docker images | Select-String "weather-"

Write-Host "`n🎉 Docker images built successfully!" -ForegroundColor Green
Write-Host "`n👉 Run: docker-compose up" -ForegroundColor Yellow
