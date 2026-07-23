# SignSpeak Setup & Run Instructions

## ✅ Quick Start (Windows)

### 1. Install Python Dependencies
```powershell
cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt
cd ..
```

### 2. Start the Server
```powershell
.\start.bat
```

The server will:
- Start FastAPI at `http://127.0.0.1:8000`
- Automatically open your browser
- Press `Ctrl+C` to stop

---

## ✅ Frontend Setup (Optional - only if modifying UI)

### 1. Install Node Dependencies
```powershell
cd web
npm install
cd ..
```

### 2. Build Frontend
```powershell
cd web
npm run build
cd ..
```

This creates optimized files in `frontend/` (already done).

### 3. Development Mode (Hot Reload)
```powershell
cd web
npm run dev:frontend
```
In another terminal:
```powershell
cd backend
set PYTHONPATH=.
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 📋 Project Structure

```
SignSpeak/
├── backend/              # FastAPI server + AI inference
│   ├── main.py           # WebSocket endpoints
│   ├── models/asl.pt     # LSTM model (pre-trained)
│   └── requirements.txt   # Python dependencies
├── frontend/             # Built static files (served by backend)
├── web/                  # React source (if modifying UI)
└── start.bat            # Windows quick-start script
```

---

## 🎯 Features

- **Live Interpreter**: Real-time ASL alphabet recognition
- **Practice Mode**: Learn individual letters
- **Hangman Game**: Practice with word guessing

---

## 🔧 Troubleshooting

**Error: "Python not found"**
- Install Python 3.11+ from [python.org](https://www.python.org)
- Add to PATH during installation

**Error: "torch not found"**
- Run: `pip install --extra-index-url https://download.pytorch.org/whl/cpu torch`

**Port 8000 already in use**
- Kill process: `netstat -ano | findstr :8000` then `taskkill /PID <PID>`
- Or change port in `start.bat`: replace `--port 8000` with `--port 8001`

**Camera permission denied**
- Allow camera access when the browser popup appears

---

Made with ❤️ for accessible communication
