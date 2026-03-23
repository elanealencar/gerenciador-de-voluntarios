from datetime import datetime
from enum import Enum
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Query, status
from pydantic import BaseModel, EmailStr, Field

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sistema de Gerenciamento de Voluntários",
    description="API REST para cadastro e gerenciamento de voluntários",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Disponibilidade(str, Enum):
    manha = "Manhã"
    tarde = "Tarde"
    noite = "Noite"
    fim_de_semana = "Fim de Semana"

class StatusVoluntario(str, Enum):
    ativo = "ativo"
    inativo = "inativo"

class VoluntarioBase(BaseModel):
    nome: str = Field(..., min_length=1, description="Nome do voluntário")
    email: EmailStr
    telefone: str = Field(..., min_length=1, description="Telefone do voluntário")
    cargo_pretendido: str = Field(..., min_length=1, description="Cargo pretendido")
    disponibilidade: Disponibilidade

class VoluntarioCreate(VoluntarioBase):
    pass

class VoluntarioUpdate(VoluntarioBase):
    status: StatusVoluntario

class VoluntarioResponse(VoluntarioBase):
    id: int
    status: StatusVoluntario
    data_inscricao: datetime

voluntarios_db: List[dict] = []
current_id = 1

def buscar_voluntario_por_id(voluntario_id: int) -> dict:
    for voluntario in voluntarios_db:
        if voluntario["id"] == voluntario_id:
            return voluntario
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Voluntário não encontrado",
    )

def email_ja_existe(email: str, ignorar_id: Optional[int] = None) -> bool:
    for voluntario in voluntarios_db:
        if voluntario["email"].lower() == email.lower():
            if ignorar_id is None or voluntario["id"] != ignorar_id:
                return True
    return False

@app.get("/voluntarios", response_model=List[VoluntarioResponse])
def listar_voluntarios(
    status_filter: Optional[StatusVoluntario] = Query(default=None, alias="status"),
    cargo: Optional[str] = None,
    disponibilidade: Optional[Disponibilidade] = None,
):
    resultado = voluntarios_db

    if status_filter is not None:
        resultado = [v for v in resultado if v["status"] == status_filter]

    if cargo is not None:
        resultado = [
            v
            for v in resultado
            if v["cargo_pretendido"].lower() == cargo.lower()
        ]

    if disponibilidade is not None:
        resultado = [v for v in resultado if v["disponibilidade"] == disponibilidade]

    return resultado

@app.get("/voluntarios/{voluntario_id}", response_model=VoluntarioResponse)
def buscar_voluntario(voluntario_id: int):
    return buscar_voluntario_por_id(voluntario_id)

@app.post(
    "/voluntarios",
    response_model=VoluntarioResponse,
    status_code=status.HTTP_201_CREATED,
)
def criar_voluntario(voluntario: VoluntarioCreate):
    global current_id

    if email_ja_existe(voluntario.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email já cadastrado",
        )

    novo_voluntario = {
        "id": current_id,
        "nome": voluntario.nome,
        "email": voluntario.email,
        "telefone": voluntario.telefone,
        "cargo_pretendido": voluntario.cargo_pretendido,
        "disponibilidade": voluntario.disponibilidade,
        "status": StatusVoluntario.ativo,
        "data_inscricao": datetime.now(),
    }

    voluntarios_db.append(novo_voluntario)
    current_id += 1

    return novo_voluntario

@app.put("/voluntarios/{voluntario_id}", response_model=VoluntarioResponse)
def atualizar_voluntario(voluntario_id: int, voluntario: VoluntarioUpdate):
    voluntario_existente = buscar_voluntario_por_id(voluntario_id)

    if email_ja_existe(voluntario.email, ignorar_id=voluntario_id):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email já cadastrado",
        )

    voluntario_existente.update(
        {
            "nome": voluntario.nome,
            "email": voluntario.email,
            "telefone": voluntario.telefone,
            "cargo_pretendido": voluntario.cargo_pretendido,
            "disponibilidade": voluntario.disponibilidade,
            "status": voluntario.status,
        }
    )

    return voluntario_existente

@app.delete("/voluntarios/{voluntario_id}", status_code=status.HTTP_200_OK)
def excluir_voluntario(voluntario_id: int):
    voluntario_existente = buscar_voluntario_por_id(voluntario_id)
    voluntario_existente["status"] = StatusVoluntario.inativo

    return {"message": "Voluntário inativado com sucesso"}