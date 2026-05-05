import os
import glob
from PIL import Image
from concurrent.futures import ProcessPoolExecutor, as_completed

# Directories
input_dir = 'spinning_cat'
output_dir = 'spinning_cat_cropped'

# Ensure output directory exists
def ensure_output_dir():
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

# Process a single image: crop transparent borders and save
def process_image(filepath):
    try:
        img = Image.open(filepath)
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        alpha = img.split()[-1]
        bbox = alpha.getbbox()
        cropped = img.crop(bbox) if bbox else img
        filename = os.path.basename(filepath)
        out_path = os.path.join(output_dir, filename)
        cropped.save(out_path)
        return out_path, None
    except Exception as e:
        return filepath, e

# Main execution: parallel processing

def main():
    ensure_output_dir()
    pattern = os.path.join(input_dir, 'untitled_*.png')
    files = sorted(glob.glob(pattern))
    if not files:
        print(f"No files found in '{input_dir}' with pattern 'untitled_*.png'.")
        return

    with ProcessPoolExecutor() as executor:
        futures = {executor.submit(process_image, fp): fp for fp in files}
        for future in as_completed(futures):
            fp = futures[future]
            out_path, error = future.result()
            if error:
                print(f"Error processing {fp}: {error}")
            else:
                print(f"Cropped and saved: {out_path}")

    print("Processing complete.")

if __name__ == '__main__':
    main()

