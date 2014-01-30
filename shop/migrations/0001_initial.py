# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Size'
        db.create_table(u'shop_size', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=20)),
        ))
        db.send_create_signal(u'shop', ['Size'])

        # Adding model 'Store'
        db.create_table(u'shop_store', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('address', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('phone1', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('phone2', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('website', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('fb_link', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('tw_link', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('day_closed', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('time_open', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('time_close', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('designer_name', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('designer_bio', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('latest_news', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('created_on', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_on', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('popularity', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('active', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('region', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('locality', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('city', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('pincode', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('map_url', self.gf('django.db.models.fields.URLField')(max_length=200, blank=True)),
        ))
        db.send_create_signal(u'shop', ['Store'])

        # Adding model 'Product'
        db.create_table(u'shop_product', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('store', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['shop.Store'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('sku', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('sex', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('price', self.gf('django.db.models.fields.FloatField')(null=True)),
            ('price_discounted', self.gf('django.db.models.fields.FloatField')(null=True)),
            ('brand', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('color', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('material', self.gf('django.db.models.fields.CharField')(max_length=100, blank=True)),
            ('made_to_order', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('active', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('description', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('popularity', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
            ('created_on', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_on', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('num_images', self.gf('django.db.models.fields.IntegerField')(null=True)),
            ('category', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('sub_category', self.gf('django.db.models.fields.CharField')(max_length=50, blank=True)),
            ('status', self.gf('django.db.models.fields.CharField')(max_length=20, blank=True)),
        ))
        db.send_create_signal(u'shop', ['Product'])

        # Adding M2M table for field sizes on 'Product'
        m2m_table_name = db.shorten_name(u'shop_product_sizes')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('product', models.ForeignKey(orm[u'shop.product'], null=False)),
            ('size', models.ForeignKey(orm[u'shop.size'], null=False))
        ))
        db.create_unique(m2m_table_name, ['product_id', 'size_id'])

        # Adding model 'Reviewer'
        db.create_table(u'shop_reviewer', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('sex', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('popularity', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('date_joined', self.gf('django.db.models.fields.DateField')()),
            ('num_reviews', self.gf('django.db.models.fields.IntegerField')()),
            ('upvotes', self.gf('django.db.models.fields.IntegerField')()),
            ('downvotes', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'shop', ['Reviewer'])

        # Adding model 'Review'
        db.create_table(u'shop_review', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('reviewerID', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['shop.Reviewer'])),
            ('store', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['shop.Store'])),
            ('product', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['shop.Product'])),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('created_on', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'shop', ['Review'])

        # Adding model 'ProductImage'
        db.create_table(u'shop_productimage', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('productID', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['shop.Product'])),
            ('url', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('alt', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('flag_home', self.gf('django.db.models.fields.BooleanField')()),
        ))
        db.send_create_signal(u'shop', ['ProductImage'])

        # Adding model 'StoreImage'
        db.create_table(u'shop_storeimage', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('storeID', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['shop.Store'])),
            ('url', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('alt', self.gf('django.db.models.fields.CharField')(max_length=20)),
            ('flag_home', self.gf('django.db.models.fields.BooleanField')()),
        ))
        db.send_create_signal(u'shop', ['StoreImage'])


    def backwards(self, orm):
        # Deleting model 'Size'
        db.delete_table(u'shop_size')

        # Deleting model 'Store'
        db.delete_table(u'shop_store')

        # Deleting model 'Product'
        db.delete_table(u'shop_product')

        # Removing M2M table for field sizes on 'Product'
        db.delete_table(db.shorten_name(u'shop_product_sizes'))

        # Deleting model 'Reviewer'
        db.delete_table(u'shop_reviewer')

        # Deleting model 'Review'
        db.delete_table(u'shop_review')

        # Deleting model 'ProductImage'
        db.delete_table(u'shop_productimage')

        # Deleting model 'StoreImage'
        db.delete_table(u'shop_storeimage')


    models = {
        u'shop.product': {
            'Meta': {'object_name': 'Product'},
            'active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'brand': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'category': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'color': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'created_on': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'made_to_order': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'material': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'num_images': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'popularity': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'price': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'price_discounted': ('django.db.models.fields.FloatField', [], {'null': 'True'}),
            'sex': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'sizes': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['shop.Size']", 'symmetrical': 'False'}),
            'sku': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
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
            'address': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'city': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'created_on': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'day_closed': ('django.db.models.fields.CharField', [], {'max_length': '20', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'designer_bio': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'designer_name': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'fb_link': ('django.db.models.fields.CharField', [], {'max_length': '100', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'latest_news': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'locality': ('django.db.models.fields.CharField', [], {'max_length': '50', 'blank': 'True'}),
            'map_url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
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