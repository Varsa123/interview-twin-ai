from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.evaluation import router as evaluation_router
from app.routers.resume import router as resume_router


app = FastAPI(
    title="Interview Twin AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(resume_router)
app.include_router(evaluation_router)


@app.get("/")
def home():
    return {
        "status": "running",
        "project": "Interview Twin AI",
        "message": "Backend Working Successfully"
    }


@app.get("/health")
def health():
    return {
        "server": "active"
    }