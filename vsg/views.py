from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
import datetime
from django.utils.safestring import mark_safe
import json
from django.core.files.storage import default_storage
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from itertools import chain
from django.contrib.auth.decorators import login_required
from panel.models import Product, Full_Sheet, Page_Handler
from vsg.models import VSG, VSG_Product


# front

def visualizer_default(request) :

    try :
        page_handler = Page_Handler.objects.get(pk=5)
    except :
        page_handler = None

    try :
        vsg = VSG.objects.filter(is_default=True)[0]
    except :
        messages.success(request, 'Visualization area does not exists')

        return redirect('error')

    vsgs = VSG.objects.all()

    vsg_products = VSG_Product.objects.filter(fk_vsg=vsg)

    full_sheets = Full_Sheet.objects.all().order_by('-pk')

    return render(request, 'front/vsg.html', {
        'page_handler': page_handler,
        'vsg': vsg,
        'vsgs': vsgs,
        'vsg_products': vsg_products,
        'full_sheets': full_sheets,
    })





def visualizer(request, area) :

    try :
        page_handler = Page_Handler.objects.get(pk=5)
    except :
        page_handler = None

    try :
        vsg = VSG.objects.get(area_slug=area)
    except :
        messages.error(request, 'Visualization area does not exists')

        return redirect('error')

    vsgs = VSG.objects.all()

    vsg_products = VSG_Product.objects.filter(fk_vsg=vsg)

    full_sheets = Full_Sheet.objects.all().order_by('-pk')

    # trick - 1
    # for i in vsg_products :
    #     full_sheets = Full_Sheet.objects.filter(fk=i.fk_product)
    #     for j in full_sheets :
    #         print(j.number)

    # trick - 2
    # for i in vsg_products :
    #     print("===================================>")
    #     print(i.fk_product.name)
    #     full_sheets = Full_Sheet.objects.filter(fk=i.fk_product)
    #     for j in full_sheets :
    #         print(j.number)


    return render(request, 'front/vsg.html', {
        'page_handler': page_handler,
        'vsg': vsg,
        'vsgs': vsgs,
        'vsg_products': vsg_products,
        'full_sheets': full_sheets,
    })



# back

@login_required
def vsg_back(request) :

    if request.method == 'POST' :

        area = request.POST.get('area', '')
        image1 = request.FILES.get('image1', None)
        is_default = bool(request.POST.get('is_default', False))

        # In case of Default = True, removing previous defaults
        if is_default == True :
            vsg_all = VSG.objects.all()
            for i in vsg_all :
                if i.is_default == True :
                    i.is_default = False
                    i.save()


        vsg_obj = VSG(
            area = area,
            image1 = image1,
            is_default = is_default,
        )

        vsg_obj.save()

        msg = "New area has been successfully added to the list !"
        messages.success(request, msg)

        return redirect('vsg_back')



    vsg_all = VSG.objects.all()

    send = {
        'vsg_all': vsg_all,
    }

    return render(request, 'back/visual-gallery/vsg_back.html', send)


@login_required
def vsg_edit(request, vsg_pk) :

    if request.method == 'POST' :

        try :
            vsg = VSG.objects.get(pk=vsg_pk)
        except :
            msg = "Visual-Gallery object not found, try going back, refresh the page and then try again!"
            messages.error(request, msg)

            return redirect('vsg_back')

        area = request.POST.get('area', '')
        is_default = bool(request.POST.get('is_default', False))
        image1 = request.FILES.get('image1', None)

        if image1 :
            if vsg.image1 :
                default_storage.delete(vsg.image1.path)
            vsg.image1 = image1

        # In case of Default = True, removing previous defaults
        if is_default == True :
            vsg_all = VSG.objects.all()
            for i in vsg_all :
                if i.is_default == True :
                    i.is_default = False
                    i.save()
        
        vsg.area = area
        vsg.is_default = is_default

        vsg.save()

        
        # If there are no defaults after edit, New default would be first item
        count = 0
        vsg_all = VSG.objects.all()
        for i in vsg_all :
            if i.is_default == True :
                count += 1
        if count <= 0 :
            vsg_first = vsg_all.first()
            if vsg_first :
                vsg_first.is_default = True
                vsg_first.save()

        msg = "Changes made to Visual-Gallery area has been committed successfully, they'll be visible on front-end very soon!"
        messages.success(request, msg)

        return redirect('vsg_back')


    try :
        vsg = VSG.objects.get(pk=vsg_pk)
    except :
        msg = "Visual-Gallery object not found, try going back, refresh the page and then try again!"
        messages.error(request, msg)

        return redirect('vsg_back')

    send = {
        'vsg': vsg,
    }

    return render(request, 'back/visual-gallery/vsg_back_edit.html', send)


@login_required
def vsg_delete(request, vsg_pk) :

    try :
        vsg_obj = VSG.objects.get(pk=vsg_pk)
    except :
        msg = "Visual-Gallery object not found, try going back, refresh the page and then try again!"
        messages.error(request, msg)

        return redirect('vsg_back')

    vsg_obj.delete()

    # If deleted item was Default, New default would be first item
    count = 0
    vsg_all = VSG.objects.all()
    for i in vsg_all :
        if i.is_default == True :
            count += 1
    if count <= 0 :
        vsg_first = vsg_all.first()
        if vsg_first :
            vsg_first.is_default = True
            vsg_first.save()

    msg = "Visual-Gallery object has been deleted successfully, changes will be visible on front-side anytime!"
    messages.success(request, msg)

    return redirect('vsg_back')


@login_required
def vsg_back_product(request, vsg_pk) :

    if request.method == 'POST' :

        try :
            vsg_obj = VSG.objects.get(pk=vsg_pk)
        except :
            msg = "Visual-Gallery object not found, try going back, refresh the page and then try again!"
            messages.error(request, msg)

            return redirect('vsg_back')

        product_pk = request.POST.get('product_pk', None)
        is_active = bool(request.POST.get('is_active', None))

        try :
            product = Product.objects.get(pk=product_pk)
        except :
            msg = "Could not find the Product object, try going back, refresh the page and try again later !"
            messages.error(request, msg)

            return redirect('vsg_back_product', vsg_pk)

        vsg_product_all = VSG_Product.objects.filter(fk_vsg=vsg_obj)
        for i in vsg_product_all :
            if i.fk_product == product :
                msg = "Product already exists for this perticular Visual-Gallery area, Try adding something else !"
                messages.error(request, msg)

                return redirect('vsg_back_product', vsg_pk)

        vsg_product_obj = VSG_Product(
            fk_vsg = vsg_obj,
            fk_product = product,
            is_active = is_active,
        )

        vsg_product_obj.save()

        # In case of Active = True, removing previous actives
        if vsg_product_obj.is_active == True :
            for i in vsg_product_all :
                if i.is_active == True :
                    i.is_active = False
                    i.save()

        msg = "Product list for the Visual-Gallery has been successfully extended, changes will be visible on front-end very soon !"
        messages.success(request, msg)

        return redirect('vsg_back_product', vsg_pk)


    try :
        vsg_obj = VSG.objects.get(pk=vsg_pk)
    except :
        msg = "Visual-Gallery object not found, try going back, refresh the page and then try again!"
        messages.error(request, msg)

        return redirect('vsg_back')

    vsg_products = VSG_Product.objects.all().order_by('pk')
    products = Product.objects.all().order_by('pk')

    send = {
        'vsg_obj': vsg_obj,
        'vsg_products': vsg_products,
        'products': products,
    }

    return render(request, 'back/visual-gallery/vsg_back_product.html', send)


@login_required
def vsg_back_product_edit(request, vsg_pk, vsg_product_pk) :

    if request.method == 'POST' :

        try :
            vsg_product = VSG_Product.objects.get(pk=vsg_product_pk)
        except :
            msg = "Visual-Gallery Product could not be found, go back, refresh the page and try again !"
            messages.error(request, msg)

            return redirect('vsg_back_product', vsg_pk)

        try :
            vsg_obj = VSG.objects.get(pk=vsg_pk)
        except :
            msg = "Visual-Gallery Area could not be found, go back, refresh the page and try again !"
            messages.error(request, msg)


        product_pk = request.POST.get('product_pk', None)
        is_active = bool(request.POST.get('is_active', False))

        try :
            product = Product.objects.get(pk=product_pk)
        except :
            msg = "Could not find the Product object, try going back, refresh the page and try again later !"
            messages.error(request, msg)

            return redirect('vsg_back_product', vsg_pk)

        
        vsg_product_all = VSG_Product.objects.filter(fk_vsg=vsg_obj)
        # In case of Active = True, removing previous actives
        if is_active == True :
            for i in vsg_product_all :
                if i.is_active == True :
                    i.is_active = False
                    i.save()
        
        vsg_product.fk_product = product
        vsg_product.is_active = is_active

        vsg_product.save()

        vsg_product_all = VSG_Product.objects.filter(fk_vsg=vsg_obj)
        # In case its not active, checking at least one active is present and if not making first one active
        count = 0
        for i in vsg_product_all :
            if i.is_active == True :
                count += 1
        if count <= 0 :
            vsg_product_first = vsg_product_all.first()
            if vsg_product_first :
                vsg_product_first.is_active = True
                vsg_product_first.save()

        msg = "Edits made to the Visual-Gallery Product has been committed successfully, they'll be visible on front-end very soon !"
        messages.success(request, msg)

        return redirect('vsg_back_product', vsg_pk)


    try :
        vsg_product = VSG_Product.objects.get(pk=vsg_product_pk)
    except :
        msg = "Visual-Gallery Product could not be found, go back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('vsg_back_product', vsg_pk)

    try :
        vsg_obj = VSG.objects.get(pk=vsg_pk)
    except :
        msg = "Visual-Gallery Area could not be found, go back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('vsg_back')

    products = Product.objects.all()


    send = {
        'vsg_product': vsg_product,
        'vsg_obj': vsg_obj,
        'products': products,
    }

    return render(request, 'back/visual-gallery/vsg_back_product_edit.html', send)


@login_required
def vsg_back_product_delete(request, vsg_pk, vsg_product_pk) :

    try :
        vsg_obj = VSG.objects.get(pk=vsg_pk)
    except :
        msg = "Visual-Gallery Area not found, try going back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('vsg_back_product', vsg_pk)

    try :
        vsg_product = VSG_Product.objects.get(pk=vsg_product_pk)
    except :
        msg = "Visual-Gallery Product not found, try going back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('vsg_back_product', vsg_pk)

    vsg_product.delete()

    # If deleted item was Active then New active would be first item
    count = 0
    vsg_product_all = VSG_Product.objects.filter(fk_vsg=vsg_obj)
    for i in vsg_product_all :
        if i.is_active == True :
            count += 1
    if count <= 0 :
        vsg_product_first = vsg_product_all.first()
        if vsg_product_first :
            vsg_product_first.is_active = True
            vsg_product_first.save()

    msg = "Product from Visual-Gallery has been removed for this particular area, changes will be visible on front side very soon !"
    messages.success(request, msg)

    return redirect('vsg_back_product', vsg_pk)






