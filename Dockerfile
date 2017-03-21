FROM node:boron

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
CMD [ "npm", "run", "serve" ]