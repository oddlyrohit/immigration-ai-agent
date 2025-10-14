@echo off
echo Setting up...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
copy ..\env.example .env
cd ..\frontend
npm install
echo REACT_APP_API_URL=http://localhost:8000 > .env
echo Done! Edit backend\.env