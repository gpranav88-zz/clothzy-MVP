
###IMPORT DATA AND IMAGES DIRECTLY###

import os
import sys
import csv
import re
from process_image import convertimage
from shutil import copyfile

sys.path.append("/home/pranav/clothzy-backend/clothzy")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "clothzy.settings")
from shop.models import Store, Product, Review, Size

FOLDER_DIR = os.path.abspath(sys.argv[1]).decode('utf-8').replace('\\', '/')

for direc in os.listdir(FOLDER_DIR):
    BASE_DIR = os.path.join(FOLDER_DIR, direc)
    print "Uploading folder at " + BASE_DIR

    PARENT_DIR = os.path.dirname(BASE_DIR)
    BASE_FOLDER = os.path.basename(BASE_DIR)
    curr_file = os.path.join(BASE_DIR, BASE_FOLDER + "_Store.csv")
    print "Reading file " + curr_file
    store_file_path = os.path.join(BASE_DIR, curr_file)

    with open(store_file_path) as f:
            store_dict = {}
            reader = csv.reader(f)
            for row in reader:
                if(row[0]!=""):
                    store_dict[row[0]] = row[1].decode('cp1252').encode('utf-8').strip()

    current_store, created = Store.objects.get_or_create(name=store_dict["Store name/Brand name"],description=store_dict["Store description"], \
        address=store_dict["Full Address"],phone1=store_dict["Phone number"],phone2=store_dict["Phone number 2 (if applicable)"], website=store_dict["Website"], \
        fb_link=store_dict["Facebook link"],tw_link=store_dict["Twitter link"],day_closed=store_dict["Store closed on (leave blank if open all 7 days)"], \
        time_open=store_dict["Opening time"], time_close=store_dict["Closing time"], designer_name=store_dict["Designer name"], \
        designer_bio=store_dict["Designer bio"],latest_news=store_dict["Latest news, upcoming activities"],locality=store_dict["Locality"].lower(), \
        city=store_dict["City"].lower(),pincode=store_dict["Pincode"],region=store_dict["Region"].lower())

    print store_dict["Store name/Brand name"] + " Store CSV Imported"
    # product upload

    curr_file = os.path.join(BASE_DIR, BASE_FOLDER + "_Products.csv")
    print "Reading file " + curr_file
    product_file_path = os.path.join(BASE_DIR, curr_file)

    images_folder_path1 = os.path.join(BASE_DIR, BASE_FOLDER + "_Products_thumb")
    images_list1 = os.listdir(images_folder_path1)
    images_list1 = [x for x in images_list1 if not x.startswith('.')]

    images_folder_path2 = os.path.join(BASE_DIR, BASE_FOLDER + "_Products_main")
    images_list2 = os.listdir(images_folder_path2)
    images_list2= [x for x in images_list2 if not x.startswith('.')]

    # print images_list1
    #create images in static folder at staticpath
    STATIC_PATH = "/home/pranav/clothzy-data/static_new"
    store_dir = os.path.join(STATIC_PATH, "Store_"+str(current_store.id))
    if not os.path.exists(store_dir):
        os.makedirs(store_dir)

    PROCESS_IMAGE = 1

    # upload store images
    if PROCESS_IMAGE == 1:
        # store_dir = os.path.join(store_dir, "P_"+str(curr_prod.id))
        stimg_folder_path = os.path.join(BASE_DIR, BASE_FOLDER + "_Store")
        store_images = os.listdir(stimg_folder_path)
        store_images = [x for x in store_images if not x.startswith('.')]

        size1 = 245, 163
        size2 = 580, 387
        num = 0
        for img in store_images:
            print img
            if(img == "cover.jpg"):
                infile = os.path.join(stimg_folder_path,img)
                outfile1 = os.path.join(store_dir,"cover.jpg")
                copyfile(infile, outfile1)
            else:
                num += 1
                infile = os.path.join(stimg_folder_path,img)
                outfile1 = os.path.join(store_dir,str(num)+"-1.jpg")
                outfile2 = os.path.join(store_dir,str(num)+"-2.jpg")
                convertimage(infile,outfile1,size1)
                convertimage(infile,outfile2,size2)
        # print '%s ------------'%current_store
        # print num
        current_store.num_images = num
        current_store.save()
        # print current_store.num_images

    with open(product_file_path) as f:
            reader = csv.reader(f)
            count = 0
            size1 = 174, 261
            size2 = 333, 500
            for row in reader:
                count += 1
                if count>2:
                    row = [i.decode('cp1252').encode('utf-8').strip() for i in row]
                    # ,size_XL=row[8],size_L=row[9],size_M=row[10],size_S=row[11],size_XS=row[12],size_FreeSize=row[13]
                    if row[15]!="":
                        price = int(row[15].replace(",",""))
                    else:
                        price = 0
                    if row[16]!="":
                        price_discounted = int(row[16].replace(",",""))
                    else:
                        price_discounted = 0
                    
                    curr_prod,created = Product.objects.get_or_create(store=current_store, sku=row[0], sex=row[1].lower(), category=row[2].lower(),\
                            name=row[3], brand=row[4],color=row[5].lower(),material=row[6].lower(),made_to_order=row[14],\
                            price=price,price_discounted=price_discounted,description=row[17])
                    
                    #create size object
                    if(row[7]!=''):
                        s, c = Size.objects.get_or_create(name='XXL')
                        curr_prod.sizes.add(s)
                    if(row[8]!=''):
                        s, c = Size.objects.get_or_create(name='XL')
                        curr_prod.sizes.add(s)
                    if(row[9]!=''):
                        s, c = Size.objects.get_or_create(name='L')
                        curr_prod.sizes.add(s)
                    if(row[10]!=''):
                        s, c = Size.objects.get_or_create(name='M')
                        curr_prod.sizes.add(s)
                    if(row[11]!=''):
                        s, c = Size.objects.get_or_create(name='S')
                        curr_prod.sizes.add(s)
                    if(row[12]!=''):
                        s, c = Size.objects.get_or_create(name='XS')
                        curr_prod.sizes.add(s)
                    if(row[13]!=''):
                        s, c = Size.objects.get_or_create(name='Free Size')
                        curr_prod.sizes.add(s)
                    print curr_prod

                    if PROCESS_IMAGE == 1:
                        #process related images
                        prod_dir = os.path.join(store_dir, "P_"+str(curr_prod.id))
                        if not os.path.exists(prod_dir):
                            os.makedirs(prod_dir)
                            sku=row[0]
                            clean_sku = re.sub('[^A-Za-z0-9-& ]+', '-', sku)
                            regex=re.compile("^"+clean_sku+"-([0-9]*).(jpg|JPG)")
                            images_found = [m.group(0) for l in images_list1 for m in [regex.search(l)] if m]
                            curr_prod.num_images = len(images_found)
                            curr_prod.save()
                            for img in images_found:
                                print img
                                num = img.rsplit('-',1)[1]  #abc-1.jpg
                                num = num.rsplit('.',1)[0]
                                infile1 = os.path.join(images_folder_path1,img)
                                infile2 = os.path.join(images_folder_path2,img)
                                outfile1 = os.path.join(prod_dir,num+"-1.jpg")
                                outfile2 = os.path.join(prod_dir,num+"-2.jpg")
                                copyfile(infile1, outfile1)
                                copyfile(infile2, outfile2)

    print "Created Image folder at "+store_dir