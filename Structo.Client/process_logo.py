import os
from PIL import Image

def process():
    logo_src = r"f:\PrivateWork\structo\project\logo\mainlogo.png"
    public_dir = r"f:\PrivateWork\structo\project\Structo.Client\public"
    
    if not os.path.exists(logo_src):
        print(f"Source logo not found at {logo_src}")
        return

    os.makedirs(public_dir, exist_ok=True)
    img = Image.open(logo_src)
    print(f"Loaded image size: {img.size}")

    # 1. Copy the full image as logo.png
    # Let's save a clean copy of the full image (or we can crop out the white margins)
    # The image has a large white border. Let's crop the white card or just keep it.
    # To keep it clean, let's find the bounding box of all non-white pixels to crop the logo cleanly.
    bg_color = (240, 240, 240) # light grey/white background
    
    # We convert to RGB to inspect pixels
    rgb_img = img.convert("RGB")
    width, height = rgb_img.size

    # Find bounding box of anything that is not close to white (background is around 245-255)
    # Let's find pixels where R, G, B are all < 240 (which means it's part of the logo or text)
    logo_pixels = []
    color_pixels = [] # specifically orange/blue for the icon

    for x in range(width):
        for y in range(height):
            r, g, b = rgb_img.getpixel((x, y))
            # If not white/light grey background
            if r < 240 or g < 240 or b < 240:
                logo_pixels.append((x, y))
            
            # Identify orange/blue icon pixels (distinct from grey text)
            # Orange: high R, lower B. Blue: lower R, higher B.
            # Let's check color distance
            is_orange = (r > 150 and b < 100 and abs(r - g) < 150)
            is_blue = (b > 70 and r < 100)
            if is_orange or is_blue:
                color_pixels.append((x, y))

    if not logo_pixels:
        print("Could not find logo pixels")
        return

    # Bounding box for full logo (icon + text)
    min_x = min(p[0] for p in logo_pixels)
    max_x = max(p[0] for p in logo_pixels)
    min_y = min(p[1] for p in logo_pixels)
    max_y = max(p[1] for p in logo_pixels)

    # Crop the full logo with padding
    padding = 20
    full_logo_box = (
        max(0, min_x - padding),
        max(0, min_y - padding),
        min(width, max_x + padding),
        min(height, max_y + padding)
    )
    full_logo = img.crop(full_logo_box)
    full_logo.save(os.path.join(public_dir, "logo.png"))
    print(f"Saved full logo to public/logo.png with size {full_logo.size}")

    # Bounding box for the icon only (the colorful parts)
    if color_pixels:
        icon_min_x = min(p[0] for p in color_pixels)
        icon_max_x = max(p[0] for p in color_pixels)
        icon_min_y = min(p[1] for p in color_pixels)
        icon_max_y = max(p[1] for p in color_pixels)

        # Make it square
        icon_w = icon_max_x - icon_min_x
        icon_h = icon_max_y - icon_min_y
        size = max(icon_w, icon_h)
        
        center_x = icon_min_x + icon_w // 2
        center_y = icon_min_y + icon_h // 2

        # Crop box for square icon
        icon_padding = 15
        half_sz = size // 2 + icon_padding
        icon_box = (
            max(0, center_x - half_sz),
            max(0, center_y - half_sz),
            min(width, center_x + half_sz),
            min(height, center_y + half_sz)
        )
        
        icon_img = img.crop(icon_box)
        
        # Save icon as PNG favicon
        icon_png = icon_img.resize((128, 128), Image.Resampling.LANCZOS)
        icon_png.save(os.path.join(public_dir, "favicon.png"))
        print(f"Saved favicon.png with size {icon_png.size}")

        # Save as standard favicon.ico
        icon_ico = icon_img.resize((32, 32), Image.Resampling.LANCZOS)
        icon_ico.save(os.path.join(public_dir, "favicon.ico"), format="ICO")
        print("Saved favicon.ico successfully")
    else:
        print("Could not isolate color icon pixels")

if __name__ == "__main__":
    process()
