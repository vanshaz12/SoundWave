CREATE DATABASE sound_wave;
\c sound_wave

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT
);

CREATE TABLE songs(
    song_id SERIAL PRIMARY KEY,
    name TEXT,
    artist TEXT,
    duration INT
);

CREATE TABLE playlists(
    playlist_id SERIAL PRIMARY KEY,
    name TEXT,
    user_id INTEGER REFERENCES users(id)
    );