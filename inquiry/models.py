from django.db import models




class Enquiry(models.Model) :

    name = models.CharField(max_length=250, null=True, blank=True)
    email = models.CharField(max_length=250, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    date = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self) :
        if self.name :
            return self.name + " | pk=" + str(self.pk)
        else :
            return self.pk 

