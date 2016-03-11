import json

from django.http import HttpResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.decorators import api_view

from posts.models import Post, Favorite
from posts.serializers import PostSerializer
from accounts.models import Account
from accounts.serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @detail_route()
    def posts(self, request, pk):
        author = self.get_object()
        posts = Post.objects.filter(author=author)
        context = {
            'request': request
        }
        post_serializer = PostSerializer(posts, many=True, context=context)
        return Response(post_serializer.data)

    @detail_route()
    def favorites(self, request, pk):
        user = self.get_object()
        favorites = Favorite.objects.filter(user=user)
        context = {
            'request': request
        }
        post_serializer = PostSerializer(favorites, many=True, context=context)
        return Response(post_serializer.data)


@api_view()
def me(request):
    context = {
            'request': request
        }
    account_serializer = AccountSerializer(request.user, context=context)
    return Response(account_serializer.data)


def userlogin(request):
    print request.POST
    print request.body
    print request.user.is_authenticated()
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or len(username) is 0:
        return HttpResponse(
            json.dumps({'error': 'Username is a required field'}), status=403
        )
    if password is None or len(password) is 0:
        return HttpResponse(
            json.dumps({'error': 'Password is a required field'}), status=403
        )
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
#        context = {
#            'request': request
        #}
        #account_serializer = AccountSerializer(user, context=context)
        return HttpResponse(
            json.dumps({
                username: user.username
            }), status=200
        )
    else:
        return HttpResponse(json.dumps({'poop': 'poop'}), status=403)
