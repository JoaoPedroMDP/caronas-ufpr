#  coding: utf-8
import os
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    help = 'Deleta o shema public, deleta a migration, reconstrói tudo de novo e depois popula com dados de teste'

    def handle(self, *app_labels, **options):

        with connection.cursor() as cursor:
            cursor.execute("PRAGMA writable_schema = 1;")
            cursor.execute("delete from sqlite_master where type in ('table', 'index', 'trigger');")
            cursor.execute("PRAGMA writable_schema = 0;")
            cursor.execute("VACUUM;")
            cursor.execute("PRAGMA INTEGRITY_CHECK;")

        try:
            path = __file__.split('management')[0] + 'migrations/0001_initial.py'
            os.remove(path)
            print(f"{path} removido.")
        except FileNotFoundError:
            print("Arquivo não existia")
            pass

        call_command('makemigrations')
        call_command('migrate')
        call_command('seed')
