import os

def rename_files_to_lowercase(directory):
    try:
        # Check if the directory exists
        if not os.path.isdir(directory):
            print(f"The directory {directory} does not exist.")
            return

        # Iterate over all files in the directory
        for filename in os.listdir(directory):
            # Create full file path
            full_file_path = os.path.join(directory, filename)
            
            # Check if it is a file (not a directory)
            if os.path.isfile(full_file_path):
                # Create the new filename in lowercase
                new_filename = filename.lower()
                new_full_file_path = os.path.join(directory, new_filename)
                
                # Rename the file
                os.rename(full_file_path, new_full_file_path)
                print(f"Renamed: {filename} -> {new_filename}")
                
        print("All files have been renamed to lowercase.")
    
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
directory_path = "D:/UZH/Semester_4/Sopra/M04/C_Repo/src/assets/icons"  # Replace with your directory path
rename_files_to_lowercase(directory_path)
