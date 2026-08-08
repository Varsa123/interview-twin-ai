from fastapi import APIRouter
from pydantic import BaseModel

from app.services.evaluator import evaluate_answer

router = APIRouter()

class EvaluationRequest(BaseModel):
    question: str
    answer: str


@router.post("/evaluate-answer")
def evaluate(request: EvaluationRequest):

    result = evaluate_answer(
        request.question,
        request.answer
    )

    return result