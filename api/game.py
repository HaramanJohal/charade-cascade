from models import Game, User, Prompt


def add_game_to_db(db, game_name):
    game = Game(game_name, 0, 0, 0)
    db.session.add(game)
    db.session.commit()
    print(f"created a new game: {game_name}")


def update_game_turn(db, game_name, red_score, blue_score, turn, prompts_to_delete):
    db.session.execute(
        'UPDATE games '
        'SET red_score = :red_score, '
        'blue_score = :blue_score, '
        'turn = :turn '
        ' WHERE game_name = :game_name',
        {
            "red_score": red_score,
            "blue_score": blue_score,
            "turn": turn,
            "game_name": game_name
        }
    )

    if prompts_to_delete != []:
        for prompt in prompts_to_delete:
            p = Prompt.query.filter_by(id=prompt["id"]).first()
            db.session.delete(p)
    db.session.commit()
    print(f"ended turn in game {game_name}")


def add_user_to_game(db, game_name, user_name):
    users = get_users_by_game_name(db, game_name)
    team = "red" if len(users) % 2 == 0 else "blue"
    user = User(game_name, user_name, team)
    db.session.add(user)
    db.session.commit()
    print(f"added user {user_name} to game {game_name}")


def add_prompts_to_game(db, game_name, prompts_string):
    prompts = prompts_string.split("£")
    for prompt in prompts:
        prompt1 = Prompt(game_name, prompt, "speech")
        db.session.add(prompt1)
        prompt2 = Prompt(game_name, prompt, "word")
        db.session.add(prompt2)
        prompt3 = Prompt(game_name, prompt, "charade")
        db.session.add(prompt3)
        print(f"added prompt {prompt} to game {game_name}")
    db.session.commit()


def get_game_by_name(db, game_name):
    return Game.query.filter_by(game_name=game_name).first()


def get_users_by_game_name(db, game_name):
    users = User.query.filter_by(game_name=game_name).all()
    return users


def get_prompts_by_game_name(db, game_name):
    prompts = Prompt.query.filter_by(game_name=game_name).all()
    return prompts


def get_state(db, game_name):
    game = get_game_by_name(db, game_name)
    users = get_users_by_game_name(db, game_name)
    prompts = get_prompts_by_game_name(db, game_name)

    user_details = [user.serialize() for user in users]
    prompt_details = [prompt.serialize() for prompt in prompts]

    return {"game": game.serialize(), "users": user_details, "prompts": prompt_details}


def new_game(db, game_name, user_name, prompts_string):
    add_game_to_db(db, game_name)
    
    add_user_to_game(db, game_name, user_name)

    add_prompts_to_game(db, game_name, prompts_string)

    return get_state(db, game_name)


def join_existing_game(db, game_name, user_name, prompts_string):
    add_user_to_game(db, game_name, user_name)

    add_prompts_to_game(db, game_name, prompts_string)

    return get_state(db, game_name)


def rejoin_existing_game(db, game_name, user_name):
    return get_state(db, game_name)


def refresh_existing_game(db, game_name):
    return get_state(db, game_name)


def process_updates(db, game_name, updates):
    update_game_turn(
        db,
        game_name,
        updates["red_score"],
        updates["blue_score"],
        updates["turn"],
        updates["prompts_to_delete"]
    )
    
    return get_state(db, game_name)


def end_existing_game(db, game_name, red_score, blue_score):
    db.session.execute(
        'UPDATE games '
        'SET red_score = :red_score, '
        'blue_score = :blue_score, '
        'game_over = :game_over '
        ' WHERE game_name = :game_name',
        {
            "red_score": red_score,
            "blue_score": blue_score,
            "game_over": True,
            "game_name": game_name
        }
    )
    db.session.commit()

    return get_state(db, game_name)