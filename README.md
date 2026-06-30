<div align="center">

# ✋ SignSpeak

### AI-Powered Real-Time American Sign Language Interpreter

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MediaPipe](https://img.shields.io/badge/MediaPipe-0F9D58?style=for-the-badge&logo=google&logoColor=white)

**Decode sign language in real-time using just your webcam — no special hardware needed.**

</div>

---

## 🎯 What is SignSpeak?

SignSpeak is a real-time ASL (American Sign Language) alphabet interpreter that uses your webcam and AI to detect and translate hand gestures into text. It features three interactive modes designed to make learning and using sign language accessible to everyone.

### 🧩 Three Modes

| Mode | Description |
|------|-------------|
| **🔤 Live Interpreter** | Spell out letters in real-time. Letters auto-combine into words with smart debouncing. Full word log and keyboard shortcuts for manual control. |
| **🎓 Practice Trainer** | Pick a letter, see the reference sign, and hold the gesture until the AI confirms you've got it right. Built-in progress tracking. |
| **🎮 Hangman Game** | Classic hangman — but you guess letters by signing them. A fun way to practice the full alphabet under pressure. |

---

## ⚙️ How It Works

```
┌──────────┐     WebSocket      ┌──────────────┐     LSTM      ┌────────────┐
│  Browser  │ ──── frames ────▶ │   FastAPI     │ ──── ▶ ──── ▶│  PyTorch   │
│  Webcam   │ ◀── predictions ──│   Backend     │              │  Model     │
└──────────┘                    └──────────────┘              └────────────┘
                                       │
                                 MediaPipe Hands
                              (21 landmark extraction)
```

1. **Webcam** captures frames at 30 FPS in the browser
2. **Frames** are sent over WebSocket to the FastAPI backend
3. **MediaPipe** extracts 21 hand landmarks (63 coordinates) per frame
4. **LSTM neural network** classifies sequences of 30 frames into A–Z letters
5. **Predictions** with confidence scores are streamed back in real-time

---

## 📁 Project Structure

```
SignSpeak/
├── backend/                  # FastAPI server + AI inference
│   ├── main.py               # App entrypoint, WebSocket endpoints
│   ├── inference/             # MediaPipe landmarks + LSTM predictor
│   ├── models/asl.pt          # Trained model weights (275 KB)
│   ├── sessions/              # Per-mode session state (decoder, practice, hangman)
│   └── requirements.txt
├── web/                       # React + Vite + shadcn/ui source
│   ├── src/
│   │   ├── pages/             # Home, Interpreter, Practice, Guide
│   │   ├── components/        # Reusable UI components
│   │   └── lib/               # Camera, WebSocket, image utilities
│   └── public/assets/reference/   # ASL reference images (A–Z)
├── frontend/                  # Pre-built static output (served by backend)
├── trainer/                   # Data capture + model training scripts
│   ├── capture.py             # Record hand landmark sequences
│   └── train.py               # Train the LSTM classifier
├── Dockerfile                 # Production container
├── render.yaml                # One-click Render deploy
└── start.bat                  # Windows quick-start script
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+ (only needed if modifying the frontend)
- A webcam

### Quick Start (Windows)

```powershell
# Clone the repo
git clone https://github.com/medhu0505/SignSpeak.git
cd SignSpeak

# Set up Python environment
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt

# Launch — opens browser automatically
.\start.bat
```

Visit **http://localhost:8000** and allow camera access.

### Manual Start

```bash
cd backend
uvicorn main:app --host 127.0.0.1 --port 8000
```

---

## 🏋️ Training Your Own Model

### 1. Capture Training Data

```bash
cd trainer
python capture.py
```

- Press **A–Z** to set the target letter
- Press **SPACE** to record a 30-frame sequence
- Aim for **~50 samples per letter** with varied hand positions
- Press **Q** or **ESC** to quit

### 2. Train

```bash
python train.py --epochs 50
```

The best model is saved to `backend/models/asl.pt` and auto-loaded on next server start.

---

## 🎛️ Configuration

| Setting | Location | Default |
|---------|----------|---------|
| Sequence length | `backend/sessions/_base.py` | `30 frames` |
| Confidence threshold | `backend/sessions/_base.py` | `0.85` |
| Debounce frames | `backend/sessions/_base.py` | `5` |
| Auto-space timeout | `backend/sessions/decoder.py` | `5.0s` |
| Practice hold time | `backend/sessions/practice.py` | `5.0s` |
| Max wrong guesses | `backend/sessions/hangman.py` | `6` |
| Capture FPS / JPEG quality | Frontend camera config | `30 fps / 0.7` |
| Hangman word list | `backend/assets/words.txt` | — |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Backend**: FastAPI + Uvicorn (WebSocket)
- **AI/ML**: PyTorch (LSTM) + MediaPipe Hands + OpenCV + NumPy
- **Deploy**: Docker + Render

---

## 🎹 Keyboard Shortcuts (Interpreter Mode)

| Key | Action |
|-----|--------|
| `SPACE` | Add current detected letter to word |
| `BACKSPACE` | Delete last letter |
| `ENTER` | Manually commit word to log |
| *Inactive hand (2.5s)* | Auto-logs current word |

---

<div align="center">

**Works 100% offline · Real-time gesture detection · No special hardware**

Made with ❤️ for accessible communication

</div>
