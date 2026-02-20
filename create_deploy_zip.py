import zipfile
import os

def create_zip():
    files_to_zip = [
        'index.html', 'courses.html', 'games.html', 'leaderboard.html', 
        'mock-tests.html', 'notes.html', 'quiz.html', 'quiz-results.html',
        'js'
    ]
    
    zip_filename = 'site.zip'
    
    print(f"Creating {zip_filename}...")
    
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in files_to_zip:
            if os.path.isdir(item):
                for root, dirs, files in os.walk(item):
                    for file in files:
                        file_path = os.path.join(root, file)
                        zipf.write(file_path, file_path)
                        print(f"Added {file_path}")
            elif os.path.exists(item):
                zipf.write(item, item)
                print(f"Added {item}")
            else:
                print(f"Warning: {item} not found")
                
    print(f"Successfully created {zip_filename}")

if __name__ == "__main__":
    create_zip()
