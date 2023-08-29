#!/bin/bash

# Ensure we stop on any errors
set -e

vlt logout || true
vlt login

# Retrieve the secrets from vlt and write to .env file
echo "DOCKER_USERNAME=$(vlt secrets get -o="titan-syndicate" --app-name="glowing-system" --plaintext DOCKER_USERNAME)" > .env.secrets
echo "DOCKER_PASSWORD=$(vlt secrets get -o="titan-syndicate" --app-name="glowing-system" --plaintext DOCKER_PASSWORD)" >> .env.secrets
echo "GITHUB_TOKEN=$(vlt secrets get -o="titan-syndicate" --app-name="glowing-system" --plaintext TS_GITHUB_TOKEN)" >> .env.secrets

# Retrieve the KUBECONFIG_64 variable from vlt
KUBECONFIG_64=$(vlt secrets get -o="titan-syndicate" --app-name="glowing-system" --plaintext KUBECONFIG_64)
# Append KUBECONFIG_64 to .env
echo "KUBECONFIG_64=$KUBECONFIG_64" >> .env.secrets

vlt logout

echo ".env file has been generated."
