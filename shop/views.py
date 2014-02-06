from shop.models import *
from rest_framework import viewsets
from shop.serializers import StoreSerializer, ProductSerializer, ReviewSerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.decorators import link
from rest_framework.response import Response
from rest_framework.views import APIView
from haystack.query import SearchQuerySet,SQ
from sets import Set

class StoreViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Stores to be viewed.
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    # filter_fields = ['name']
    # filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (filters.OrderingFilter,)

    @link()
    def products(self, request, pk=None):
        products =  Product.objects.filter(store = self.get_object())
        serializer = ProductSerializer(products)
        # dict1 = {}
        # dict1['Products'] = serializer.data
        return Response({"Products":serializer.data})

    @link()
    def reviews(self, request, pk=None):
        reviews =  Review.objects.filter(store = self.get_object())
        serializer = ReviewSerializer(reviews)
        return Response(serializer.data)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer  # Create your views here.

    filter_backends = (filters.OrderingFilter,filters.DjangoFilterBackend,)
    filter_fields = ['name','category']
    # ordering = ('popularity',)

    @link()
    def reviews(self, request, pk=None):
        reviews =  Review.objects.filter(product = self.get_object())
        serializer = ReviewSerializer(reviews)
        return Response(serializer.data)

class HomeView(APIView):

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        dict1 = {}
        stores =  Store.objects.filter(pk__in=[4,1,5])
        serializer1 = StoreSerializer(stores)
        dict1["Stores"] = serializer1.data

        products =  Product.objects.filter(pk__in=[278,167])
        serializer2 = ProductSerializer(products)
        dict1["Products"] = serializer2.data

        reviews =  Review.objects.all().order_by("-created_on")[:3]
        serializer3 = ReviewSerializer(reviews)
        dict1["Reviews"] = serializer3.data

        return Response(dict1)

class ProductSearchView(APIView):

    def get(self,request):
        """
        Return product search results.
        """
        query_p = request.GET.get('product','')
        query_l = request.GET.get('location','')
        page = request.GET.get('page','')

        query = query_p+" "+query_l
        q = None
        or_query = None
        if(query.strip()!=''):
            for word in query.strip().split(" "):
                q = SQ(content='%s' % word)
                if or_query is None:
                    or_query = q
                else:
                    or_query = or_query | q
        #filter by other request parameters if present
        sqs = SearchQuerySet()
        for key in request.GET.iterkeys():
            # Add filtering logic here.
            if key!='product' and key!='location' and key!='page':
                valuelist = request.GET.get(key,'')
                sqs = sqs.filter(**{'%s' %key:valuelist})

        #order by other request parameters if present

        if or_query is not None:
            sqs = sqs.filter(or_query)

        dict1 = {}
        total_count = len(sqs)
        filters = {}
        filters['sex'] = sqs.facet('sex').facet_counts()['fields']['sex']
        filters['category'] = sqs.facet('category').facet_counts()['fields']['category']
        filters['location'] = sqs.facet('location').facet_counts()['fields']['location']
        filters['sizes'] = sqs.facet('sizes').facet_counts()['fields']['sizes']
        # print sqs.facet_counts()
        # sqs = SearchQuerySet().facet('category')
        # print sqs.facet_counts()
        dict1['filters'] = filters
        dict1['count'] = total_count
        dict1['stores'] = []
        dict1['products'] = []
        count = 0
        for result in sqs: #give only first 28 products for now
            if(count>=28):
                break
            count+=1
            product = {}
            product["id"] = result.id
            product["store"] = result.storeid
            product["name"] = result.name
            product["price"] = result.price
            product["price_discounted"] = result.price_discounted
            product["store_name"] = result.store_name
            product["location"] = result.location
            dict1['products'].append(product)
        return Response(dict1)

class StoreSearchView(APIView):
    def get(self,request):
        """
        Return product search results.
        """
        query_p = request.GET.get('product','')
        query_l = request.GET.get('location','')
        page = request.GET.get('page','')
        
        query = query_p+" "+query_l
        q = None
        or_query = None
        if(query.strip()!=''):
            for word in query.strip().split(" "):
                q = SQ(content='%s' % word)
                if or_query is None:
                    or_query = q
                else:
                    or_query = or_query | q
        #filter by other request parameters if present
        sqs = SearchQuerySet()
        for key in request.GET.iterkeys():
            # Add filtering logic here.
            if key!='product' and key!='location' and key!='page':
                valuelist = request.GET.get(key,'')
                sqs = sqs.filter(**{'%s' %key:valuelist})

        #order by other request parameters if present

        if or_query is not None:
            sqs = sqs.filter(or_query)

        total_count = len(sqs)
        dict1 = {}

        filters = {}
        filters['sex'] = sqs.facet('sex').facet_counts()['fields']['sex']
        filters['category'] = sqs.facet('category').facet_counts()['fields']['category']
        filters['location'] = sqs.facet('location').facet_counts()['fields']['location']
        filters['sizes'] = sqs.facet('sizes').facet_counts()['fields']['sizes']
        dict1['filters'] = filters

        dict1['count'] = total_count
        dict1['stores'] = []
        dict1['products'] = []
        count = 0
        stores_seen = Set()
        for result in sqs: #give only first 28 products for now
            if(count>=28):
                break
            if result.storeid not in stores_seen:
                stores_seen.add(result.storeid)
                count+=1
                store = {}
                # store["product_id"] = result.id
                store["store"] = result.storeid
                store["name"] = result.store_name
                store["location"] = result.location
                dict1['stores'].append(store)

        return Response(dict1)

# class ProductLatestView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer  # Create your views here.

#     def get_queryset(self):
#         return Product.objects.all().order_by('created_on').reverse()[:1]