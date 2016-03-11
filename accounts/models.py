from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from posts.models import Post


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class AccountManager(BaseUserManager):
    def create_user(self, username, email, password):
        user = self.model(username=username,
                          email=email)
        user.is_active = True
        user.set_password(password)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username=username,
                                email=email,
                                password=password)
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user


class Account(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = AccountManager()

    def get_posts(self):
        return Post.object.filter(author=self)

