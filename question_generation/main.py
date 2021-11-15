from pipelines import pipeline
from fastapi import Request, FastAPI
from fastapi.middleware.cors import CORSMiddleware

nlp = pipeline("e2e-qg")

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Server is Running"}

@app.post("/")
async def generate_questions(request: Request):
    input_text = await request.json()
    response = nlp(input_text)
    return {"questions": response}
