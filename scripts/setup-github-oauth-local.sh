#!/bin/bash

# Check if gh is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) is not installed."
    exit
fi

APP_NAME="Fistbump Local OAuth App"

# Login to gh
gh auth login

# Check if OAuth app already exists
existing_app=$(gh api /users/:username/apps | jq -r ".[] | select(.name == \"$APP_NAME\")")

# If the app doesn't exist, create it
if [ -z "$existing_app" ]; then
    echo "OAuth App doesn't exist. Creating..."
    app_data=$(gh api /users/:username/apps --method POST --field name="$APP_NAME" --field url="http://localhost:3000" --field callback_url="http://localhost:3000/api/auth/callback" -q ".id, .client_id, .client_secret")
else
    echo "OAuth App already exists."
    app_data=$existing_app
fi

client_id=$(echo $app_data | jq -r '.client_id')
client_secret=$(echo $app_data | jq -r '.client_secret')

# Add to .env.local
echo "GITHUB_CLIENT_ID=$client_id" > .env.local
echo "GITHUB_CLIENT_SECRET=$client_secret" >> .env.local
