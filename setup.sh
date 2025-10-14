#!/bin/bash
echo "Setting up..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
cd ../frontend
npm install
echo "REACT_APP_API_URL=http://localhost:8000" > .env
echo "Done! Edit backend/.env and add your OPENAI_API_KEY"