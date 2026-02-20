$sourcePath = "C:\Users\acer\zed chemistry.html"
$outputDir = "C:\Users\acer\.gemini\antigravity\scratch\zed-chemistry"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$content = Get-Content $sourcePath -Raw

# Pattern to find each HTML document
# Matches <!DOCTYPE html> ... </html> inclusive
# Regex options: s (Singleline - dot matches newline), i (IgnoreCase)
$pattern = '(?si)<!DOCTYPE html>.*?</html>'

$matches = [regex]::Matches($content, $pattern)

$filenames = @(
    "index.html",         # Home
    "courses.html",       # My Courses
    "notes.html",         # Notes
    "mock-tests.html",    # Mock Tests
    "quiz.html",          # Quiz Session
    "quiz-results.html",  # Quiz Results
    "leaderboard.html",   # Leaderboard
    "games.html"          # Games
)

Write-Host "Found $($matches.Count) documents."

for ($i = 0; $i -lt $matches.Count; $i++) {
    if ($i -lt $filenames.Count) {
        $fname = $filenames[$i]
        $outputPath = Join-Path $outputDir $fname
        $matches[$i].Value | Set-Content -Path $outputPath -Encoding UTF8
        Write-Host "Created $fname"
    } else {
        Write-Warning "Skipping extra document $($i + 1)"
    }
}
