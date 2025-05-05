from django.conf.urls import url
from inquiry import views


urlpatterns = [
    
    url(r'^panel/enquiry/$', views.enquiry, name='enquiry'),
    url(r'^panel/enquiry/view/(?P<enquiry_pk>\d+)/$', views.enquiry_view, name='enquiry_view'),
    url(r'^panel/enquiry/delete/(?P<enquiry_pk>\d+)/$', views.enquiry_delete, name='enquiry_delete'),

]
