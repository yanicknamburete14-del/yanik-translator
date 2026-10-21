@echo off
chcp 65001 > nul
title Yanik, Translator - Tradução Simultânea Escolar
color 0B

echo =======================================================================
echo              YANIK, TRANSLATOR - TRADUÇÃO SIMULTÂNEA ESCOLAR          
echo =======================================================================
echo.
echo [1/2] Verificando componentes...

cd /d "%~dp0"

IF EXIST "%~dp0bin\node.exe" (
    SET "NODE_BIN=%~dp0bin\node.exe"
) ELSE (
    SET "NODE_BIN=node"
)

echo [2/2] Iniciando o servidor de tradução simultânea...
echo.
echo -----------------------------------------------------------------------
echo  ✓ O navegador abrirá automaticamente em alguns instantes.
echo  ✓ Se não abrir, acesse: http://localhost:3000
echo  ✓ Celulares na mesma rede Wi-Fi devem usar o QR Code na tela.
echo  ✓ Mantenha esta janela aberta enquanto estiver usando o software.
echo -----------------------------------------------------------------------
echo.

SET OPEN_BROWSER=true
"%NODE_BIN%" server.js

pause
