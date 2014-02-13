# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Store.num_images'
        db.add_column(u'shop_store', 'num_images',
                      self.gf('django.db.models.fields.IntegerField')(null=True),
                      keep_default=False)


        # Changing field 'Product.price'
        db.alter_column(u'shop_product', 'price', self.gf('django.db.models.fields.IntegerField')(null=True))

        # Changing field 'Product.price_discounted'
        db.alter_column(u'shop_product', 'price_discounted', self.gf('django.db.models.fields.IntegerField')(null=True))

    def backwards(self, orm):
        # Deleting field 'Store.num_images'
        db.delete_column(u'shop_store', 'num_images')


        # Changing field 'Product.price'
        db.alter_column(u'shop_product', 'price', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Product.price_discounted'
        db.alter_column(u'shop_product', 'price_discounted', self.gf('django.db.models.fields.FloatField')(null=True))

    models = {
        u'shop.product': {
            'Meta': {'object_name': 'Product'},
            'active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'brand': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'category': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'color': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'created_on': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '2000', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'made_to_order': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'material': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'num_images': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'popularity': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'price': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'price_discounted': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'sex': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'sizes': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['shop.Size']", 'symmetrical': 'False'}),
            'sku': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'store': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['shop.Store']"}),
            'sub_category': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'updated_on': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'shop.productimage': {
            'Meta': {'object_name': 'ProductImage'},
            'alt': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'flag_home': ('django.db.models.fields.BooleanField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'productID': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['shop.Product']"}),
            'url': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        },
        u'shop.review': {
            'Meta': {'object_name': 'Review'},
            'created_on': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'product': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['shop.Product']"}),
            'reviewerID': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['shop.Reviewer']"}),
            'store': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['shop.Store']"})
        },
        u'shop.reviewer': {
            'Meta': {'object_name': 'Reviewer'},
            'date_joined': ('django.db.models.fields.DateField', [], {}),
            'downvotes': ('django.db.models.fields.IntegerField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'num_reviews': ('django.db.models.fields.IntegerField', [], {}),
            'popularity': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'sex': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'upvotes': ('django.db.models.fields.IntegerField', [], {})
        },
        u'shop.size': {
            'Meta': {'object_name': 'Size'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '20'})
        },
        u'shop.store': {
            'Meta': {'object_name': 'Store'},
            'active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'address': ('django.db.models.fields.CharField', [], {'max_length': '2000', 'blank': 'True'}),
            'city': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'created_on': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'day_closed': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '2000', 'blank': 'True'}),
            'designer_bio': ('django.db.models.fields.CharField', [], {'max_length': '2000', 'blank': 'True'}),
            'designer_name': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'fb_link': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latest_news': ('django.db.models.fields.CharField', [], {'max_length': '2000', 'blank': 'True'}),
            'locality': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'map_url': ('django.db.models.fields.URLField', [], {'max_length': '1000', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'num_images': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'phone1': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'phone2': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'pincode': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'popularity': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'region': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'time_close': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'time_open': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'tw_link': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'updated_on': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'website': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'})
        },
        u'shop.storeimage': {
            'Meta': {'object_name': 'StoreImage'},
            'alt': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            'flag_home': ('django.db.models.fields.BooleanField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'storeID': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['shop.Store']"}),
            'url': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        }
    }

    complete_apps = ['shop']