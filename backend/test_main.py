from fastapi.testclient import TestClient

import main
from main import app

client = TestClient(app)


def setup_function():
    main.voluntarios_db.clear()
    main.current_id = 1


def test_criar_voluntario_valido():
    response = client.post(
        "/voluntarios",
        json={
            "nome": "Maria Silva",
            "email": "maria@email.com",
            "telefone": "71999999999",
            "cargo_pretendido": "Cozinha",
            "disponibilidade": "Manhã",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["nome"] == "Maria Silva"
    assert data["email"] == "maria@email.com"
    assert data["status"] == "ativo"
    assert "data_inscricao" in data


def test_nao_permitir_email_duplicado():
    payload = {
        "nome": "Maria Silva",
        "email": "maria@email.com",
        "telefone": "71999999999",
        "cargo_pretendido": "Atendimento",
        "disponibilidade": "Manhã",
    }

    primeira_resposta = client.post("/voluntarios", json=payload)
    segunda_resposta = client.post("/voluntarios", json=payload)

    assert primeira_resposta.status_code == 201
    assert segunda_resposta.status_code == 409
    assert segunda_resposta.json()["detail"] == "Email já cadastrado"


def test_soft_delete_deve_inativar_voluntario():
    response = client.post(
        "/voluntarios",
        json={
            "nome": "João Silva",
            "email": "joao@email.com",
            "telefone": "71999999999",
            "cargo_pretendido": "Atendimento",
            "disponibilidade": "Tarde",
        },
    )

    voluntario_id = response.json()["id"]

    delete_response = client.delete(f"/voluntarios/{voluntario_id}")
    assert delete_response.status_code == 200

    get_response = client.get(f"/voluntarios/{voluntario_id}")
    assert get_response.status_code == 200
    assert get_response.json()["status"] == "inativo"
    

def test_listar_voluntarios_filtrando_por_status():
    client.post(
        "/voluntarios",
        json={
            "nome": "Maria Silva",
            "email": "maria@email.com",
            "telefone": "71999999999",
            "cargo_pretendido": "Cozinha",
            "disponibilidade": "Manhã",
        },
    )

    client.post(
        "/voluntarios",
        json={
            "nome": "João Souza",
            "email": "joao@email.com",
            "telefone": "71888888888",
            "cargo_pretendido": "Logística",
            "disponibilidade": "Noite",
        },
    )

    client.delete("/voluntarios/2")

    response = client.get("/voluntarios?status=inativo")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["status"] == "inativo"
    assert data[0]["email"] == "joao@email.com"