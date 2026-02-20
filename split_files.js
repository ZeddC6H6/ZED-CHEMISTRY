const fs = require('fs');
const path = require('path');

const sourcePath = "C:/Users/acer/zed chemistry.html";
const outputDir = "C:/Users/acer/.gemini/antigravity/scratch/zed-chemistry";

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(sourcePath, 'utf8');

// The file contains multiple HTML documents concatenated.
// We can split by `</html>` and add it back to each part.
// But some might have comments before them.
// A regex like /<!DOCTYPE html>[\s\S]*?<\/html>/gi should work.

const regex = /<!DOCTYPE html>[\s\S]*?<\/html>/gi;
const matches = content.match(regex);

if (!matches) {
    console.error("No HTML documents found!");
    process.exit(1);
}

const filenames = [
    "index.html",         // Home
    "courses.html",       // My Courses
    "notes.html",         // Notes
    "mock-tests.html",    // Mock Tests
    "quiz.html",          // Quiz Session
    "quiz-results.html",  // Quiz Results
    "leaderboard.html",   // Leaderboard
    "games.html"          // Games
];

console.log(`Found ${matches.length} documents.`);

matches.forEach((htmlContent, index) => {
    if (index < filenames.length) {
        const fname = filenames[index];
        fs.writeFileSync(path.join(outputDir, fname), htmlContent, 'utf8');
        console.log(`Created ${fname}`);
    } else {
        console.warn(`Skipping extra document ${index + 1}`);
    }
});
