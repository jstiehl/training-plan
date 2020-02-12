package main

import (
  "fmt"
  "net/http"
  "github.com/gorilla/mux"
  ghandlers "github.com/gorilla/handlers"
  "training/auth/handlers"
  "training/auth/db"
)

func main() {
  //initialize db connection
  db.Connect()
  defer db.DBCon.Close()
  //setup routes
  r := mux.NewRouter()
  allowedOrigins := ghandlers.AllowedOrigins([]string{"*"})
  allowedHeaders := ghandlers.AllowedHeaders([]string{"Content-Type"})
  r.HandleFunc("/login", handlers.LoginHandler).Methods("POST")
  r.HandleFunc("/refresh", handlers.RefreshTokenHandler).Methods("POST")
  r.HandleFunc("/users", handlers.Chain(handlers.Handler, handlers.AuthMiddleware())).Methods("GET", "POST")
  r.HandleFunc("/users/{id}", handlers.Chain(handlers.Handler, handlers.AuthMiddleware())).Methods("GET", "PUT", "DELETE")

  fmt.Println("Server listening on port 8080")
  if err := http.ListenAndServe(":8080", ghandlers.CORS(allowedOrigins, allowedHeaders)(r)); err != nil {
    panic(err)
  }
}