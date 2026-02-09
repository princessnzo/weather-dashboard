param(
    [Parameter(Mandatory=$true)]
    [string]$DockerHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$Tag = "latest"
)

Write-Host "🚀 Pushing Weather Dashboard to Docker Hub..." -ForegroundColor Cyan

# Tag images
Write-Host "`n🏷️  Tagging images..." -ForegroundColor Yellow
docker tag weather-backend:latest ${DockerHubUsername}/weather-backend:${Tag}
docker tag weather-frontend:latest ${DockerHubUsername}/weather-frontend:${Tag}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tagging failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Images tagged successfully" -ForegroundColor Green

# Push to Docker Hub
Write-Host "`n📤 Pushing Backend to Docker Hub..." -ForegroundColor Yellow
docker push ${DockerHubUsername}/weather-backend:${Tag}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend push failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend pushed successfully" -ForegroundColor Green

Write-Host "`n📤 Pushing Frontend to Docker Hub..." -ForegroundColor Yellow
docker push ${DockerHubUsername}/weather-frontend:${Tag}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend push failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend pushed successfully" -ForegroundColor Green

# Create pull commands file
@"
# Weather Dashboard Docker Pull Commands
# Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Backend
docker pull ${DockerHubUsername}/weather-backend:${Tag}

## Frontend  
docker pull ${DockerHubUsername}/weather-frontend:${Tag}

## Using Docker Compose
# Create docker-compose.yml with:
# services:
#   backend:
#     image: ${DockerHubUsername}/weather-backend:${Tag}
#   frontend:
#     image: ${DockerHubUsername}/weather-frontend:${Tag}

## Quick Run
# docker run -d -p 5001:5001 --name weather-backend ${DockerHubUsername}/weather-backend:${Tag}
# docker run -d -p 3000:80 --name weather-frontend ${DockerHubUsername}/weather-frontend:${Tag}

## Health Check
# Backend: curl http://localhost:5001/api/health
# Frontend: open http://localhost:3000
"@ | Out-File -FilePath docker-pull-commands.txt -Encoding UTF8

Write-Host "`n📋 Docker Hub URLs:" -ForegroundColor Cyan
Write-Host "• Backend: https://hub.docker.com/r/${DockerHubUsername}/weather-backend" -ForegroundColor White
Write-Host "• Frontend: https://hub.docker.com/r/${DockerHubUsername}/weather-frontend" -ForegroundColor White

Write-Host "`n✅ Pull commands saved to: docker-pull-commands.txt" -ForegroundColor Green
Write-Host "`n🎉 Successfully pushed to Docker Hub!" -ForegroundColor Green
Write-Host "`n🔗 Application URLs:" -ForegroundColor Yellow
Write-Host "• Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "• Backend API: http://localhost:5001/api/health" -ForegroundColor White
Write-Host "• WebSocket: ws://localhost:5001" -ForegroundColor White
