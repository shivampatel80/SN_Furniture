from django.conf.urls import url
from panel import views


urlpatterns = [

    url(r'^panel/$', views.panel, name='panel'),

    # product
    url(r'^panel/product/list/$', views.product_list, name='product_list'),
    url(r'^panel/product/add/$', views.product_add, name='product_add'),
    url(r'^panel/product/edit/(?P<product_pk>\d+)/$', views.product_edit, name='product_edit'),
    url(r'^panel/product/delete/(?P<product_pk>\d+)/$', views.product_delete, name='product_delete'),

    url(r'^panel/product/full-sheet/(?P<product_pk>\d+)/$', views.sheet_list, name='sheet_list'),
    url(r'^panel/product/full-sheet/edit/(?P<product_pk>\d+)/(?P<sheet_pk>\d+)/$', views.sheet_edit, name='sheet_edit'),
    url(r'^panel/product/full-sheet/delete/(?P<product_pk>\d+)/(?P<sheet_pk>\d+)/$', views.sheet_delete, name='sheet_delete'),

    # event
    url(r'^panel/event/$', views.event_back, name='event_back'),
    url(r'^panel/event/edit/(?P<event_pk>\d+)/$', views.event_back_edit, name='event_back_edit'),
    url(r'^panel/event/delete/(?P<event_pk>\d+)/$', views.event_back_delete, name='event_back_delete'),

    url(r'^panel/event/image/(?P<event_pk>\d+)/$', views.event_image, name='event_image'),
    url(r'^panel/event/image/edit/(?P<event_pk>\d+)/(?P<event_image_pk>\d+)/$', views.event_image_edit, name='event_image_edit'),
    url(r'^panel/event/image/delete/(?P<event_pk>\d+)/(?P<event_image_pk>\d+)/$', views.event_image_delete, name='event_image_delete'),

    # page-handler
    url(r'^panel/page-handler/$', views.page_handler, name='page_handler'),
    url(r'^panel/page-handler/add/$', views.page_handler_add, name='page_handler_add'),
    url(r'^panel/page-handler/edit/(?P<page_pk>\d+)/$', views.page_handler_edit, name='page_handler_edit'),
    url(r'^panel/page-handler/delete/(?P<page_pk>\d+)/$', views.page_handler_delete, name='page_handler_delete'),


    url(r'^panel/error/$', views.error_back, name='error_back'),
         


]
