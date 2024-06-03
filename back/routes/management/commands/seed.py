#  coding: utf-8
import logging
import os
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection

from routes.models import Place, User


lgr = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Popula a base com dados de teste'

    def add_arguments(self, parser):
        parser.add_argument("--test", action='store_true', help="Se deve criar dados para testes manuais")

    def handle(self, *app_labels, **options):
        neighborhoods = [
            {"name": "Água Verde", "type": "neighborhood"},
            {"name": "Ahú", "type": "neighborhood"},
            {"name": "Alto Boqueirão", "type": "neighborhood"},
            {"name": "Alto da Glória", "type": "neighborhood"},
            {"name": "Alto da Rua XV", "type": "neighborhood"},
            {"name": "Atuba", "type": "neighborhood"},
            {"name": "Augusta", "type": "neighborhood"},
            {"name": "Bacacheri", "type": "neighborhood"},
            {"name": "Bairro Alto", "type": "neighborhood"},
            {"name": "Barreirinha", "type": "neighborhood"},
            {"name": "Batel", "type": "neighborhood"},
            {"name": "Bigorrilho", "type": "neighborhood"},
            {"name": "Boa Vista", "type": "neighborhood"},
            {"name": "Bom Retiro", "type": "neighborhood"},
            {"name": "Boqueirão", "type": "neighborhood"},
            {"name": "Butiatuvinha", "type": "neighborhood"},
            {"name": "Cabral", "type": "neighborhood"},
            {"name": "Cachoeira", "type": "neighborhood"},
            {"name": "Cajuru", "type": "neighborhood"},
            {"name": "Campina do Siqueira", "type": "neighborhood"},
            {"name": "Campo Comprido", "type": "neighborhood"},
            {"name": "Campo de Santana", "type": "neighborhood"},
            {"name": "Capão da Imbuia", "type": "neighborhood"},
            {"name": "Capão Raso", "type": "neighborhood"},
            {"name": "Cascatinha", "type": "neighborhood"},
            {"name": "Caximba", "type": "neighborhood"},
            {"name": "Centro", "type": "neighborhood"},
            {"name": "Centro Cívico", "type": "neighborhood"},
            {"name": "Cidade Industrial", "type": "neighborhood"},
            {"name": "Cristo Rei", "type": "neighborhood"},
            {"name": "Fanny", "type": "neighborhood"},
            {"name": "Fazendinha", "type": "neighborhood"},
            {"name": "Ganchinho", "type": "neighborhood"},
            {"name": "Guaíra", "type": "neighborhood"},
            {"name": "Guabirotuba", "type": "neighborhood"},
            {"name": "Hauer", "type": "neighborhood"},
            {"name": "Hugo Lange", "type": "neighborhood"},
            {"name": "Jardim Botânico", "type": "neighborhood"},
            {"name": "Jardim das Américas", "type": "neighborhood"},
            {"name": "Jardim Social", "type": "neighborhood"},
            {"name": "Juvevê", "type": "neighborhood"},
            {"name": "Lamenha Pequena", "type": "neighborhood"},
            {"name": "Lindóia", "type": "neighborhood"},
            {"name": "Mercês", "type": "neighborhood"},
            {"name": "Mossunguê", "type": "neighborhood"},
            {"name": "Novo Mundo", "type": "neighborhood"},
            {"name": "Orleans", "type": "neighborhood"},
            {"name": "Parolin", "type": "neighborhood"},
            {"name": "Pilarzinho", "type": "neighborhood"},
            {"name": "Pinheirinho", "type": "neighborhood"},
            {"name": "Portão", "type": "neighborhood"},
            {"name": "Prado Velho", "type": "neighborhood"},
            {"name": "Rebouças", "type": "neighborhood"},
            {"name": "Riviera", "type": "neighborhood"},
            {"name": "Santa Cândida", "type": "neighborhood"},
            {"name": "Santa Felicidade", "type": "neighborhood"},
            {"name": "Santa Quitéria", "type": "neighborhood"},
            {"name": "Santo Inácio", "type": "neighborhood"},
            {"name": "São Braz", "type": "neighborhood"},
            {"name": "São Francisco", "type": "neighborhood"},
            {"name": "São João", "type": "neighborhood"},
            {"name": "São Lourenço", "type": "neighborhood"},
            {"name": "São Miguel", "type": "neighborhood"},
            {"name": "Seminário", "type": "neighborhood"},
            {"name": "Sitio Cercado", "type": "neighborhood"},
            {"name": "Taboão", "type": "neighborhood"},
            {"name": "Tanguá", "type": "neighborhood"},
            {"name": "Tarumã", "type": "neighborhood"},
            {"name": "Tatuquara", "type": "neighborhood"},
            {"name": "Tingui", "type": "neighborhood"},
            {"name": "Uberaba", "type": "neighborhood"},
            {"name": "Umbará", "type": "neighborhood"},
            {"name": "Vila Izabel", "type": "neighborhood"},
            {"name": "Vista Alegre", "type": "neighborhood"},
            {"name": "Xaxim", "type": "neighborhood"}
        ]

        campi_ufpr = [
            {"name": "Politécnico", "type": "campus"},
            {"name": "Botânico", "type": "campus"},
            {"name": "Agrárias", "type": "campus"},
            {"name": "Reitoria", "type": "campus"},
        ]

        for neighborhood in neighborhoods:
            lgr.debug(f"Criando {neighborhood['name']}")
            Place.objects.create(**neighborhood)

        for campus in campi_ufpr:
            lgr.debug(f"Criando {campus['name']}")
            Place.objects.create(**campus)

        users = [
            {"name": "Maria", 'username': 'mar@mar.com', "contact": "insta: @mar", 'password': 'marmar', 'bio': 'Bio de mar', 'email': 'mar@mar.com'},
            {"name": "Guilherme", 'username': 'gui@gui.com', "contact": "insta: @gui", 'password': 'guigui', 'bio': 'Bio de gui', 'email': 'gui@gui.com'},
            {"name": "Jão", 'username': 'jao@jao.com', "contact": "insta: @jao", 'password': 'jaojao', 'bio': 'Bio de jao', 'email': 'jao@jao.com'},
        ]

        for raw_user in users:
            lgr.debug(f"Criando {raw_user['name']}")
            user = User.objects.create(**raw_user)
            user.set_password(raw_user['password'])
            user.save()
