AUSTRALIAN IMMIGRATION AI ADVISOR
=================================

QUICK START:

1. Extract this ZIP file

2. Run setup:
   Linux/Mac: ./setup.sh
   Windows: setup.bat

3. Add your OpenAI API key:
   Edit: backend/.env
   Add: OPENAI_API_KEY=sk-your-key-here

4. Start backend (Terminal 1):
   cd backend
   source venv/bin/activate   (Windows: venv\Scripts\activate)
   uvicorn main:app --reload

5. Start frontend (Terminal 2):
   cd frontend
   npm start

6. Open browser:
   http://localhost:3000

REQUIREMENTS:
- Python 3.11+
- Node.js 18+
- OpenAI API key

That's it!