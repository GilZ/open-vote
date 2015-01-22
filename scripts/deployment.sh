#!/bin/sh

apt-get update
apt-get -y install bash --upgrade
apt-get -y install openssh-server --upgrade

apt-get install -y nodejs npm git
ln -v /usr/bin/nodejs /usr/bin/node

cd /opt

git clone https://github.com/GilZ/open-vote.git

npm install -g bower forever

cd /opt/open-vote/client && npm install

cd /opt/open-vote/server && npm install && echo "{\"port\": 80}" > config/config.json && forever start app.js