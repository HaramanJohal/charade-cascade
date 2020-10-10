from .db import get_db


def add_game_to_db(db, game_name):
    db.execute(
        'INSERT INTO games (game_name, red_score, blue_score, turn, round)'
        ' VALUES (?, ?, ?, ?, ?)',
        (game_name, 0, 0, 0, "speech")
    )
    db.commit()
    print(f"created a new game: {game_name}")


def update_game_turn(db, game_name, red_score, blue_score, turn, round, prompts):
    db.execute(
        'UPDATE games '
        'SET red_score = ?, '
        'blue_score = ?, '
        'turn = ?, '
        'round = ?'
        ' WHERE game_name = ?',
        (red_score, blue_score, turn, round, game_name)
    )

    for prompt in prompts:
        db.execute(
            'UPDATE prompts '
            'SET used_in_speech_round = ?, '
            'used_in_word_round = ?, '
            'used_in_charade_round = ?'
            ' WHERE game_name = ?',
            (
                prompt["used_in_speech_round"],
                prompt["used_in_word_round"],
                prompt["used_in_charade_round"],
                game_name
            )
        )

    db.commit()
    print(f"ended turn in game {game_name}")


def add_user_to_game(db, game_name, user_name):
    users = get_users_by_game_name(db, game_name)
    team = "red" if len(users) % 2 == 0 else "blue"
    db.execute(
        'INSERT INTO users (game_name, user_name, team)'
        ' VALUES (?, ?, ?)',
        (game_name, user_name, team)
    )
    db.commit()
    print(f"added user {user_name} to game {game_name}")


def add_prompts_to_game(db, game_name, prompts_string):
    prompts = prompts_string.split("£")
    for prompt in prompts:
        db.execute(
            'INSERT INTO prompts (game_name, prompt, used_in_speech_round, used_in_word_round, used_in_charade_round)'
            ' VALUES (?, ?, ?, ?, ?)',
            (game_name, prompt, 0, 0, 0)
        )
        print(f"added prompt {prompt} to game {game_name}")
    db.commit()


def get_game_by_name(db, game_name):
    games = db.execute("SELECT * FROM games WHERE game_name=?", (game_name,)).fetchall()
    return list(games[0])


def get_users_by_game_name(db, game_name):
    users = db.execute("SELECT * FROM users WHERE game_name=?", (game_name,)).fetchall()
    return [list(user) for user in users] if len(users) > 0 else []


def get_prompts_by_game_name(db, game_name):
    prompts = db.execute("SELECT * FROM prompts WHERE game_name=?", (game_name,)).fetchall()
    return [list(prompt) for prompt in prompts]


def get_state(db, game_name):
    game = get_game_by_name(db, game_name)
    users = get_users_by_game_name(db, game_name)
    prompts = get_prompts_by_game_name(db, game_name)
    
    game_fields = ["id", "created", "game_name", "red_score", "blue_score", "turn", "round"]
    user_fields = ["id", "created", "game_name", "user_name", "team", "turn_queue_position"]
    prompt_fields = ["id", "game_name", "created", "prompt", "used_in_speech_round", "used_in_word_round", "used_in_charade_round"]
    
    game_details = {key: val for (key, val) in zip(game_fields, game)}
    user_details = [{key: val for (key, val) in zip(user_fields, user)} for user in users]
    
    prompt_details = [{prompt_fields[i]: val for i, val in enumerate(prompt)} for prompt in prompts]

    return {"game": game_details, "users": user_details, "prompts": prompt_details}


def new_game(game_name, user_name, prompts_string):
    db = get_db()
    
    add_game_to_db(db, game_name)
    
    add_user_to_game(db, game_name, user_name)

    add_prompts_to_game(db, game_name, prompts_string)

    return get_state(db, game_name)


def join_existing_game(game_name, user_name, prompts_string):
    db = get_db()

    add_user_to_game(db, game_name, user_name)

    add_prompts_to_game(db, game_name, prompts_string)

    return get_state(db, game_name)


def rejoin_existing_game(game_name, user_name):
    db = get_db()

    return get_state(db, game_name)


def refresh_existing_game(game_name):
    db = get_db()

    return get_state(db, game_name)


def process_updates(game_name, updates):
    db = get_db()

    update_game_turn(
        db,
        game_name,
        updates["red_score"],
        updates["blue_score"],
        updates["turn"],
        updates["round"],
        updates["prompts"]
    )
    
    return get_state(db, game_name)
