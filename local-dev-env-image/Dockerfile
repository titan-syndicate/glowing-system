# Start with a fully featured version of Ubuntu
FROM ubuntu:latest

# Set environment variables to non-interactive (this ensures that installation does not prompt user for inputs)
ENV DEBIAN_FRONTEND=noninteractive

# create and set non root user
RUN useradd -ms /bin/zsh developer
USER developer

# Run the system update
RUN sudo apt-get update && sudo apt-get upgrade -y

# Install essential tools
RUN sudo apt-get install -y curl software-properties-common lsb-release sudo gnupg2 xdg-utils vim jq postgresql-client docker.io zsh python3-pip

# Install gorilla-cli
RUN pip3 install gorilla-cli

# Install Helm and kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
  && chmod +x kubectl \
  && sudo mv kubectl /usr/local/bin/
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install Node
RUN NODE_MAJOR=20 \
  && sudo apt-get update \
  && sudo apt-get install -y ca-certificates curl gnupg \
  && sudo mkdir -p /etc/apt/keyrings \
  && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Since k9s uses pacman which is an Arch Linux package manager and we are using Ubuntu, this step requires some workarounds.
# To simplify the Dockerfile, I recommend downloading k9s from its GitHub releases page directly.
RUN curl -LO https://github.com/derailed/k9s/releases/download/v0.25.7/k9s_Linux_x86_64.tar.gz && \
  tar -xvf k9s_Linux_x86_64.tar.gz && \
  mv k9s /usr/local/bin/ && \
  rm k9s_Linux_x86_64.tar.gz

# Install vlt secrets
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && \
  echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list && \
  sudo apt-get update && \
  sudo apt-get install -y vlt

# Install act
RUN curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
RUN sudo mv ./bin/act /usr/local/bin/act

# Install oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install gh CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && sudo apt update \
  && sudo apt install gh -y

#############################################
### DO NOT ADD ANYTHING BELOW THIS LINE #####
#############################################

# Set ZSH as the default shell
RUN chsh -s $(which zsh)

# Clean up APT cache for reducing the image size
RUN sudo apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENTRYPOINT [ "zsh" ]
