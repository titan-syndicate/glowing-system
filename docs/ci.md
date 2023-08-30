---
layout: default
title: Continuous Integration
---

# CI Workflows Documentation

Our continuous integration process consists of three main GitHub workflows:

1. **build-tag-push-dev-image**: Responsible for building the application, creating its image, and pushing it to Docker Hub.
2. **update-helm-repo**: To be invoked only if the infrastructure undergoes any changes.
3. **helm-upgrade-dev**: Pulls the latest version of the `@latest-dev` tag of the image and performs a Helm upgrade on our development Kubernetes cluster.

## Workflow Details

### 1. `build-tag-push-dev-image`
This workflow is the first in the sequence and is essential for every deployment process. Here's what it does:

- Builds the next version of our application.
- Creates a Docker image of this build.
- Pushes the Docker image to Docker Hub with the tag `@latest-dev`.

### 2. `update-helm-repo`
This workflow should only be invoked if there's a change in our infrastructure. If there are no modifications, this step can be skipped because the development environment always defaults to the `@latest-dev` tag. The key responsibilities include:

- Updating the Helm repository with any new changes.

### 3. `helm-upgrade-dev`
This workflow carries out the following:

- Calls the `helm upgrade` command on the development Kubernetes cluster.
- Ensures that the cluster pulls down the latest version of the image tagged `@latest-dev`.

## Workflow Sequence

```mermaid
graph TD
    A[Start] --> B[build-tag-push-dev-image]
    B --> C[Push image tagged with @latest-dev tag to Docker Hub]
    D[Infrastructure Change?]
    C --> D
    D -- Yes --> E[update-helm-repo]
    D -- No --> F[helm-upgrade-dev]
    E --> F
    F --> G[End]
```

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
