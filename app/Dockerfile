FROM node:10

RUN npm install -g create-react-app

RUN mkdir /app
WORKDIR /app

# Install app into container
ADD . /app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

#COPY package.json /usr/src/app/package.json

RUN npm install --silent

CMD ["npm", "run", "start"]

EXPOSE 3000