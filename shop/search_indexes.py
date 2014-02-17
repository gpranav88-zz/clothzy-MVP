from haystack import indexes
from shop.models import *
import datetime
from django.db import models

# class StoreIndex(indexes.SearchIndex, indexes.Indexable):
#     text = indexes.CharField(document=True, use_template=True)
#     created_on = indexes.DateTimeField(model_attr='created_on')

#     def get_model(self):
#         return Store

#     def index_queryset(self, using=None):
#         """Used when the entire index for model is updated."""
#         return self.get_model().objects.filter(created_on__lte=datetime.datetime.now())


class ProductIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    id = indexes.IntegerField(model_attr='id')
    storeid = indexes.IntegerField(model_attr='store__id')
    store_desc = indexes.CharField(model_attr='store__description')
    name = indexes.CharField(model_attr='name')
    store_name = indexes.CharField(model_attr='store__name')
    created_on = indexes.DateTimeField(model_attr='created_on')
    sex = indexes.CharField(model_attr='sex', faceted=True)
    price = indexes.IntegerField(model_attr='price')
    price_discounted = indexes.IntegerField(model_attr='price_discounted')
    sizes = indexes.MultiValueField(faceted=True)
    category = indexes.CharField(model_attr='category', faceted=True)
    color = indexes.CharField(model_attr='color', faceted=True)
    location = indexes.CharField(model_attr='store__locality',faceted=True)
    num_images = indexes.IntegerField(model_attr='num_images')
    region = indexes.CharField(model_attr='store__region')
    city = indexes.CharField(model_attr='store__city')
    
    def prepare_sizes(self, obj):
        return [(size.name) for size in obj.sizes.all()]
    
    # def prepare(self, object):
    #     self.prepared_data = super(ProductIndex, self).prepare(object)
    #     # self.prepared_data['location'] = object.store.localitylocalitylocality
    #     self.prepared_data['store_name'] = object.store.name

    #     return self.prepared_data

    def get_model(self):
        return Product

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        #return self.get_model().objects.filter(pub_date__lte=datetime.datetime.now())
        return self.get_model().objects.filter(num_images__gte=1)