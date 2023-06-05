CREATE DATABASE sound_wave;
\c sound_wave

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT
);


CREATE TABLE playlists(
    playlist_id SERIAL PRIMARY KEY,
    song_name TEXT,
    artist TEXT,
    album TEXT
);

