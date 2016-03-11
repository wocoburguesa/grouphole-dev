import json

from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, detail_route

from posts.serializers import PostSerializer, CommentSerializer
from posts.models import Post, Vote, Comment


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint for posts
    """
    #queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        popular = self.request.query_params.get('popular', None)
        if popular is not None:
            queryset = queryset.filter()
            return queryset
        return queryset

    @detail_route(methods=['post'])
    def upvote(self, request, pk):
        voter = request.user
        Vote.objects.get_or_create(user=voter, post=self.get_object(), up=True)
        context = {
            'request': request
        }
        #post_serializer = PostSerializer(self, many=True, context=context)
        return Response()


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for getting comments
    """
    serializer_class = CommentSerializer

    def get_queryset(self):
        print 'fudge'
        queryset = Comment.objects.all()
        user_id = self.request.query_params.get('user', None)
        post_id = self.request.query_params.get('post', None)
        if user_id is not None and post_id is not None:
            user = get_user_model().objects.get(id=user_id)
            post = Post.objects.get(id=post_id)
            queryset = queryset.filter(user=user, post=post)
            return queryset
        elif post_id is not None:
            post = Post.objects.get(id=post_id)
            queryset = queryset.filter(post=post)
            return queryset
        return queryset


@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})