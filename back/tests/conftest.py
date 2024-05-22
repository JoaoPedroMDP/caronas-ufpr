#  coding: utf-8

from requests import post
from prepare_database.insert_places import insert_places
from prepare_database.insert_users import insert_users
import  pytest

@pytest.fixture(scope='session')
def insert_places():
    insert_places()

@pytest.fixture(scope='session')
def insert_users():
    insert_users()

