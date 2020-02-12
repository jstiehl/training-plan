package handlers

import (
  "fmt"
  "net/http"
  "database/sql"
  "training/auth/db"
  "time"
  "encoding/json"
  jwt "github.com/dgrijalva/jwt-go"
)

type Claim struct {
  User
  jwt.StandardClaims
}

type Token struct {
  Token string `json:"token"`
  Expires int64 `json:"expires"`
}

type Tokens struct {
  Access Token `json:"accessToken"`
  Refresh Token `json:"refreshToken"`
}

func LoginHandler(w http.ResponseWriter, r * http.Request) {
  fmt.Println("Login Handler")
  var user User
  dec := json.NewDecoder(r.Body)
  jsonerr := dec.Decode(&user)
  if jsonerr != nil {
    panic(jsonerr)
  }
  sqlStatement := db.GetUser
  row := db.DBCon.QueryRow(sqlStatement, user.Email)

  switch err := row.Scan(&user.Id, &user.UserName, &user.Email, &user.LastName, &user.FirstName); err {
    case sql.ErrNoRows:
      fmt.Println("User not found")
      http.Error(w, "User not found", 403)
    case nil:
      fmt.Println(user)
      access_token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claim{
        user,
        jwt.StandardClaims{
          ExpiresAt: (time.Now().Unix() + 3600)*1000,
        },
      })
      mySigningKey := []byte("Dozo6da2aiphoh0QuahKujee1Osei0is5abeefeeguy0RoJai9Leet2ai9ahkotu")
      accessTokenString, err := access_token.SignedString(mySigningKey)

      refresh_token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claim{
        user,
        jwt.StandardClaims{
          ExpiresAt: (time.Now().Unix() + 24*3600)*1000,
        },
      })
      refreshTokenString, err := refresh_token.SignedString(mySigningKey)

      if err != nil {
        panic(err)
      }
      json.NewEncoder(w).Encode(Tokens{Token{accessTokenString, (time.Now().Unix() + 3600)*1000,}, Token{refreshTokenString, (time.Now().Unix() + 24*3600)*1000,}})
    default:
      http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
  }
}

func RefreshTokenHandler(w http.ResponseWriter, r * http.Request) {
  fmt.Println("Refresh Token Handler")
  var user User
  // var claim Claim
  var refreshToken Token //this is the refresh token
  mySigningKey := []byte("Dozo6da2aiphoh0QuahKujee1Osei0is5abeefeeguy0RoJai9Leet2ai9ahkotu")
  dec := json.NewDecoder(r.Body)
  jsonerr := dec.Decode(&refreshToken)
  if jsonerr != nil {
    fmt.Println("JSON error")
    panic(jsonerr)
  }

  token, err := jwt.ParseWithClaims(refreshToken.Token, &Claim{}, func(token *jwt.Token) (interface{}, error){
    return mySigningKey, nil
  })

  if err != nil {
    fmt.Println("token parsing error")
    fmt.Println(err)
  }

  if _, ok := token.Claims.(*Claim); ok && token.Valid {
    access_token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claim{
      user,
      jwt.StandardClaims{
        ExpiresAt: (time.Now().Unix() + 3600)*1000,
      },
    })

    accessTokenString, err := access_token.SignedString(mySigningKey)

    refresh_token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claim{
      user,
      jwt.StandardClaims{
        ExpiresAt: (time.Now().Unix() + 24*3600)*1000,
      },
    })
    refreshTokenString, err := refresh_token.SignedString(mySigningKey)

    if err != nil {
      fmt.Println("Signing error")
      panic(err)
    }
    json.NewEncoder(w).Encode(Tokens{Token{accessTokenString, (time.Now().Unix() + 3600)*1000,}, Token{refreshTokenString, (time.Now().Unix() + 24*3600)*1000,}})
  } else {
    fmt.Println(err)
    http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
  }
}