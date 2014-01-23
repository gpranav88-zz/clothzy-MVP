import os
import sys
import csv

sys.path.append("/home/pranav/clothzy-backend/clothzy")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "clothzy.settings")


from shop.models import Store, Product, Review

# store upload
# path = "/home/pranav/clothzy-data/niharika_sharma_store.csv"
# with open(path) as f:
#         reader = csv.reader(f)
#         count = 0
#         for row in reader:
test_store, created = Store.objects.get_or_create(name="test")
print created
# product upload
path = "/home/pranav/clothzy-data/niharika_sharma.csv"
with open(path) as f:
        reader = csv.reader(f)
        count = 0
        for row in reader:
        	count += 1
        	if count>2:
        		# print row
        		store = Store
        		p = Product.objects.create(store=test_store, sku=row[0], sex=row[1], category=row[2],name=row[3])

        		# look for associated images, populate product_images and store_images
# Code
# Male/Female/ Kids
# Product type
# Name
# Brand/ Designer
# Major Color
# Material
# XL
# L
# M
# S
# XS
# Free size
# Made to order
# Price in INR
# Discounted price
# Detailed Description

# store = models.ForeignKey(Store)
# name = models.CharField(max_length=200)
# sku = models.CharField(max_length=20)
# sex = models.CharField(max_length=20)
# price = models.FloatField()
# price_discounted = models.FloatField()
# brand = models.CharField(max_length=20)
# color = models.CharField(max_length=20)
# material = models.CharField(max_length=20)
# sizes = models.CharField(max_length=20)
# made_to_order = models.BooleanField()
# active = models.BooleanField()
# description = models.CharField(max_length=200)
# popularity = models.CharField(max_length=20)
# created_on = models.DateTimeField(auto_now_add=True)
# updated_on = models.DateTimeField(auto_now=True)
# num_images = models.IntegerField()