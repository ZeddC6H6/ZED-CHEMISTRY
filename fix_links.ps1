$outputDir = "C:\Users\acer\.gemini\antigravity\scratch\zed-chemistry"

$files = @(
    "index.html", "courses.html", "notes.html", "mock-tests.html", 
    "quiz.html", "quiz-results.html", "leaderboard.html", "games.html"
)

function Replace-InFile {
    param (
        [string]$Filename,
        [string]$Search,
        [string]$Replace
    )
    
    $filePath = Join-Path $outputDir $Filename
    if (-not (Test-Path $filePath)) { return }
    
    # Use -Raw to read entire file as one string
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    if ($content -match $Search) {
        # Escape $ in replacement for regex substitution if needed, but powershell -replace uses regex
        # We can use [regex]::Replace for more control
        $content = [regex]::Replace($content, $Search, $Replace)
        $content | Set-Content -Path $filePath -Encoding UTF8
        Write-Host "Updated $Filename"
    }
}

# 1. Fix index.html links

# Notes card
$search = '<a class="flex flex-col items-center gap-4 p-6 bg-primary.*?href="#">'
$replace = '<a class="flex flex-col items-center gap-4 p-6 bg-primary rounded-xl kid-card-shadow transition-transform hover:-translate-y-1 active:scale-95" href="notes.html">'
Replace-InFile "index.html" $search $replace

# Mock Tests card
$search = '<a class="flex flex-col items-center gap-4 p-6 bg-kid-green.*?href="#">'
$replace = '<a class="flex flex-col items-center gap-4 p-6 bg-kid-green rounded-xl kid-card-shadow transition-transform hover:-translate-y-1 active:scale-95" href="mock-tests.html">'
Replace-InFile "index.html" $search $replace

# Quizzes card
$search = '<a class="flex flex-col items-center gap-4 p-6 bg-kid-blue.*?href="#">'
$replace = '<a class="flex flex-col items-center gap-4 p-6 bg-kid-blue rounded-xl kid-card-shadow transition-transform hover:-translate-y-1 active:scale-95" href="quiz.html">'
Replace-InFile "index.html" $search $replace

# Bottom Nav - Home
$search = 'href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">home</span>'
$replace = 'href="index.html"><span class="material-symbols-outlined text-2xl font-bold">home</span>'
Replace-InFile "index.html" $search $replace

# Bottom Nav - Explore
$search = 'href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">explore</span>'
$replace = 'href="courses.html"><span class="material-symbols-outlined text-2xl font-bold">explore</span>'
Replace-InFile "index.html" $search $replace

# Bottom Nav - My Lab (Games)
$search = 'href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">flare</span>'
$replace = 'href="games.html"><span class="material-symbols-outlined text-2xl font-bold">flare</span>'
Replace-InFile "index.html" $search $replace

# Bottom Nav - Library (Notes)
$search = 'href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">auto_stories</span>'
$replace = 'href="notes.html"><span class="material-symbols-outlined text-2xl font-bold">auto_stories</span>'
Replace-InFile "index.html" $search $replace


# Common replacements loop
$commonReplacements = @(
    @{
        Search = '<button\s+class="[^"]*?arrow_back[^"]*?".*?>.*?<\/button>';
        Replace = '<a href="index.html" class="flex size-10 items-center justify-center rounded-full bg-background-light dark:bg-white/10 hover:bg-primary/20 transition-colors"><span class="material-symbols-outlined text-2xl">arrow_back</span></a>'
    },
    @{
        Search = '<button\s+class="flex h-12 w-12 items-center justify-center rounded-full.*?">.*?arrow_back.*?<\/button>';
        Replace = '<a href="index.html" class="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-primary/20 text-[#181711] hover:scale-105 transition-transform"><span class="material-symbols-outlined">arrow_back</span></a>'
    }
)

foreach ($file in @("courses.html", "notes.html", "mock-tests.html", "leaderboard.html", "games.html")) {
    foreach ($item in $commonReplacements) {
        Replace-InFile $file $item.Search $item.Replace
    }
}

# Fix quiz.html
# Close button
$search = '<button\s+class="flex items-center justify-center size-12 rounded-full.*?">.*?close.*?<\/button>'
$replace = '<a href="index.html" class="flex items-center justify-center size-12 rounded-full bg-background-light dark:bg-background-dark text-[#181711] dark:text-white transition-transform active:scale-95"><span class="material-symbols-outlined">close</span></a>'
Replace-InFile "quiz.html" $search $replace

# Submit button
$search = '<button\s+class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full h-16 bg-primary.*?">.*?rocket_launch.*?<\/button>'
# Use simple quote to avoid variable expansion, and be careful with unicode
$replace = '<a href="quiz-results.html" class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full h-16 bg-primary text-[#181711] text-xl font-extrabold shadow-[0_6px_0_0_#d1c11a] active:shadow-none active:translate-y-[6px] transition-all"><span>Submit Answer</span><span class="material-symbols-outlined">rocket_launch</span></a>'
Replace-InFile "quiz.html" $search $replace

# Fix quiz-results.html
# Back
$search = '<button\s+class="size-10 flex items-center justify-center rounded-full.*?">.*?arrow_back.*?<\/button>'
$replace = '<a href="quiz.html" class="size-10 flex items-center justify-center rounded-full bg-background-light dark:bg-neutral-800 text-neutral-800 dark:text-white"><span class="material-symbols-outlined">arrow_back</span></a>'
Replace-InFile "quiz-results.html" $search $replace

# Try Again
$search = '<button\s+class="w-full bg-primary.*?">.*?replay.*?<\/button>'
$replace = '<a href="quiz.html" class="w-full bg-primary hover:bg-primary/90 text-neutral-900 font-extrabold py-5 rounded-full shadow-[0_6px_0_0_#d4c310] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined">replay</span> Try Again</a>'
Replace-InFile "quiz-results.html" $search $replace

# Review
$search = '<button\s+class="w-full bg-white.*?">.*?visibility.*?<\/button>'
$replace = '<a href="index.html" class="w-full bg-white dark:bg-neutral-800 border-4 border-neutral-100 dark:border-neutral-700 text-neutral-800 dark:text-white font-extrabold py-5 rounded-full transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined text-primary">visibility</span> Review Answers</a>'
Replace-InFile "quiz-results.html" $search $replace


# General Nav Replacements
$navReplacements = @(
    @('href="#">\s*<span class="material-symbols-outlined.*?">home<\/span>', 'href="index.html"><span class="material-symbols-outlined">home</span>'),
    @('href="#">\s*<span class="material-symbols-outlined.*?">explore<\/span>', 'href="courses.html"><span class="material-symbols-outlined">explore</span>'),
    @('href="#">\s*<span class="material-symbols-outlined.*?">science<\/span>', 'href="games.html"><span class="material-symbols-outlined">science</span>'),
    @('href="#">\s*<span class="material-symbols-outlined.*?">menu_book<\/span>', 'href="notes.html"><span class="material-symbols-outlined">menu_book</span>'),
    @('href="#">\s*<span class="material-symbols-outlined.*?">quiz<\/span>', 'href="quiz.html"><span class="material-symbols-outlined">quiz</span>'),
    @('href="#">\s*<span class="material-symbols-outlined.*?">leaderboard<\/span>', 'href="leaderboard.html"><span class="material-symbols-outlined">leaderboard</span>'),
    @('href="#">\s*<span class="material-symbols-outlined.*?">person<\/span>', 'href="#"><span class="material-symbols-outlined">person</span>')
)

foreach ($file in $files) {
    if ($file -ne "index.html") {
        foreach ($pair in $navReplacements) {
            Replace-InFile $file $pair[0] $pair[1]
        }
    }
}

Write-Host "All links updated."
