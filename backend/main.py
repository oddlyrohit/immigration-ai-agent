from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import OpenAI
import openai

# SET YOUR API KEY HERE - REPLACE THIS LINE!
openai.api_key = "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"

app = FastAPI(title="Immigration Advisor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = "gpt-3.5-turbo"

# Models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: str
    conversation_history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str
    session_id: str
    sources: Optional[List[Dict]] = []
    warning: Optional[str] = None
    requires_human_agent: bool = False

# System Prompt
SYSTEM_PROMPT = """You are an Australian Immigration Information Assistant. Provide accurate, helpful information about Australian immigration.

CAPABILITIES:
- Explain visa types and eligibility
- Provide document checklists
- Answer immigration questions

LIMITATIONS:
- CANNOT lodge applications
- CANNOT guarantee outcomes
- ARE NOT a licensed migration agent

Be helpful and encourage users to consult registered MARA agents for applications."""

def check_safety(message: str) -> Dict:
    message_lower = message.lower()
    requires_human = any(trigger in message_lower for trigger in ["lodge application", "submit visa", "apply for me"])
    return {
        "is_safe": True,
        "requires_human": requires_human,
        "warning": "This requires a licensed agent." if requires_human else None
    }

def add_disclaimer(response: str, requires_human: bool = False) -> str:
    disclaimer = "\n\n---\n\n"
    if requires_human:
        disclaimer += "⚠️ **Important:** This requires a licensed migration agent.\n\n"
    disclaimer += "*Disclaimer: I am an AI providing general information only. This is not legal advice. Consult a registered MARA agent for applications.*"
    return response + disclaimer

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "1.0.0"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received message: {request.message[:50]}...")
        
        # Safety check
        safety = check_safety(request.message)
        if not safety["is_safe"]:
            return ChatResponse(
                response="I cannot assist with that request.",
                session_id=request.session_id,
                requires_human_agent=True
            )
        
        # Build messages
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in request.conversation_history[-5:]:
            messages.append({"role": msg.role, "content": msg.content})
        messages.append({"role": "user", "content": request.message})
        
        # Call OpenAI
        logger.info("Calling OpenAI API...")
        response = openai.ChatCompletion.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        ai_response = response.choices[0].message.content
        ai_response = add_disclaimer(ai_response, safety["requires_human"])
        
        logger.info("Response generated successfully")
        
        return ChatResponse(
            response=ai_response,
            session_id=request.session_id,
            sources=[],
            warning=safety.get("warning"),
            requires_human_agent=safety["requires_human"]
        )
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)