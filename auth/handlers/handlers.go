package handlers

import (
  "fmt"
  "net/http"
  "time"
  "encoding/json"
  "training/auth/db"
  "github.com/gorilla/mux"
  "database/sql"
  "strconv"
  jwt "github.com/dgrijalva/jwt-go"
)

type User struct {
  Id int`json:"id"`
  FirstName string `json:"first_name"`
  LastName string `json:"last_name"`
  Email string `json:"email"`
  UserName string `json:"username"`
}

type TrainingUser struct {
  Id int`json:"id"`
  UserName string `json:"username"`
  Email string `json:"email"`
}

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
  var userRecord User
  var id int 
  var username, email, last_name, first_name string
  dec := json.NewDecoder(r.Body)
  jsonerr := dec.Decode(&user)
  if jsonerr != nil {
    panic(jsonerr)
  }
  sqlStatement := db.GetUser
  row := db.DBCon.QueryRow(sqlStatement, user.Email)

  switch err := row.Scan(&id, &username, &email, &last_name, &first_name); err {
    case sql.ErrNoRows:
      fmt.Println("No rows were returned!")
    case nil:
      userRecord.Id=id
      userRecord.UserName = username
      userRecord.Email = email
      userRecord.LastName = last_name
      userRecord.FirstName = first_name
    default:
      panic(err)
  }

  access_token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claim{
    userRecord,
    jwt.StandardClaims{
      ExpiresAt: time.Now().Unix() + 3600*1000,
    },
  })
  mySigningKey := []byte("Dozo6da2aiphoh0QuahKujee1Osei0is5abeefeeguy0RoJai9Leet2ai9ahkotu")
  accessTokenString, err := access_token.SignedString(mySigningKey)

  refresh_token := jwt.NewWithClaims(jwt.SigningMethodHS256, Claim{
    userRecord,
    jwt.StandardClaims{
      ExpiresAt: time.Now().Unix() + 3600*1000*24,
    },
  })
  refreshTokenString, err := refresh_token.SignedString(mySigningKey)

  if err != nil {
    panic(err)
  }
  json.NewEncoder(w).Encode(Tokens{Token{accessTokenString, time.Now().Unix() + 3600*1000,}, Token{refreshTokenString, time.Now().Unix() + 3600*1000*24,}})
}

func Handler(w http.ResponseWriter, r *http.Request) {
  fmt.Println(r.Method)
  switch r.Method {
    case http.MethodGet:
        fmt.Println("GET Method match")
        getUsers(w, r)
    case http.MethodPost:
        // Create a new record.
      fmt.Println("POST Method match")
      createUser(w, r)
      return
    case http.MethodPut:
        // Update an existing record.
      fmt.Println("PUT Method match")
      return
    case http.MethodDelete:
      // Remove the record.
      fmt.Println("DELETE Method match")
      deleteUser(w,r)
      return
    default:
        // Give an error message.
    }
}

func getUsers (w http.ResponseWriter, r *http.Request) {
  var usersArray []TrainingUser
  sqlStatement := db.GetUsers
  rows, err := db.DBCon.Query(sqlStatement)
  if err != nil {
    panic(err)
  }
  for rows.Next() {
    var uid int
    var username string
    var email string
    err = rows.Scan(&uid, &username, &email)
    if err != nil {
      panic(err)
    }
    usersArray = append(usersArray,TrainingUser{uid,username,email})
  }
  json.NewEncoder(w).Encode(usersArray)
}

func createUser(w http.ResponseWriter, r *http.Request) {
  var newUser TrainingUser
  dec := json.NewDecoder(r.Body)
  jsonerr := dec.Decode(&newUser)
  if jsonerr != nil {
    //would need better error handling here
    panic(jsonerr)
  }

  sqlStatement := db.CreateUserQuery
  id :=0
  err := db.DBCon.QueryRow(sqlStatement, newUser.UserName, newUser.Email).Scan(&id)
  if err != nil {
    panic(err)
  }
  newUser.Id = id
  fmt.Println("New record ID is:", id)
  json.NewEncoder(w).Encode(newUser)
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
  fmt.Println(r.Method)
  vars := mux.Vars(r)
  id := vars["id"]
  fmt.Println(id)
  sqlStatement := db.DeleteUserQuery
  err := db.DBCon.QueryRow(sqlStatement, id).Scan(&id)
  if err != nil {
    panic(err)
  }
  fmt.Println("Deleted record ID is:", id)
  intId, err := strconv.Atoi(id)
  fmt.Println(intId)
  if err != nil {
    panic(err)
  }
  deleted := TrainingUser{
    Id: intId,
  }
  json.NewEncoder(w).Encode(deleted)
}