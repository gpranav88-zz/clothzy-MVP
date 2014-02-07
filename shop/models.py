from django.db import models

class Size(models.Model):
    name = models.CharField(max_length=20)
    def __unicode__(self):
        return self.name
        
class Store(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=2000,blank=True)
    address = models.CharField(max_length=2000,blank=True)
    phone1 = models.CharField(max_length=20,blank=True)
    phone2 = models.CharField(max_length=20,blank=True)
    website = models.CharField(max_length=100,blank=True)
    fb_link = models.CharField(max_length=100,blank=True)
    tw_link = models.CharField(max_length=100,blank=True)
    day_closed = models.CharField(max_length=20,blank=True)
    time_open = models.CharField(max_length=20,blank=True)
    time_close = models.CharField(max_length=20,blank=True)
    designer_name = models.CharField(max_length=50,blank=True)
    designer_bio = models.CharField(max_length=2000,blank=True)
    latest_news =  models.CharField(max_length=2000,blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    popularity = models.CharField(max_length=20,blank=True)
    active = models.BooleanField(default=True)
    region = models.CharField(max_length=50,blank=True)
    locality = models.CharField(max_length=50,blank=True)
    city = models.CharField(max_length=50,blank=True)
    pincode = models.CharField(max_length=20,blank=True)
    map_url = models.URLField(max_length=1000,blank=True)
    # num_images = models.IntegerField(null=True)

    def __unicode__(self):              # __unicode__ on Python 2
        return str(self.id)+":"+self.name

class Product(models.Model):
    store = models.ForeignKey(Store)
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=100,blank=True)
    sex = models.CharField(max_length=20,blank=True)
    price = models.FloatField(null=True)
    price_discounted = models.FloatField(null=True)
    brand = models.CharField(max_length=50,blank=True)
    color = models.CharField(max_length=50,blank=True)
    material = models.CharField(max_length=100,blank=True)
    sizes = models.ManyToManyField(Size)
    made_to_order = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    description = models.CharField(max_length=2000,blank=True)
    popularity = models.CharField(max_length=20,blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    num_images = models.IntegerField(null=True)
    category = models.CharField(max_length=50,blank=True)
    sub_category = models.CharField(max_length=50,blank=True)
    status = models.CharField(max_length=20,blank=True) #instock or not

    def __unicode__(self):              # __unicode__ on Python 2
        return str(self.id)+":"+self.store.name+":"+self.sku

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