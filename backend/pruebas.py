# Re-import the necessary libraries after upgrading
from sentence_transformers import SentenceTransformer, util
import torch
import json
from detoxify import Detoxify
import os

# The rest of your code remains the same
# Carga rápida del modelo para embeddings semánticos
embedder = SentenceTransformer('all-MiniLM-L6-v2')
model = Detoxify('original')
# Cargar archivo JSON con patrones

ruta = os.path.join(os.path.dirname(__file__), "patrones_manipulacion.json")
with open(ruta, "r", encoding="utf-8") as f:

# Lista de frases clave por tipo de manipulación
    patrones = json.load(f)

# Aplanamos todas las frases clave en una lista para embeddings
# Lista completa de frases clave
frases_clave = []
for lista in patrones.values():
    frases_clave.extend(lista)

# Generamos embeddings del corpus (frases clave)
corpus_embeddings = embedder.encode(frases_clave, convert_to_tensor=True)

# Función base de clasificación por coincidencia exacta
def clasificar_tipo_manipulacion(texto, prediccion_toxicidad):
    texto_lower = texto.lower()
    for tipo, frases in patrones.items():
        for frase in frases:
            if frase in texto_lower:
                return tipo
    # Clasificación indirecta simple
    if prediccion_toxicidad["insult"] > 0.85 and (
        "nadie" in texto_lower or "vales" in texto_lower or "fracaso" in texto_lower
    ):
        return "desprecio/control"
    return "ninguna"

# Función para encontrar frase clave más similar (semánticamente)
def similaridad_maxima(texto, umbral=0.75):
    embedding = embedder.encode(texto, convert_to_tensor=True)
    matches = util.semantic_search(embedding, corpus_embeddings, top_k=1)
    top = matches[0][0]
    if top['score'] >= umbral:
        return frases_clave[top['corpus_id']], float(top['score'])
    else:
        return None, 0.0

# Función combinada que usa coincidencia y similitud semántica
def clasificar_tipo_manipulacion_semantica(texto, prediccion_toxicidad):
    tipo = clasificar_tipo_manipulacion(texto, prediccion_toxicidad)
    if tipo != "ninguna":
        return tipo

    frase_sim, score = similaridad_maxima(texto)
    if frase_sim:
        # Buscamos el tipo de manipulación para la frase detectada
        for t, frases in patrones.items():
            if frase_sim in frases:
                return t
    return "ninguna"


# Ejemplo de función analizar_lista actualizada para devolver el tipo manipulación
def analizar_lista(textos, modelo_detoxify):
    import pandas as pd
    resultados = []
    for texto in textos:
        toxic = modelo_detoxify.predict(texto)
        tipo_manipulacion = clasificar_tipo_manipulacion_semantica(texto, toxic)
        manipulacion = tipo_manipulacion != "ninguna"

        resultados.append({
            "texto": texto,
            "toxicity": toxic.get("toxicity", 0),
            "insult": toxic.get("insult", 0),
            "manipulacion_detectada": manipulacion,
            "tipo_manipulacion": tipo_manipulacion,
        })
    return pd.DataFrame(resultados)


# ------------------------
# EJEMPLO DE USO (asumiendo que tienes el modelo Detoxify cargado como 'modelo_detoxify')
# ------------------------

textos_prueba = [
      "Tú no haces nada por nadie, no sirves para nada",
      "Si me quisieras de verdad, harías lo que te pido",
      "Eres un idiota inútil. Nadie te soporta.",
      "Estoy aquí para ayudarte.",
      "Tú me obligaste a actuar así.",
      "no sirves para nada",
      "eres horrible vete",
      "te amo",
      "quitate la ropa",
      "muestrame tu cosita",
      "dejate de estupideces",
      "yo soy todo lo que necesitas",
      "no vales nada",
      "tu me obligaste a ser asi",
      "hazlo por mí",
      "me haces daño",
      "no vales nada",
      "te quiero",
      "te adoro"
]

df_resultados = analizar_lista(textos_prueba, model)
print(df_resultados)