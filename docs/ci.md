---
layout: default
title: Continuous Integration
---

# CI Workflows Documentation

Our continuous integration process consists of three main GitHub workflows:

1. **create-release-pr** - increments the chart and app versions in the helm chart
2. **deploy-release** - workflow with three jobs to update the app image, update the helm chart repo. and then upgrade the dev environment with the latest pre-release.

It's recommended to update the chart versions with the GitHub action. Only prerelease versions are currently supported.

After merging the release pr, run the **deploy-release** workflow and GitHub Actions will do the rest.

# Running GitHub Actions Locally

Running your GitHub Actions workflows locally ensures that they perform correctly before pushing them to your repository. This guide covers the process, from setup to execution.

## Prerequisites

- **Docker Dev Container**: Before getting started, make sure you're operating within the Docker Dev Container.
  - [Launch Docker Dev Environment](https://open.docker.com/dashboard/dev-envs?url=https://github.com/titan-syndicate/glowing-system)

- **npm**: If you're in a new dev container, remember to execute `npm install`.

- **HashiCorp Vault**: Being configured with HashiCorp Vault Secrets is essential. Running GitHub Actions locally will require several secrets.

## Configuration

1. **Sync Secrets**:
Run the following npm script to generate a `.env.secrets` file:
```bash
npm run sync-secrets
```
Ensure this file is populated with genuine values, not error messages from Vault.

## Running Workflows

1. **Access NPM Scripts**:
Access an interactive list of npm scripts using:
```bash
npm run interactive
```
or the shorter:
```bash
npm run i
```

2. **Select a Workflow**:
When searching for a GitHub Action workflow to run, they all start with `wf-`. Use the interactive menu, and input `wf-` to narrow down your choices.

## Tips and Tricks

- All GitHub Action workflows are prefixed with `wf-`, making it easy to locate them in the interactive menu.

- Always verify the `.env.secrets` file for its content after running the `sync-secrets` npm script. This step ensures there's no error message from Vault Secrets, and the secrets are fetched correctly.

By adhering to these steps, you can simulate GitHub Actions workflows locally, ensuring they're free of issues before pushing them to your repository.
