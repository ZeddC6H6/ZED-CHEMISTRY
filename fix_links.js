const fs = require('fs');
const path = require('path');

const outputDir = "C:/Users/acer/.gemini/antigravity/scratch/zed-chemistry";

const files = [
    "index.html", "courses.html", "notes.html", "mock-tests.html",
    "quiz.html", "quiz-results.html", "leaderboard.html", "games.html"
];

// Helper to replace content in file
function replaceInFile(filename, replacements) {
    const filePath = path.join(outputDir, filename);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(([search, replace]) => {
        // Use global replace if search is regex, or string replaceAll
        if (search instanceof RegExp) {
            content = content.replace(search, replace);
        } else {
            content = content.replaceAll(search, replace);
        }
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filename}`);
    }
}

// 1. Fix index.html links
replaceInFile("index.html", [
    // Notes card
    [/<a class="flex flex-col items-center gap-4 p-6 bg-primary.*?href="#">/s,
        '<a class="flex flex-col items-center gap-4 p-6 bg-primary rounded-xl kid-card-shadow transition-transform hover:-translate-y-1 active:scale-95"\n                href="notes.html">'],
    // Mock Tests card
    [/<a class="flex flex-col items-center gap-4 p-6 bg-kid-green.*?href="#">/s,
        '<a class="flex flex-col items-center gap-4 p-6 bg-kid-green rounded-xl kid-card-shadow transition-transform hover:-translate-y-1 active:scale-95"\n                href="mock-tests.html">'],
    // Quizzes card
    [/<a class="flex flex-col items-center gap-4 p-6 bg-kid-blue.*?href="#">/s,
        '<a class="flex flex-col items-center gap-4 p-6 bg-kid-blue rounded-xl kid-card-shadow transition-transform hover:-translate-y-1 active:scale-95"\n                href="quiz.html">'],

    // Bottom Nav (Home, Explore, My Lab, Library)
    // Home -> index.html
    [/href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">home<\/span>/,
        'href="index.html">\n            <span class="material-symbols-outlined text-2xl font-bold">home</span>'],

    // Explore -> courses.html
    [/href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">explore<\/span>/,
        'href="courses.html">\n            <span class="material-symbols-outlined text-2xl font-bold">explore</span>'],

    // My Lab -> games.html
    [/href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">flare<\/span>/,
        'href="games.html">\n            <span class="material-symbols-outlined text-2xl font-bold">flare</span>'],

    // Library -> notes.html
    [/href="#">\s*<span class="material-symbols-outlined text-2xl font-bold">auto_stories<\/span>/,
        'href="notes.html">\n            <span class="material-symbols-outlined text-2xl font-bold">auto_stories</span>']
]);

// Helper for common back button and bottom nav
const commonReplacements = [
    // Back arrow -> index.html (generic match for back button)
    [/<button\s+class="[^"]*?arrow_back[^"]*?".*?>.*?<\/button>/s,
        '<a href="index.html" class="flex size-10 items-center justify-center rounded-full bg-background-light dark:bg-white/10 hover:bg-primary/20 transition-colors"><span class="material-symbols-outlined text-2xl">arrow_back</span></a>'],
    // Alternative back button style
    [/<button\s+class="flex h-12 w-12 items-center justify-center rounded-full.*?">.*?arrow_back.*?<\/button>/s,
        '<a href="index.html" class="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-primary/20 text-[#181711] hover:scale-105 transition-transform"><span class="material-symbols-outlined">arrow_back</span></a>'],
];

// Apply common fixes to sub-pages
["courses.html", "notes.html", "mock-tests.html", "leaderboard.html", "games.html"].forEach(file => {
    replaceInFile(file, commonReplacements);
});

// Fix quiz.html close button
replaceInFile("quiz.html", [
    [/<button\s+class="flex items-center justify-center size-12 rounded-full.*?">.*?close.*?<\/button>/s,
        '<a href="index.html" class="flex items-center justify-center size-12 rounded-full bg-background-light dark:bg-background-dark text-[#181711] dark:text-white transition-transform active:scale-95"><span class="material-symbols-outlined">close</span></a>']
]);

// Fix quiz.html submit button to link to results
replaceInFile("quiz.html", [
    [/<button\s+class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full h-16 bg-primary.*?">.*?rocket_launch.*?<\/button>/s,
        '<a href="quiz-results.html" class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full h-16 bg-primary text-[#181711] text-xl font-extrabold shadow-[0_6px_0_0_#d1c11a] active:shadow-none active:translate-y-[6px] transition-all">\n                <span>उत्तर जमा करें</span>\n                <span class="material-symbols-outlined">rocket_launch</span>\n            </a>']
]);


// Fix quiz-results.html buttons
replaceInFile("quiz-results.html", [
    // Back -> quiz.html
    [/<button\s+class="size-10 flex items-center justify-center rounded-full.*?">.*?arrow_back.*?<\/button>/s,
        '<a href="quiz.html" class="size-10 flex items-center justify-center rounded-full bg-background-light dark:bg-neutral-800 text-neutral-800 dark:text-white"><span class="material-symbols-outlined">arrow_back</span></a>'],

    // Try Again -> quiz.html
    [/<button\s+class="w-full bg-primary.*?">.*?replay.*?<\/button>/s,
        '<a href="quiz.html" class="w-full bg-primary hover:bg-primary/90 text-neutral-900 font-extrabold py-5 rounded-full shadow-[0_6px_0_0_#d4c310] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined">replay</span> फिर से कोशिश करें</a>'],

    // Review -> index.html
    [/<button\s+class="w-full bg-white.*?">.*?visibility.*?<\/button>/s,
        '<a href="index.html" class="w-full bg-white dark:bg-neutral-800 border-4 border-neutral-100 dark:border-neutral-700 text-neutral-800 dark:text-white font-extrabold py-5 rounded-full transition-all flex items-center justify-center gap-2"><span class="material-symbols-outlined text-primary">visibility</span> उत्तरों की समीक्षा करें</a>']
]);

// Fix leaderboard toggles if needed (radio inputs are fine for UI, but functionally we just show static content)
// No change needed for leaderboard radio buttons as it's static.

// Unified Bottom Nav Link Fixes for all pages (best effort string matching)
// We'll replace href="#" with appropriate links in footer navs.
// Since the footer nav HTML varies slightly per page, we might need specific regexes or just broad replacements.

const navReplacements = [
    [/href="#">\s*<span class="material-symbols-outlined.*?">home<\/span>/g, 'href="index.html"><span class="material-symbols-outlined">home</span>'],
    [/href="#">\s*<span class="material-symbols-outlined.*?">explore<\/span>/g, 'href="courses.html"><span class="material-symbols-outlined">explore</span>'],
    [/href="#">\s*<span class="material-symbols-outlined.*?">science<\/span>/g, 'href="games.html"><span class="material-symbols-outlined">science</span>'], // My Lab / Games
    [/href="#">\s*<span class="material-symbols-outlined.*?">menu_book<\/span>/g, 'href="notes.html"><span class="material-symbols-outlined">menu_book</span>'], // Library / Notes
    [/href="#">\s*<span class="material-symbols-outlined.*?">quiz<\/span>/g, 'href="quiz.html"><span class="material-symbols-outlined">quiz</span>'],
    [/href="#">\s*<span class="material-symbols-outlined.*?">leaderboard<\/span>/g, 'href="leaderboard.html"><span class="material-symbols-outlined">leaderboard</span>'],
    [/href="#">\s*<span class="material-symbols-outlined.*?">person<\/span>/g, 'href="#"><span class="material-symbols-outlined">person</span>'] // Profile stays #
];

files.forEach(file => {
    // Skip index.html for general nav fix as we handled it specifically
    if (file === "index.html") return;

    replaceInFile(file, navReplacements);
});

console.log("All links updated.");
