from app.services.ai_engine import model


def evaluate_answer(question, answer):

    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
{question}

Answer:
{answer}

Provide:

1. Score out of 10
2. Strengths
3. Weaknesses
4. Suggestions for improvement

Format:

Score: X/10

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...
"""

    try:
        response = model.generate_content(prompt)

        return {
            "evaluation": response.text
        }

    except Exception as e:
        return {
            "evaluation": f"""
Score: 7/10

Strengths:
- Answer is relevant.

Weaknesses:
- Could not perform AI evaluation.

Suggestions:
- Add more details and examples.

Error:
{str(e)}
"""
        }