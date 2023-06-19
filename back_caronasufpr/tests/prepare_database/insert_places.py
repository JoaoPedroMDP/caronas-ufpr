#  coding: utf-8
from requests import post

def insert_places():
    places_url = 'http://localhost:8000/routes/places/'
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
        response = post(places_url, data=neighborhood)
        print(response, response.json(), response.status_code)

    for campus in campi_ufpr:
        response = post(places_url, data=campus)
        print(response, response.json(), response.status_code)
