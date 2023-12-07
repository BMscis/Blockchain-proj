@echo off
setlocal enabledelayedexpansion

set "targetPath=file:///c%3A/Users/alienware/Documents/git/TableBanking/table-banking/next_frontend/table_banking/app/_context.tsx"

set "historyFolder=C:\Users\alienware\AppData\Roaming\Code\User\History"

for /d %%i in ("%historyFolder%\*") do (
    set "jsonFile=%%i\entries.json"

    if exist "!jsonFile!" (
        set "resource="
        for /f "tokens=1,* delims=:" %%a in ('jq -r ".resource" "!jsonFile!" 2^>nul') do set "resource=%%b"
        echo Entry Resource: !resource!
        if /i "!resource!"=="%targetPath%" (
            echo Found matching entry in: %%i
            echo Entry Resource: !resource!
            echo JSON File Path: !jsonFile!
            echo.
        )
    )
)

endlocal
