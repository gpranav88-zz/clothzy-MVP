import os, sys
import Image

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

def convertimage(infile,outfile,size):
    print size
    image = Image.open(infile)
    if is_adobe_rgb(image):
    	image = adobe_to_srgb(image)
    image.thumbnail(size, Image.ANTIALIAS)
    image.save(outfile, 'JPEG', quality=95)