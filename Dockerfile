FROM node:boron

# Install xvfb server to run headless electron
RUN apt-get update && apt-get install -y \
	xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi \
	xfonts-scalable xfonts-cyrillic x11-apps clang \
	libdbus-1-dev libgtk2.0-dev libnotify-dev libgnome-keyring-dev \
	libgconf2-dev libasound2-dev libcap-dev libcups2-dev libxtst-dev \
	libxss1 libnss3-dev gcc-multilib g++-multilib

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn --pure-lockfile

# Bundle app source
COPY . /usr/src/app/
RUN npm run build

EXPOSE 3000
CMD xvfb-run --server-args="-screen 0 3840x2160x24" npm run serve -s hn -m create -p 11878025