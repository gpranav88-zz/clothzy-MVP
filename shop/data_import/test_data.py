import re,os,sys,csv


BASE_DIR = os.path.abspath(sys.argv[1]).decode('utf-8').replace('\\', '/')

for direc in os.listdir(BASE_DIR):
	CURR_DIR = os.path.join(BASE_DIR, direc)
	curr_file = os.path.join(CURR_DIR,direc + "_Products.csv")
	print  CURR_DIR
	product_file_path = os.path.join(BASE_DIR, curr_file)

	images_folder_path = os.path.join(CURR_DIR, direc + "_Products")
	images_list = os.listdir(images_folder_path)
	images_list = [x for x in images_list if not x.startswith('.')]
	images_list_old = images_list
	sku_list = []
	# print images_list
	# raw_input()
	with open(product_file_path) as f:
	        reader = csv.reader(f)
	        count = 0
	        for row in reader:
	        	count += 1
	        	if count>2:
	        		sku=row[0]
	        		clean_sku = re.sub('[^A-Za-z0-9-& ]+', '-', sku)
	        		regex=re.compile("^"+clean_sku+"-([0-9]*).(jpg|JPG)")
	        		images_found = [m.group(0) for l in images_list for m in [regex.search(l)] if m]
	        		images_nums = [int(m.group(1)) for l in images_list for m in [regex.search(l)] if m]
	        		is_correct_numbering = len([x+1 for x in range(len(images_nums)) if x+1 not in images_nums])
	        		if len(images_found) == 0:
	        			sku_list.append(sku)
	        		if is_correct_numbering ==0:
	        			images_list = [x for x in images_list if x not in images_found]
	        		# regex match clean sku with images_list
	        		# clean_sku-(d+).jpg
	        		# p,c = Product.objects.get_or_create(store=current_store, sku=row[0], sex=row[1], category=row[2],name=row[3], brand=row[4],color=row[5],material=row[6],)

	        		# look for associated images, populate product_images and store_images
	print "Invalid sku's:"
	for s in sku_list:
		print s
	print 
	print "Invalid image files:"
	for i in images_list:
		print i
	print "---------------------------------------------------------------------------------------------------"
	print