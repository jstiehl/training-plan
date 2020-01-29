FROM node:10

RUN yarn global add create-react-app

RUN mkdir /app
WORKDIR /app

# Install app into container
ADD . /app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

#COPY package.json /usr/src/app/package.json

RUN yarn install --silent

CMD ["yarn", "start"]

EXPOSE 3000