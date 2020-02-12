FROM golang:latest

RUN mkdir /app
WORKDIR /app

# Install app into container
ADD . .

RUN go mod download

CMD ["go", "run", "server.go"]

EXPOSE 8080