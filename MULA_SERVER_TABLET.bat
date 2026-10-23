@echo off
title Math Saga KSSR - Server Tablet Android
echo ============================================================
echo   MATH SAGA KSSR (DARJAH 1 HINGGA DARJAH 6)
echo   Buka pautan di bawah pada pelayar Chrome di Tab Android
echo   (Pastikan Tab Android bersambung ke Wi-Fi yang sama)
echo ============================================================
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    echo   Pautan Tab Android : http://%%a:8080
)
echo   Pautan PC / Laptop : http://localhost:8080
echo.
echo ============================================================
npx --yes http-server -p 8080 -c-1
pause
