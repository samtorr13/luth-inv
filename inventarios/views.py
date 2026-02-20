from urllib import request
from django.shortcuts import render
from django.template.loader import get_template
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from django.db.models import Sum
from django.contrib.auth.decorators import login_required


from materiales.models import material
from .models import Inventarios, stock_inv, AlertaStock

@login_required
def dashboard(request):
    
    user = request.user
    inv = user.admin_of 
    
    mat = material.objects.all()
    total_stock = inv.Stock.objects.aggregate(Sum('mat_qty'))['mat_qty__sum'] or 0

    recent_alerts = AlertaStock.objects.filter(resuelto=False).order_by('-fecha')[:5]
    alert = AlertaStock.objects.filter(resuelto=False)

    
    escuelas = Inventarios.objects.filter(es_depo=False).all()



    if hasattr(user, 'rol'):
            if user.rol == 'ADMIN':
                return render(request, "dashboard.html", {"user": user, 
                                                          "materiales": mat,
                                                           "alertas": alert,
                                                           "recent_alerts": recent_alerts,
                                                           "inventarios": inv,
                                                            "escuelas": escuelas
                                                           })
            elif user.rol == 'ESCUELA':
                return render(request, "dashboardes.html", {"user": user, 
                                                            "materiales": mat,
                                                            "alertas": alert,
                                                            "recent_alerts": recent_alerts,
                                                            "total_stock": total_stock
                                                            })

    
    
