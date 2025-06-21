from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import backend.pruebas as pruebas
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

class TextosEntrada(BaseModel):
    textos: list[str]

@app.post("/analizar")
def analizar_textos(data: TextosEntrada):
    try:
        resultados = pruebas.analizar_lista(data.textos, pruebas.model)
        return resultados.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # o ["*"] para permitir todo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)