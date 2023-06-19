#  coding: utf-8
from requests import post

def insert_users():
    users_url = "http://localhost:8000/routes/users/"

    users = [
        {"name": "João", "firebase_id": "1234567890"},
        {"name": "Tainá", "firebase_id": "0987654321"},
    ]

    for user in users:
        response = post(users_url, data=user)
        print(response, response.json(), response.status_code)