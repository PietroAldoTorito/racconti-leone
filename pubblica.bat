@echo off
REM ============================================
REM   I Racconti del Riccio - Pubblica sul web
REM   Fai DOPPIO CLICK su questo file.
REM ============================================
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0pubblica.ps1"
echo.
echo Premi un tasto per chiudere questa finestra...
pause >nul
