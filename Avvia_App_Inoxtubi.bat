@echo off
title Avvio App Inoxtubi Padova
set PATH=C:\Program Files\nodejs;C:\Program Files\Git\cmd;%PATH%
echo ======================================================
echo          AVVIO APP INOXTUBI PADOVA
echo ======================================================
echo.
echo Avvio del server locale in corso...
echo L'app sara aperta automaticamente su: http://localhost:3000
echo.
start http://localhost:3000
npm.cmd run dev
pause
