@echo off
echo Stopping any running processes...
taskkill /f /im node.exe 2>NUL

echo Clearing React cache...
rmdir /s /q node_modules\.cache 2>NUL

echo Restarting the development server...
npm run dev

echo Done!
