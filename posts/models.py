from __future__ import unicode_literals

from django.conf import settings
from django.db import models


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, default='')
    body = models.TextField(max_length=500)
    link = models.TextField(blank=True)
    picture = models.ImageField(upload_to='uploads/post_pictures/', blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    favorited_by = models.ManyToManyField(settings.AUTH_USER_MODEL, through='Favorite', related_name='favorites')
    votes = models.ManyToManyField(settings.AUTH_USER_MODEL, through='Vote', related_name='posts_voted')
    #votes = models.ManyToManyField(settings.AUTH_USER_MODEL,
#                                   through='Vote',
#                                   related_name="voted_posts")

    def get_upvote_count(self):
        return Vote.objects.filter(up=True, post=self).count()

    def get_downvote_count(self):
        return Vote.objects.filter(up=False, post=self).count()

    def get_comment_count(self):
        return Comment.objects.filter(post=self).count()

    class Meta:
        ordering = ('created',)


class Tag(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)


class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    post = models.ForeignKey(Post)
    created = models.DateTimeField(auto_now_add=True)
    up = models.BooleanField()


class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    post = models.ForeignKey(Post)
    created = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    post = models.ForeignKey(Post)
    created = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(max_length=500)

    def get_author_name(self):
        return self.user.username


class Tagging(models.Model):
    post = models.ForeignKey(Post)
    tag = models.ForeignKey(Tag)