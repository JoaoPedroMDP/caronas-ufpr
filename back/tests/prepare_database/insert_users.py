#  coding: utf-8
from requests import post

def insert_users():
    users_url = "http://localhost:8000/routes/users/"

    users = [
        {"name": "João", "firebase_id": "1234567890", "contact": "joaopedro_mdep"},
        {"name": "André", "firebase_id": "0987654321", "contact": "andre25avila"},
    ]

    for user in users:
        response = post(users_url, data=user)
        print(response, response.json(), response.status_code)


if __name__ == '__main__':
    insert_users()
