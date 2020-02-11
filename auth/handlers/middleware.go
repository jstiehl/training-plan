package handlers

import (
  "fmt"
  "net/http"
)

type Middleware func(http.HandlerFunc) http.HandlerFunc

func AuthMiddleware() Middleware {
  return func(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
      //check auth here. e.g. make sure reg auth header is set
      fmt.Println("Auth Middleware")

      next(w, r)
    }
  }
}

// Chain applies middlewares to a http.HandlerFunc
//https://stackoverflow.com/questions/54443388/go-gorilla-mux-middlewarefunc-with-r-use-and-returning-errors
func Chain(f http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
    for _, m := range middlewares {
        f = m(f)
    }
    return f
}