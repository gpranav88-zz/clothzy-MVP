from shop.models import *
from rest_framework import serializers


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        # fields = ('name', 'location', 'phone')

class ProductSerializer(serializers.ModelSerializer):
    sizes = serializers.RelatedField(many=True)
    class Meta:
        model = Product

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review

# class SearchResultSerializer(serializers.Serializer):
#     text = serializers.CharField()
#     pub_date = serializers.DateTimeField()
#     distance = fields.SerializerMethodField('_distance')
#     content_type = fields.CharField(source='model_name')
#     content_object = fields.SerializerMethodField('_content_object')
 
#     def _content_object(self, obj):
#         if obj.model_name == 'foo':
#             return FoSerializer(obj.object, many=False, context=self.context).data
#         if obj.model_name == 'bar':
#             return BarSerializer(obj.object, many=False, context=self.context).data
#         return {}
 
#     def __init__(self,  *args, **kwargs):
#         return super(SearchResultSerializer, self).__init__(*args, **kwargs)