#!/bin/bash

# Read the APP_ENV environment variable
APP_ENV=${APP_ENV:-prod}

if [ -f "package.json" ]; then
    app_prep.sh
    npm run start
fi