from django.db import models
from django.shortcuts import reverse

# for deletion of the attachments after deletion of object
from django.db.models.signals import post_delete
from django.dispatch import receiver

# for slugifying the fields
from django.utils.text import slugify



# Page Handler ===================================================================================== >

class Page_Handler(models.Model) :
    
    name = models.CharField(max_length=100, null=True, blank=True)
    name_slug = models.CharField(max_length=100, null=True, blank=True)
    meta_title = models.CharField(max_length=200, null=True, blank=True)
    meta_description = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        super(Page_Handler, self).save(*args, **kwargs)
    
    def __str__(self) :
        return self.name + " (pk=" + str(self.pk) + ")"




class Product(models.Model) :

    index = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    name_slug = models.CharField(max_length=100, null=True, blank=True)

    intro = models.TextField(null=True, blank=True)
    detail = models.TextField(null=True, blank=True)

    image1 = models.ImageField(upload_to='product', null=True, blank=True)

    meta_title = models.TextField(null=True, blank=True)
    meta_description = models.TextField(null=True, blank=True)


    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self) :
        return str(self.index) + " (" + self.name + " )"

    def get_absolute_url(self) :
        return f'/products/{self.name_slug}/'
    

        
@receiver(post_delete, sender=Product)
def submission_delete(sender, instance, **kwargs) :
    instance.image1.delete(False)




class Full_Sheet(models.Model) :

    fk = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    index =  models.CharField(max_length=200, null=True, blank=True)
    number = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    finish = models.CharField(max_length=200, null=True, blank=True)
    size = models.CharField(max_length=200, null=True, blank=True)
    image1 = models.ImageField(upload_to='portfolio/full-sheet', null=True, blank=True)
    has_detail = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self) :
        if self.fk :
            return str(self.index) + ". " + str(self.number) + " (" + self.fk.name + " )"
        else :
            return str(self.index) + ". " + str(self.number) + " ( None, pk =" + str(self.pk) + " )"


@receiver(post_delete, sender=Full_Sheet)
def submission_delete1(sender, instance, **kwargs) :
    instance.image1.delete(False)





class Event(models.Model) :

    name = models.CharField(max_length=250, null=True, blank=True)
    name_slug = models.CharField(max_length=250, null=True, blank=True)

    title = models.CharField(max_length=350, null=True, blank=True)
    intro = models.CharField(max_length=350, null=True, blank=True)
    detail = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.name_slug = slugify(self.name)
        super(Event, self).save(*args, **kwargs)

    def __str__(self) :
        return self.name_slug + " | " + str(self.pk)

    def get_absolute_url(self) :
        return f'/events/{self.name_slug}/'



class Event_Images(models.Model) :

    fk = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True)
    index = models.IntegerField(default=0, null=True, blank=True)
    image1 = models.ImageField(upload_to="events", null=True, blank=True)

    def __str__(self) :
        return self.index

@receiver(post_delete, sender=Event_Images)
def submission_delete2(sender, instance, **kwargs) :
    instance.image1.delete(False)
