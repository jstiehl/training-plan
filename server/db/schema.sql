drop table if exists training_user cascade;
create table training_user(
  id text primary key not null,
  first_name text,
  last_name text,
  username text,
  email text not null,
  deleted boolean default FALSE not null,
  profile_image_url text,
  updated_date TIMESTAMP(0) default current_timestamp(0) not null,
  created_date TIMESTAMP(0) default current_timestamp(0) not null
);

drop table if exists user_session cascade;
create table user_session(
  userid text references training_user(id) not null,
  token text,
  created_date TIMESTAMP(0) default current_timestamp(0) not null
);

drop table if exists training_plan cascade;
create table training_plan(
  id serial primary key not null,
  userid text references training_user(id) not null,
  name text not null,
  description text,
  active boolean default FALSE not null,
  started_date TIMESTAMP(0),
  created_date TIMESTAMP(0) default current_timestamp(0) not null
);

drop table if exists training_plan_period cascade;
create table training_plan_period(
  id serial primary key not null,
  userid text references training_user(id) not null,
  planid int references training_plan(id) not null,
  name text not null,
  weekly_plan jsonb null,
  created_date TIMESTAMP(0) default current_timestamp(0) not null
);