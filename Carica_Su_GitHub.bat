@echo off
title Caricamento App Inoxtubi su GitHub
set PATH=C:\Program Files\nodejs;C:\Program Files\Git\cmd;%PATH%
echo ======================================================
echo       CARICAMENTO APP INOXTUBI SU GITHUB
echo ======================================================
echo.
echo Connessione a: https://github.com/riccardoinox/inoxtubi-app.git
echo.
git remote remove origin >nul 2>&1
git remote add origin https://github.com/riccardoinox/inoxtubi-app.git
echo Invio del codice in corso...
echo (Se si apre una finestra nel browser, autorizza l'accesso con il tuo account GitHub)
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ======================================================
    echo   CARICAMENTO COMPLETATO CON SUCCESSO SU GITHUB!
    echo ======================================================
) else (
    echo ======================================================
    echo   ERRORE DURANTE IL CARICAMENTO.
    echo ======================================================
)
echo.
pause
