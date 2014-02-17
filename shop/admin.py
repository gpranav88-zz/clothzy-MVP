from django.contrib import admin
from shop.models import Store, Product, Review, Feedback
# Register your models here.

admin.site.register(Store)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Feedback)