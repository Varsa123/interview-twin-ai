from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.resume_parser import extract_resume_text
from app.services.ai_engine import generate_questions

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_resume_text(file_path)

    questions = generate_questions(text)

    return {
        "filename": file.filename,
        "resume_text": text,
        "interview_questions": questions
    }