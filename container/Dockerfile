FROM ubuntu:latest
ARG ARCH=amd64

ENV \
  STERN_VERSION=1.11.0

RUN apt-get update
RUN apt-get install -y zsh curl httping nano git jq tmux vim apache2-utils nmap dnsutils python speedtest-cli wget

# Oh my zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
COPY zshrc /root/.zshrc
# Zsh completions plugin
RUN git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
# Zsh auto suggestions
RUN git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl && \
  chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl

# Kubectx
RUN cd /tmp \
  && git clone https://github.com/ahmetb/kubectx \
  && cd kubectx \
  && mv kubectx /usr/local/bin/kubectx \
  && mv kubens /usr/local/bin/kubens \
  && cd .. \
  && rm -rf kubectx

# Stern
RUN curl -L -o /usr/local/bin/stern https://github.com/wercker/stern/releases/download/${STERN_VERSION}/stern_linux_amd64 \
  && chmod +x /usr/local/bin/stern

# Helm
RUN curl -fsSL -o /tmp/get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 && \
  chmod 700 /tmp/get_helm.sh && /tmp/get_helm.sh

# portx

RUN wget -q `curl -s https://api.github.com/repos/adamhancock/portx/releases/latest | jq -r '.assets[] | select(.name == "portx-linux") |.browser_download_url'` -O /tmp/portx && chmod +x /tmp/portx && mv /tmp/portx /usr/local/bin/portx

# k9s
RUN mkdir -p /tmp/k9s && cd /tmp/k9s && wget https://github.com/derailed/k9s/releases/download/v0.19.1/k9s_Linux_x86_64.tar.gz && tar -xvf k9s_Linux_x86_64.tar.gz && chmod +x k9s && mv k9s /usr/bin


RUN kubectl config set-context kubernetes \
  && kubectl config use-context kubernetes

# Fix zsh with kube ps1
RUN sed -i -e 's/KUBE_PS1_SYMBOL_DEFAULT=/#KUBE_PS1_SYMBOL_DEFAULT=/g' /root/.oh-my-zsh/plugins/kube-ps1/kube-ps1.plugin.zsh
# set default shell

RUN apt-get install iputils-ping

WORKDIR /root
ENTRYPOINT ["zsh", "-l"]

