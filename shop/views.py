from shop.models import *
from rest_framework import viewsets
from shop.serializers import StoreSerializer, ProductSerializer, ReviewSerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.decorators import link
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from haystack.query import SearchQuerySet,SQ

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
        products =  Product.objects.filter(store = self.get_object()).filter(num_images__gt=0)
        serializer = ProductSerializer(products, many=True)
        # dict1 = {}
        # dict1['Products'] = serializer.data
        return Response({"Products":serializer.data})

    @link()
    def reviews(self, request, pk=None):
        reviews =  Review.objects.filter(store = self.get_object())
        serializer = ReviewSerializer(reviews, many=True)
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
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class HomeView(APIView):

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        dict1 = {}
        stores =  Store.objects.filter(pk__in=[4,1,6])
        serializer1 = StoreSerializer(stores, many=True)
        dict1["Stores"] = serializer1.data

        products =  Product.objects.filter(pk__in=[303,480])
        serializer2 = ProductSerializer(products, many=True)
        dict1["Products"] = serializer2.data

        reviews =  Review.objects.all().order_by("-created_on")[:3]
        serializer3 = ReviewSerializer(reviews, many=True)
        dict1["Reviews"] = serializer3.data

        return Response(dict1)

class ProductSearchView(APIView):

    def get(self,request):
        """
        Return product search results.
        """
        query_p = request.GET.get('product','')
        query_l = request.GET.get('location','')
        page = int(request.GET.get('page',1))
        minPrice = int(request.GET.get('minPrice',-1))
        maxPrice = int(request.GET.get('maxPrice',-1))
        # print page
        if(query_p == 'null'):
            query_p = ''
        if(query_l == 'null'):
            query_l = ''
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
        if or_query is not None:
            sqs = sqs.filter(or_query)
        
        price_list = [int(x.price) for x in sqs if int(x.price)>0]
        filters = {}
        filters['sex'] = sqs.facet('sex').facet_counts()['fields']['sex']
        filters['category'] = sqs.facet('category').facet_counts()['fields']['category']
        filters['location'] = sqs.facet('location').facet_counts()['fields']['location']
        filters['sizes'] = sqs.facet('sizes').facet_counts()['fields']['sizes']
        filters['color'] = sqs.facet('color').facet_counts()['fields']['color']
        filters['price'] = [[min(price_list)],[max(price_list)]]
        
        for key in request.GET.iterkeys():
            # Add filtering logic here.
            if key!='product' and key!='location' and key!='page' and key!='minPrice' and key!='maxPrice':
                valuelist = request.GET.get(key,'').split(',')
                if key=='location_f':
                    key = 'location'
                sqs = sqs.filter(**{'%s__in' %key:valuelist})
                # sqs = sqs.filter(color=valuelist)
        if(minPrice!=-1):
            # print minPrice,maxPrice
            sqs = sqs.filter(price__gte=minPrice)
            sqs = sqs.filter(price__lte=maxPrice)
        #order by other request parameters if present
        dict1 = {}
        total_count = sqs.count()
        # print sqs.facet_counts()
        # sqs = SearchQuerySet().facet('category')
        # print sqs.facet_counts()
        dict1['filters'] = filters
        dict1['count'] = total_count
        dict1['stores'] = []
        dict1['products'] = []
        count = 1
        results_per_page = 28
        result_start = (page-1)*(results_per_page)
        result_end = page*results_per_page
        # print result_start,result_end
        for result in sqs[result_start:result_end]: #paginate
            product = {}
            product["count"] = count
            count+=1
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
        page = request.GET.get('page',1)
        if(query_p == 'null'):
            query_p = ''
        if(query_l == 'null'):
            query_l = ''
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
        if or_query is not None:
            sqs = sqs.filter(or_query)

        filters = {}
        # filters['sex'] = sqs.facet('sex').facet_counts()['fields']['sex']
        # filters['category'] = sqs.facet('category').facet_counts()['fields']['category']
        # filters['location'] = sqs.facet('location').facet_counts()['fields']['location']
        # filters['sizes'] = sqs.facet('sizes').facet_counts()['fields']['sizes']

        for key in request.GET.iterkeys():
            # Add filtering logic here.
            if key!='product' and key!='location' and key!='page':
                valuelist = request.GET.get(key,'').split(',')
                if key=='location_f':
                    key = 'location'
                sqs = sqs.filter(**{'%s__in' %key:valuelist})

        total_count = len(sqs)
        dict1 = {}
        dict1['stores'] = []
        dict1['products'] = []
        count = 0
        stores_seen = set()
        locations = {}
        page = int(page);
        results_per_page = 28
        result_start = (page-1)*(results_per_page)
        for result in sqs:
            if(count>=28):
                break
            if result.storeid not in stores_seen:
                stores_seen.add(result.storeid)
                count+=1
                store = {}
                locations[result.location] = locations.get(result.location,0)+1
                # store["product_id"] = result.id
                store["store"] = result.storeid
                store["name"] = result.store_name
                store["location"] = result.location
                store["region"] = result.region
                store["city"] = result.city
                store["description"] = result.store_desc
                dict1['stores'].append(store)
        dict1['count'] = count
        filters['location'] = locations
        dict1['filters'] = filters
        return Response(dict1)

# class ProductLatestView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer  # Create your views here.

#     def get_queryset(self):
#         return Product.objects.all().order_by('created_on').reverse()[:1]


@api_view(('POST',))
def feedback(request):
    if request.method == 'POST':
        # print 'Raw Data: "%s"' % request.POST
        currFeed = Feedback.objects.create(response = request.DATA)
    return Response("OK")

@api_view(('POST',))
def errorFeedback(request):
    if request.method == 'POST':
        # print 'Raw Data: "%s"' % request.POST
        currFeed = ErrorFeedback.objects.create(response = request.DATA)
    return Response("OK")