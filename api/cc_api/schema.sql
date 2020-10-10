DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS prompts;

CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    game_name TEXT NOT NULL,
    red_score INTEGER NOT NULL,
    blue_score INTEGER NOT NULL,
    turn INTEGER NOT NULL,
    round TEXT NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    game_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    team TEXT NOT NULL,
    FOREIGN KEY (game_name) REFERENCES games (game_name)
);

CREATE TABLE prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    prompt TEXT NOT NULL,
    used_in_speech_round INTEGER NOT NULL,
    used_in_word_round INTEGER NOT NULL,
    used_in_charade_round INTEGER NOT NULL,
    FOREIGN KEY (game_name) REFERENCES games (game_name)
);