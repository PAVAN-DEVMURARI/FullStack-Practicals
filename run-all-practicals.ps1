# FullStack College Practicals - Run All Projects Script
# Updated script for the unified repository structure

$reactProjects = @(
    "Practical 3\practical3",
    "Practical 4", 
    "Practical 5",
    "Practical 6", 
    "Practical 7",
    "Practical 8",
    "Practical 11"
)

$expressProjects = @(
    "Practical 9"
)

$staticProjects = @(
    "Practical 1\index.html",
    "practical2.html"
)

$port = 3000

Write-Host "=== FULLSTACK COLLEGE PRACTICALS ===" -ForegroundColor Green
Write-Host "Running all projects from the unified repository`n" -ForegroundColor Yellow

Write-Host "=== INSTALLING DEPENDENCIES ===" -ForegroundColor Cyan

# Install dependencies for React projects
foreach ($project in $reactProjects) {
    if (Test-Path $project) {
        Write-Host "Installing dependencies for $project..." -ForegroundColor Yellow
        Set-Location $project
        npm install
        Set-Location $using:PWD
    }
}

# Install dependencies for Express projects  
foreach ($project in $expressProjects) {
    if (Test-Path $project) {
        Write-Host "Installing dependencies for $project..." -ForegroundColor Yellow
        Set-Location $project
        npm install
        Set-Location $using:PWD
    }
}

Write-Host "`n=== STARTING PROJECTS ===" -ForegroundColor Green

# Start React projects
foreach ($project in $reactProjects) {
    if (Test-Path $project) {
        Write-Host "Starting $project (React) on port $port..." -ForegroundColor Magenta
        
        $command = "cd '$project'; npm run dev -- --port $port; Read-Host 'Press Enter to close'"
        Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", $command
        
        Write-Host "$project → http://localhost:$port" -ForegroundColor Green
        $port++
        Start-Sleep -Seconds 1
    }
}

# Start Express projects
foreach ($project in $expressProjects) {
    if (Test-Path $project) {
        Write-Host "Starting $project (Express) on port $port..." -ForegroundColor Cyan
        
        $command = "cd '$project'; `$env:PORT=$port; npm start; Read-Host 'Press Enter to close'"
        Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", $command
        
        Write-Host "$project → http://localhost:$port" -ForegroundColor Green
        $port++
        Start-Sleep -Seconds 1
    }
}

Write-Host "`n=== STATIC PROJECTS ===" -ForegroundColor Yellow
Write-Host "Open these files directly in your browser:" -ForegroundColor Yellow
foreach ($project in $staticProjects) {
    if (Test-Path $project) {
        $fullPath = (Resolve-Path $project).Path
        Write-Host "• $project → file:///$($fullPath.Replace('\', '/'))" -ForegroundColor White
    }
}

Write-Host "`n=== ALL PROJECTS STARTED ===" -ForegroundColor Green
Write-Host "🎉 Your FullStack College Practicals are now running!" -ForegroundColor Yellow
Write-Host "`nProject URLs:" -ForegroundColor Cyan

$port = 3000
foreach ($project in ($reactProjects + $expressProjects)) {
    if (Test-Path $project) {
        Write-Host "• $project → http://localhost:$port" -ForegroundColor White
        $port++
    }
}

Write-Host "`nTo stop all projects:" -ForegroundColor Red
Write-Host "Get-Process -Name node | Stop-Process -Force" -ForegroundColor White