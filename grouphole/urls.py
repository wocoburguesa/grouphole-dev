"""grouphole URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import os

from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import RedirectView
from rest_framework import routers

from posts.views import PostViewSet, CommentViewSet
from accounts.views import AccountViewSet, userlogin, me

router = routers.DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet, base_name="Posts")
router.register(r'comments', CommentViewSet, base_name="Comments")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^login', userlogin),
    url(r'^api/me/', me),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]

urlpatterns += (
    url(r'^dashboard/?$',
        RedirectView.as_view(url='/dashboard/index.html'), name='dashboard'),
    url(r'^dashboard/(?P<path>.*)$', 'django.views.static.serve',
        {
            'document_root': os.path.join(settings.SITE_ROOT,
                                          'frontend/')
        }
    ),
)