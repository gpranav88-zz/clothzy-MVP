from django.db import models

# Create your models here.

class Store(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone1 = models.CharField(max_length=20)
    phone2 = models.CharField(max_length=20)
    website = models.CharField(max_length=20)
    fb_link = models.CharField(max_length=20)
    tw_link = models.CharField(max_length=20)
    day_closed = models.CharField(max_length=20)
    time_open = models.CharField(max_length=20)
    time_close = models.CharField(max_length=20)
    designer_name = models.CharField(max_length=20)
    designer_bio = models.CharField(max_length=20)
    latest_news =  models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    popularity = models.CharField(max_length=20)
    active = models.BooleanField()
    # country = models.CharField(max_length=20)
    # city = models.CharField(max_length=20)
    # locality = models.CharField(max_length=20)
    # pincode = models.CharField(max_length=20)

class Product(models.Model):
    store = models.ForeignKey(Store)
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=20)
    sex = models.CharField(max_length=20)
    price = models.FloatField()
    price_discounted = models.FloatField()
    brand = models.CharField(max_length=20)
    color = models.CharField(max_length=20)
    material = models.CharField(max_length=20)
    sizes = models.CharField(max_length=20)
    made_to_order = models.BooleanField()
    active = models.BooleanField()
    description = models.CharField(max_length=200)
    popularity = models.CharField(max_length=20)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    num_images = models.IntegerField()
    # category = models.CharField(max_length=20)

class Reviewer(models.Model):
    name = models.CharField(max_length=200)
    sex = models.CharField(max_length=20)
    popularity = models.CharField(max_length=20)
    date_joined = models.DateField()
    num_reviews = models.IntegerField()
    upvotes = models.IntegerField()
    downvotes = models.IntegerField()

class Review(models.Model):
	reviewerID = models.ForeignKey(Reviewer)
	store = models.ForeignKey(Store)
	product = models.ForeignKey(Product)
	description = models.CharField(max_length=200)
	created_on = models.DateTimeField(auto_now_add=True)

class ProductImage(models.Model):
    productID = models.ForeignKey(Product)
    url = models.CharField(max_length=200)
    alt = models.CharField(max_length=20)
    flag_home = models.BooleanField()

class StoreImage(models.Model):
    storeID = models.ForeignKey(Store)
    url = models.CharField(max_length=200)
    alt = models.CharField(max_length=20)
    flag_home = models.BooleanField()