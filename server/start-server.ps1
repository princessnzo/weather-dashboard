Write-Host "Starting Weather Dashboard Server..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if server.js exists
if (!(Test-Path "server.js")) {
    Write-Host "Error: server.js not found!" -ForegroundColor Red
    exit 1
}

# Start the server
try {
    Write-Host "Server starting on http://localhost:5001" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host ""
    node server.js
} catch {
    Write-Host "Failed to start server: $_" -ForegroundColor Red
    exit 1
}
