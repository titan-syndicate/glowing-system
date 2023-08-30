# Start with a fully featured version of Ubuntu
FROM ubuntu:latest

# Set environment variables to non-interactive (this ensures that installation does not prompt user for inputs)
ENV DEBIAN_FRONTEND=noninteractive

# Run the system update
RUN apt-get update && apt-get upgrade -y

# Install essential tools
RUN apt-get install -y curl software-properties-common lsb-release sudo gnupg2 xdg-utils vim

# Install pip for gorilla-cli
RUN apt-get install -y python3-pip && \
  pip3 install gorilla-cli

# Install Helm and kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x kubectl \
    && sudo mv kubectl /usr/local/bin/
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install Node 18
RUN curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
  apt-get install -y nodejs

# Since k9s uses pacman which is an Arch Linux package manager and we are using Ubuntu, this step requires some workarounds.
# To simplify the Dockerfile, I recommend downloading k9s from its GitHub releases page directly.
RUN curl -LO https://github.com/derailed/k9s/releases/download/v0.25.7/k9s_Linux_x86_64.tar.gz && \
  tar -xvf k9s_Linux_x86_64.tar.gz && \
  mv k9s /usr/local/bin/ && \
  rm k9s_Linux_x86_64.tar.gz

# Install vlt secrets
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
  echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list && \
  apt-get update && \
  apt-get install -y vlt

# Install act
RUN curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
RUN sudo mv ./bin/act /usr/local/bin/act

# Install psql client
RUN apt-get install -y postgresql-client

# Install Docker to support Docker-in-Docker
RUN apt-get install -y docker.io

# Install ZSH
RUN apt-get update && apt-get install -y zsh

# Install oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Set ZSH as the default shell
RUN chsh -s $(which zsh)

# Add exception for directory added by docker dev environment
# This is unsafe and you should remove not use this image in other contexts without removing it
RUN git config --global --add safe.directory /com.docker.devenvironments.code

#############################################
### DO NOT ADD ANYTHING BELOW THIS LINE #####
#############################################

# Clean up APT cache for reducing the image size
RUN apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENTRYPOINT [ "zsh" ]
