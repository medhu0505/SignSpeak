@echo off
setlocal EnableExtensions

rem SignSpeak — start the FastAPI backend (serves frontend at http://127.0.0.1:8000)
cd /d "%~dp0"

if not exist "frontend\index.html" (
  echo [WARN] frontend\index.html not found.
  echo        Build the frontend first:  cd web ^&^& npm run build
  echo        Starting backend anyway...
  echo.
)

echo Starting SignSpeak server...
echo URL: http://127.0.0.1:8000
echo Press Ctrl+C to stop.
echo.

cd backend
set "PYTHONPATH=."

rem Open browser after a short delay (server starts in foreground)
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000"

set "PYTHON=C:\Users\medhu\AppData\Local\Programs\Python\Python312\python.exe"
if exist "%PYTHON%" (
  "%PYTHON%" -m uvicorn main:app --host 127.0.0.1 --port 8000
) else (
  echo Python 3.12 not found at %PYTHON%
  echo Falling back to: py -3.12
  py -3.12 -m uvicorn main:app --host 127.0.0.1 --port 8000
)

if errorlevel 1 (
  echo.
  echo [ERROR] Server exited unexpectedly.
  pause
  exit /b 1
)

endlocal
