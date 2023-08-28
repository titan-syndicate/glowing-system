#!/bin/bash

# Ensure we stop on any errors
set -e

# Retrieve the secrets from vlt and write to .env file
echo "DOCKER_USERNAME=$(vlt secrets get --plaintext DOCKER_USERNAME)" > .env
echo "DOCKER_PASSWORD=$(vlt secrets get --plaintext DOCKER_PASSWORD)" >> .env
echo "GITHUB_TOKEN=$(vlt secrets get --plaintext GITHUB_TOKEN)" >> .env

echo ".env file has been generated."
