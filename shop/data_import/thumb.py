import os, sys
import Image

size1 = 174, 261
size2 = 333, 500

adobe_to_xyz = (
    0.57667, 0.18556, 0.18823, 0,
    0.29734, 0.62736, 0.07529, 0,
    0.02703, 0.07069, 0.99134, 0,
) # http://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf                                

xyz_to_srgb = (
    3.2406, -1.5372, -0.4986, 0,
    -0.9689, 1.8758, 0.0415, 0,
    0.0557, -0.2040, 1.0570, 0,
) # http://en.wikipedia.org/wiki/SRGB                                                     

def adobe_to_srgb(image):
    return image.convert('RGB', adobe_to_xyz).convert('RGB', xyz_to_srgb)

def is_adobe_rgb(image):
    return 'Adobe RGB' in image.info.get('icc_profile', '')

for infile in sys.argv[1:]:
    outfile1 = os.path.splitext(infile)[0] + "-thumb.jpg"
    outfile2 = os.path.splitext(infile)[0] + "-main.jpg"
    image = Image.open(infile)
    
    # if image.mode not in ("L", "RGB"):
	   #  image = image.convert("RGB")
    if is_adobe_rgb(image):
    	image = adobe_to_srgb(image)
    if infile != outfile1:
        try:
            image.thumbnail(size1, Image.ANTIALIAS)
            image.save(outfile1, 'JPEG', quality=95)
        except IOError:
            print "cannot create thumbnail for '%s'" % infile

    if infile != outfile2:
        try:
            image = Image.open(infile)
            if is_adobe_rgb(image):
            	image = adobe_to_srgb(image)
            image = image.resize(size2,Image.ANTIALIAS)
            image.save(outfile2, 'JPEG', quality=95)
        except IOError:
            print "cannot create thumbnail for '%s'" % infile