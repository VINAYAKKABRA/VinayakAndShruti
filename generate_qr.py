"""
Pure Python QR Code Generator (Zero dependencies, PIL only for image output)
Generates high-resolution royal QR code and wedding digital invitation pass.
"""
import math
from PIL import Image, ImageDraw, ImageFont

# GF(256) tables
EXP = [0] * 512
LOG = [0] * 256
x = 1
for i in range(255):
    EXP[i] = x
    EXP[i + 255] = x
    LOG[x] = i
    x = (x << 1) ^ (0x11d if (x & 0x80) else 0)

def gf_mul(x, y):
    return 0 if (x == 0 or y == 0) else EXP[LOG[x] + LOG[y]]

def rs_poly(n):
    g = [1]
    for i in range(n):
        ng = [0] * (len(g) + 1)
        for j, c in enumerate(g):
            ng[j] ^= gf_mul(c, EXP[i])
            ng[j + 1] ^= c
        g = ng
    return g

def rs_encode(data, n_ec):
    gen = rs_poly(n_ec)
    res = list(data) + [0] * n_ec
    for i in range(len(data)):
        lead = res[i]
        if lead != 0:
            for j, c in enumerate(gen):
                res[i + j] ^= gf_mul(c, lead)
    return res[len(data):]

# QR Version table for Version 4 (33x33) with ECC Level M:
# Total data codewords: 80, Data: 64, EC: 16 (in 2 blocks of (40, 32, 16))
# For Version 5 (37x37) with ECC Level M: Total 134, Data: 86, EC: 48 (in 2 blocks of 43, 67...)
# Let's support Version 4 (capacity 62 bytes in 8-bit mode) and Version 6 (capacity 106 bytes)

def make_qr_matrix(text, version=4, ec_level='M'):
    # Standard QR generator for byte mode
    # Version 4 is 33x33, Version 5 is 37x37
    # For wedding URL (e.g. 'https://vinayak-shruti-wedding.in' or window.location) ~35-50 bytes fits Version 4
    size = 17 + 4 * version
    modules = [[None] * size for _ in range(size)]
    is_function = [[False] * size for _ in range(size)]

    def set_fn(r, c, val):
        modules[r][c] = val
        is_function[r][c] = True

    # Finder patterns
    def add_finder(row, col):
        for r in range(-1, 8):
            for c in range(-1, 8):
                if 0 <= row + r < size and 0 <= col + c < size:
                    is_edge = (r in (-1, 7) or c in (-1, 7))
                    is_border = (r in (0, 6) or c in (0, 6))
                    is_center = (2 <= r <= 4 and 2 <= c <= 4)
                    val = 0 if is_edge else (1 if (is_border or is_center) else 0)
                    set_fn(row + r, col + c, val)

    add_finder(0, 0)
    add_finder(0, size - 7)
    add_finder(size - 7, 0)

    # Timing patterns
    for i in range(8, size - 8):
        set_fn(6, i, 1 if (i % 2 == 0) else 0)
        set_fn(i, 6, 1 if (i % 2 == 0) else 0)

    # Alignment pattern positions
    align_pos = {
        2: [6, 18],
        3: [6, 22],
        4: [6, 26],
        5: [6, 30],
        6: [6, 34],
        7: [6, 22, 38],
    }

    if version in align_pos:
        pos = align_pos[version]
        for r in pos:
            for c in pos:
                if is_function[r][c]:
                    continue
                for dr in range(-2, 3):
                    for dc in range(-2, 3):
                        val = 1 if (max(abs(dr), abs(dc)) in (0, 2)) else 0
                        set_fn(r + dr, c + dc, val)

    # Dark module
    set_fn(4 * version + 9, 8, 1)

    # Reserve format info areas
    for i in range(9):
        if not is_function[8][i]:
            set_fn(8, i, 0)
        if not is_function[i][8]:
            set_fn(i, 8, 0)
    for i in range(8):
        if not is_function[8][size - 1 - i]:
            set_fn(8, size - 1 - i, 0)
        if not is_function[size - 1 - i][8]:
            set_fn(size - 1 - i, 8, 0)

    # Data encoding: Byte mode
    raw_data = text.encode('utf-8')
    data_len = len(raw_data)
    
    # Capacity lookup for ECC 'M'
    # V4-M: 64 data codewords (512 bits)
    # V5-M: 86 data codewords
    # V6-M: 108 data codewords
    spec = {
        4: {'data_cw': 64, 'total_cw': 80, 'blocks': [(2, 40, 32, 16)]}, # 2 blocks, each 40 total, 32 data, 16 ec
        5: {'data_cw': 86, 'total_cw': 134, 'blocks': [(2, 58, 24, 26), (2, 59, 25, 26)]}, # V5-Q/M
        6: {'data_cw': 108, 'total_cw': 172, 'blocks': [(4, 43, 27, 16)]},
    }

    sp = spec.get(version, spec[4])
    total_data_bytes = sp['data_cw']
    
    # Bit buffer
    bits = []
    def put_bits(val, length):
        for i in range(length - 1, -1, -1):
            bits.append((val >> i) & 1)

    # Mode indicator: Byte mode is 0100
    put_bits(0b0100, 4)
    # Character count: 8 bits for V1-V9
    put_bits(data_len, 8)
    for b in raw_data:
        put_bits(b, 8)

    # Terminator
    rem_bits = total_data_bytes * 8 - len(bits)
    put_bits(0, min(4, rem_bits))

    # Pad to byte boundary
    while len(bits) % 8 != 0:
        bits.append(0)

    # Pad bytes 0xEC, 0x11
    pad_bytes = [0xEC, 0x11]
    pad_idx = 0
    while len(bits) < total_data_bytes * 8:
        put_bits(pad_bytes[pad_idx % 2], 8)
        pad_idx += 1

    # Convert bits to bytes
    data_bytes = []
    for i in range(0, len(bits), 8):
        b = 0
        for bit in bits[i:i+8]:
            b = (b << 1) | bit
        data_bytes.append(b)

    # Block segmentation & Reed-Solomon
    block_data = []
    block_ec = []
    byte_offset = 0

    for count, total_len, data_len_blk, ec_len in sp['blocks']:
        for _ in range(count):
            dblk = data_bytes[byte_offset:byte_offset + data_len_blk]
            byte_offset += data_len_blk
            ec = rs_encode(dblk, ec_len)
            block_data.append(dblk)
            block_ec.append(ec)

    # Interleave data
    final_codewords = []
    max_d = max(len(b) for b in block_data)
    for i in range(max_d):
        for b in block_data:
            if i < len(b):
                final_codewords.append(b[i])

    # Interleave EC
    max_ec = max(len(e) for e in block_ec)
    for i in range(max_ec):
        for e in block_ec:
            if i < len(e):
                final_codewords.append(e[i])

    # Convert to bitstream
    all_bits = []
    for cw in final_codewords:
        for i in range(7, -1, -1):
            all_bits.append((cw >> i) & 1)

    # Placement in zigzag pattern
    bit_idx = 0
    row = size - 1
    col = size - 1
    direction = -1 # upwards

    while col > 0:
        if col == 6: # skip vertical timing line
            col -= 1
        for _ in range(size):
            for c_off in (0, -1):
                c = col + c_off
                r = row
                if not is_function[r][c]:
                    bval = all_bits[bit_idx] if bit_idx < len(all_bits) else 0
                    bit_idx += 1
                    # Mask pattern 0: (r + c) % 2 == 0
                    if (r + c) % 2 == 0:
                        bval ^= 1
                    modules[r][c] = bval
            row += direction
        row -= direction
        direction = -direction
        col -= 2

    # Format info for ECC 'M' (00) and Mask 0 (000) => 00000 -> BCH code: 101010000010010 ^ 101010000010010 = 0
    # For standard M, mask 0: format bits = 0x5412 (101010000010010)
    fmt_bits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0]
    
    # Place format bits around top-left
    for i in range(6):
        set_fn(8, i, fmt_bits[i])
    set_fn(8, 7, fmt_bits[6])
    set_fn(8, 8, fmt_bits[7])
    set_fn(7, 8, fmt_bits[8])
    for i in range(6):
        set_fn(5 - i, 8, fmt_bits[9 + i])

    # Place format bits around other finders
    for i in range(8):
        set_fn(8, size - 1 - i, fmt_bits[i])
    for i in range(7):
        set_fn(size - 7 + i, 8, fmt_bits[8 + i])

    return modules

def draw_royal_qr(modules, out_path, logo_path=None, box_size=16, border=4):
    n = len(modules)
    total_size = (n + 2 * border) * box_size
    
    # Create canvas: Rich ivory pearl cream background
    im = Image.new('RGBA', (total_size, total_size), (253, 251, 247, 255))
    draw = ImageDraw.Draw(im)

    # Colors
    royal_maroon = (74, 14, 23, 255) # #4a0e17
    gold_accent = (212, 175, 55, 255) # #d4af37

    # Draw quiet zone decorative border
    b_inset = box_size * 2
    draw.rectangle([b_inset, b_inset, total_size - b_inset, total_size - b_inset], outline=gold_accent, width=2)

    for r in range(n):
        for c in range(n):
            if modules[r][c] == 1:
                x0 = (c + border) * box_size
                y0 = (r + border) * box_size
                x1 = x0 + box_size
                y1 = y0 + box_size
                
                # Check if this pixel is inside the finder patterns (corners)
                is_finder = (
                    (r < 8 and c < 8) or 
                    (r < 8 and c >= n - 8) or 
                    (r >= n - 8 and c < 8)
                )
                
                if is_finder:
                    draw.rectangle([x0, y0, x1 - 1, y1 - 1], fill=royal_maroon)
                else:
                    # Draw elegant rounded dots for royal elegance
                    pad = 1
                    draw.rounded_rectangle([x0 + pad, y0 + pad, x1 - pad, y1 - pad], radius=3, fill=royal_maroon)

    # Center Logo badge if provided
    if logo_path:
        logo = Image.open(logo_path).convert('RGBA')
        badge_w = int(total_size * 0.22)
        badge_h = badge_w
        logo.thumbnail((badge_w - 12, badge_h - 12), Image.Resampling.LANCZOS)
        
        # Draw circular or rounded gold badge backing in center
        cx, cy = total_size // 2, total_size // 2
        bx0, by0 = cx - badge_w // 2, cy - badge_h // 2
        bx1, by1 = cx + badge_w // 2, cy + badge_h // 2
        
        draw.rounded_rectangle([bx0, by0, bx1, by1], radius=16, fill=(255, 255, 255, 255), outline=gold_accent, width=3)
        
        lx = cx - logo.size[0] // 2
        ly = cy - logo.size[1] // 2
        im.paste(logo, (lx, ly), logo)

    im.save(out_path)
    print(f'Generated royal QR code: {out_path} ({total_size}x{total_size})')

def create_wedding_pass(qr_path, out_path):
    # Create an exquisite royal wedding digital pass
    w, h = 1000, 1500
    pass_img = Image.new('RGB', (w, h), (42, 6, 14)) # Deep velvet maroon #2a060e
    draw = ImageDraw.Draw(pass_img)

    gold = (212, 175, 55)
    gold_light = (243, 229, 171)
    cream = (253, 251, 247)

    # Double gold border
    draw.rectangle([30, 30, w - 30, h - 30], outline=gold, width=3)
    draw.rectangle([45, 45, w - 45, h - 45], outline=gold_light, width=1)

    # Add corner decorations if available
    try:
        corner = Image.open('assets/img/royal_corner.png').convert('RGBA')
        cw, ch = 120, 120
        corner = corner.resize((cw, ch), Image.Resampling.LANCZOS)
        
        # Top-left
        pass_img.paste(corner, (40, 40), corner)
        # Top-right
        corner_tr = corner.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        pass_img.paste(corner_tr, (w - 40 - cw, 40), corner_tr)
        # Bottom-left
        corner_bl = corner.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
        pass_img.paste(corner_bl, (40, h - 40 - ch), corner_bl)
        # Bottom-right
        corner_br = corner.transpose(Image.Transpose.ROTATE_180)
        pass_img.paste(corner_br, (w - 40 - cw, h - 40 - ch), corner_br)
    except Exception as e:
        print('Corner error:', e)

    # Add Ganesh Icon
    try:
        ganesh = Image.open('assets/img/ganesh_icon.png').convert('RGBA')
        ganesh.thumbnail((110, 110), Image.Resampling.LANCZOS)
        gx = (w - ganesh.size[0]) // 2
        pass_img.paste(ganesh, (gx, 80), ganesh)
    except Exception as e:
        print('Ganesh error:', e)

    # Texts
    # Top Shloka
    # In pure PIL without specific TTF, default font works or standard Arial/Georgia
    font_path = "C:/Windows/Fonts/georgia.ttf"
    font_bold = "C:/Windows/Fonts/georgiab.ttf"
    
    try:
        f_sub = ImageFont.truetype(font_path, 22)
        f_title = ImageFont.truetype(font_bold, 48)
        f_names = ImageFont.truetype(font_bold, 54)
        f_body = ImageFont.truetype(font_path, 24)
        f_tag = ImageFont.truetype(font_bold, 28)
    except:
        f_sub = f_title = f_names = f_body = f_tag = ImageFont.load_default()

    draw.text((w // 2, 210), "|| Shri Ganeshay Namah ||  || Jai Shri Dadaji Ki ||", font=f_sub, fill=gold_light, anchor="mm")
    draw.text((w // 2, 255), "WEDDING CELEBRATION", font=f_sub, fill=gold, anchor="mm")
    
    draw.text((w // 2, 320), "Vinayak & Shruti", font=f_names, fill=cream, anchor="mm")
    draw.text((w // 2, 375), "#TwoHeartsOneViSh", font=f_tag, fill=gold, anchor="mm")

    draw.text((w // 2, 425), "02 & 03 December 2026", font=f_body, fill=gold_light, anchor="mm")
    draw.text((w // 2, 460), "Goenka Farm, Nagpur", font=f_body, fill=cream, anchor="mm")

    # Paste QR Code in center
    qr = Image.open(qr_path).convert('RGBA')
    qr_size = 460
    qr = qr.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    qrx = (w - qr_size) // 2
    qry = 520
    pass_img.paste(qr, (qrx, qry), qr)

    # Instructions below QR
    draw.text((w // 2, 1030), "SCAN FOR ITINERARY & LIVE VENUE MAP", font=f_tag, fill=gold, anchor="mm")
    draw.text((w // 2, 1075), "Access event schedules, dress codes & GPS directions", font=f_body, fill=gold_light, anchor="mm")
    
    # Bottom Family greeting
    draw.text((w // 2, 1260), "With Best Compliments From:", font=f_sub, fill=gold_light, anchor="mm")
    draw.text((w // 2, 1310), "Kabra & Sikchi Family", font=f_title, fill=cream, anchor="mm")
    draw.text((w // 2, 1370), "Nagpur • Risod • Bhandara • Akola", font=f_body, fill=gold, anchor="mm")

    pass_img.save(out_path)
    print(f'Generated royal wedding pass: {out_path}')

if __name__ == '__main__':
    # Default URL can be local or production
    wedding_url = "https://twoheartstonevish.wedding"
    mat = make_qr_matrix(wedding_url, version=4, ec_level='M')
    draw_royal_qr(mat, 'assets/img/wedding_qr.png', logo_path='assets/img/vs_logo.png')
    create_wedding_pass('assets/img/wedding_qr.png', 'assets/img/wedding_pass.png')

