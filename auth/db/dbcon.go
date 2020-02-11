package db
import (
  "fmt"
  "database/sql"
  _ "github.com/lib/pq"
)

var (
  // DBCon is the connection handle
  // for the database
  DBCon *sql.DB
)


const (
  host     = "db"
  port     = 5432
  user     = "tadmin"
  password = "password"
  dbname   = "training"
)

func Connect() {
  //initialize db connection
  psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
    "password=%s dbname=%s sslmode=disable",
    host, port, user, password, dbname)
  conn, err := sql.Open("postgres", psqlInfo)
  if err != nil {
    panic(err)
  }
  DBCon = conn
  //ping sets up the connection to db
  err = DBCon.Ping()
  if err != nil {
    panic(err)
  }

  fmt.Println("Successfully connected to Postgres!")
}