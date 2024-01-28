#!/bin/bash

# Read the APP_ENV environment variable
APP_ENV=${APP_ENV:-prod}

if [ -f "package.json" ]; then
    if [ "$APP_ENV" = "dev" ]; then
        npm install
    else
        npm install --only=production
    fi
fi