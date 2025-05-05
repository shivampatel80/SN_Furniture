from django.db import models
from panel.models import Product, Full_Sheet

# for deletion of the attachments after deletion of object
from django.db.models.signals import post_delete
from django.dispatch import receiver

# for slugifying the fields
from django.utils.text import slugify


# Create your models here.
class VSG(models.Model) :

    area = models.CharField(max_length=250, null=True, blank=True)
    area_slug = models.CharField(max_length=250, null=True, blank=True)
    image1 = models.ImageField(upload_to="vsg", null=True, blank=True)
    is_default = models.BooleanField(default=False, null=True, blank=True)

    meta_title = models.CharField(max_length=250, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.area_slug = slugify(self.area)
        super(VSG, self).save(*args, **kwargs)

    def __str__(self) :
        return str(self.pk) + " | " + self.area

    def get_absolute_url(self) :
        return f'/visualizer/{self.area_slug}/'



@receiver(post_delete, sender=VSG)
def submission_delete(sender, instance, **kwargs) :
    instance.image1.delete(False)


class VSG_Product(models.Model) :

    fk_vsg = models.ForeignKey(VSG, on_delete=models.CASCADE, null=True, blank=True)
    fk_product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self) :

        if self.fk_vsg and self.fk_product :
            return str(self.pk) + " ( Product=" + self.fk_product.name + ", Area=" + self.fk_vsg.area + " )"
        if self.fk_vsg and not self.fk_product :
            return str(self.pk) + " ( Product=None, Area=" + self.fk_vsg.area + " )"
        if not self.fk_vsg and self.fk_product :
            return str(self.pk) + " ( Product=" + self.fk_product.name + ", Area=None )"
        if not self.fk_vsg and not self.fk_product :
            return str(self.pk) + " ( Product=None, Area=None )"