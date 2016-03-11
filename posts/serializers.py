from rest_framework import serializers

from .models import Post, Comment


class PostSerializer(serializers.HyperlinkedModelSerializer):
    upvote_count = serializers.IntegerField(source='get_upvote_count', read_only=True)
    downvote_count = serializers.IntegerField(source='get_downvote_count', read_only=True)
    comment_count = serializers.IntegerField(source='get_comment_count', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'created', 'title', 'body', 'author', 'picture',
                  'upvote_count', 'downvote_count', 'comment_count')
        read_only_fields = ('upvote_count', 'downvote_count', 'comment_count')


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='get_author_name', read_only=True)

    class Meta:
        model = Comment
        fields = ('user', 'post', 'created', 'comment', 'author_name')
        read_only_fields = ('author_name')

