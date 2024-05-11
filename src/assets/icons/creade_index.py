import os

# Define the directory where your images are stored
image_dir = "../../assets/icons"

# Function to generate the index file content
def generate_index_file(image_dir):
    index_content = ""
    for filename in os.listdir(image_dir):
        if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png") or filename.endswith(".gif"):
            image_name = os.path.splitext(filename)[0]
            # Replace backslashes with forward slashes in the file path
            file_path = os.path.join(image_dir, filename).replace("\\", "/")
            index_content += f"import {image_name} from \"{file_path}\";\n"
    index_content += "\n"
    index_content += "const IMAGES = {\n"
    for filename in os.listdir(image_dir):
        if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png") or filename.endswith(".gif"):
            image_name = os.path.splitext(filename)[0]
            index_content += f"    {image_name},\n"
    index_content += "};\n\n"
    index_content += "export default IMAGES;\n"
    return index_content

# Generate the index file content
index_content = generate_index_file(image_dir)

# Write the content to the index file
with open("index.js", "w") as index_file:
    index_file.write(index_content)

print("Index file generated successfully!")