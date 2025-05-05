from django.conf.urls import url, include
from authenticate import views


urlpatterns = [

    url(r"^authentication/login/$", views.mylogin, name="mylogin"),
    url(r"^authentication/logout/$", views.mylogout, name="mylogout"),
    url(r"^authentication/master_panel/$", views.master_panel, name="master_panel"),


]
