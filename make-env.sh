#!/bin/bash

# Ensure we stop on any errors
set -e

# Retrieve the secrets from vlt and write to .env file
echo "DOCKER_USERNAME=$(vlt secrets get --plaintext DOCKER_USERNAME)" > .env.act
echo "DOCKER_PASSWORD=$(vlt secrets get --plaintext DOCKER_PASSWORD)" >> .env.act
echo "GITHUB_TOKEN=$(vlt secrets get --plaintext TS_GITHUB_TOKEN)" >> .env.act

# Retrieve the KUBECONFIG_64 variable from vlt
KUBECONFIG_64=$(vlt secrets get --plaintext KUBECONFIG_64)
# Append KUBECONFIG_64 to .env
echo "KUBECONFIG_64=$KUBECONFIG_64" >> .env.act

echo ".env.act file has been generated."
