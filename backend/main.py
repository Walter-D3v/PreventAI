from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pruebas
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
    allow_origins=["http://localhost:3000",
                   "https://prevent-ai.vercel.app"
                   ],  # o ["*"] para permitir todo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    import uvicorn

uvicorn.run("main:app", host="0.0.0.0", port=10000)
