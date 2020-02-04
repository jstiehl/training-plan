FROM node:10

RUN mkdir /server
WORKDIR /server

# Install app into container
ADD . .
RUN npm install

CMD ["node", "index.js"]

EXPOSE 5000