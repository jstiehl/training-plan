package main

import (
  "fmt"
  "net/http"
  "github.com/gorilla/mux"
  "training/auth/handlers"
  "training/auth/db"
)

func main() {
  //initialize db connection
  db.Connect()
  defer db.DBCon.Close()
  //setup routes
  r := mux.NewRouter()
  r.HandleFunc("/login", handlers.LoginHandler).Methods("POST")
  r.HandleFunc("/users", handlers.Chain(handlers.Handler, handlers.AuthMiddleware())).Methods("GET", "POST")
  r.HandleFunc("/users/{id}", handlers.Chain(handlers.Handler, handlers.AuthMiddleware())).Methods("GET", "PUT", "DELETE")

  http.Handle("/", r)

  fmt.Println("Server listening on port 8080")
  if err := http.ListenAndServe(":8080", nil); err != nil {
    panic(err)
  }
}