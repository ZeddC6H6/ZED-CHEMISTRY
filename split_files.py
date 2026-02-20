import re
import os

source_path = r"C:\Users\acer\zed chemistry.html"
output_dir = r"C:\Users\acer\.gemini\antigravity\scratch\zed-chemistry"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(source_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find each HTML document
# Matches <!DOCTYPE html> ... </html> inclusive, including comments before it if they exist?
# Actually the file structure seems to be:
# <!-- Comment -->
# <!DOCTYPE html>
# <html ...>
# ...
# </html>
# 
# We can just split by occurrences of "</html>" and append it back, 
# or use regex to capture each block. 
# The regex `(<!DOCTYPE html>.*?</html>)` with DOTALL should work nicely, 
# but we might miss the identifying comments. 
# However, we know identifying info is in the <title> or first comment.

# Let's verify the file content structure from previous turns.
# It seems clearly separated.

pattern = re.compile(r'(<!DOCTYPE html>.*?</html>)', re.DOTALL | re.IGNORECASE)
matches = pattern.findall(content)

filenames = [
    "index.html",         # Home
    "courses.html",       # My Courses
    "notes.html",         # Notes
    "mock-tests.html",    # Mock Tests
    "quiz.html",          # Quiz Session
    "quiz-results.html",  # Quiz Results
    "leaderboard.html",   # Leaderboard
    "games.html"          # Games
]

print(f"Found {len(matches)} documents.")

if len(matches) != 8:
    print("Warning: Expected 8 documents, found", len(matches))

for i, html_content in enumerate(matches):
    if i < len(filenames):
        fname = filenames[i]
        with open(os.path.join(output_dir, fname), 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Created {fname}")
    else:
        print(f"Skipping extra document {i+1}")
