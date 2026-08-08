import os
import google.generativeai as genai

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")


def generate_questions(resume_text):

    prompt = f"""
Generate 8 interview questions based on the following resume.

Resume:
{resume_text}
"""

    try:
        response = model.generate_content(prompt)

        questions = [
            q.strip()
            for q in response.text.split("\n")
            if q.strip()
        ]

        return questions

    except Exception as e:
        print(f"Gemini Error: {e}")

        # Fallback questions
        return [
            "Tell me about yourself.",
            "Walk me through your resume.",
            "What was the most challenging project you worked on?",
            "What technologies are you most comfortable with?",
            "Explain a technical problem you solved recently.",
            "How do you handle tight deadlines?",
            "What are your strengths and weaknesses?",
            "Why should we hire you for this role?"
        ]