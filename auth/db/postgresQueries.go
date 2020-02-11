package db

const GetUsers = `
  SELECT id, username, email from training_user
`

const GetUser = `
  SELECT id, username, email, last_name, first_name from training_user where email=$1
`

const CreateUserQuery = `
    INSERT INTO training_user (username, email)
    VALUES ($1, $2)
    RETURNING id`

const DeleteUserQuery = `
    DELETE FROM training_user WHERE id=$1
    RETURNING id`