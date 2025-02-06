

@echo off
rem Mise en ligne du site

call .\UpdateProjectList.bat || call node ./node_modules/react-scripts/bin/react-scripts.js start