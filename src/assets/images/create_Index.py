import os

# Define the directory where your images are stored
image_dir = "../../assets/images"

# Function to sanitize filenames to valid JavaScript identifiers
def sanitize_filename(filename):
    return filename.replace("-", "_").replace(" ", "_")

# Function to generate the index file content
def generate_index_file(image_dir):
    index_content = ""
    for filename in os.listdir("/home/alex/UZH/FS 2024/Softwarepraktikum/sopra-fs24-group-41-client/src/assets/images"):
        if filename.endswith((".jpg", ".jpeg", ".png", ".gif")):
            image_name = sanitize_filename(os.path.splitext(filename)[0])
            # Replace backslashes with forward slashes in the file path
            file_path = os.path.join(image_dir, filename)
            index_content += f"import {image_name} from \"{file_path}\";\n"
    index_content += "\n"
    index_content += "const IMAGES = {\n"
    for filename in os.listdir("/home/alex/UZH/FS 2024/Softwarepraktikum/sopra-fs24-group-41-client/src/assets/images"):
        if filename.endswith((".jpg", ".jpeg", ".png", ".gif")):
            image_name = sanitize_filename(os.path.splitext(filename)[0])
            index_content += f"    {image_name},\n"
    index_content += "};\n\n"
    index_content += "export default IMAGES;\n"
    return index_content

# Generate the index file content

print(os.getcwd())

index_content = generate_index_file(image_dir)

# Write the content to the index file
with open("index.js", "w") as index_file:
    index_file.write(index_content)

print("Index file generated successfully!")
