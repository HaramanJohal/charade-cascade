import os

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy


# create and configure the app
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from game import (
    new_game,
    join_existing_game,
    refresh_existing_game,
    process_updates,
    rejoin_existing_game,
    end_existing_game
)

# a simple page that says hello
@app.route('/hello')
def hello():
    return 'Hello, World!'


@app.route('/create-game', methods=['GET'])
def create_game():
    game_name = request.args.get('game_name', type=str)
    user_name = request.args.get('user_name', type=str)
    prompts_string = request.args.get('prompts', type=str)
    game = new_game(db, game_name, user_name, prompts_string)

    return jsonify(game)


@app.route('/join-game', methods=['GET'])
def join_game():
    game_name = request.args.get('game_name', type=str)
    user_name = request.args.get('user_name', type=str)
    prompts_string = request.args.get('prompts', type=str)
    game = join_existing_game(db, game_name, user_name, prompts_string)

    return jsonify(game)


@app.route('/rejoin-game', methods=['GET'])
def rejoin_game():
    game_name = request.args.get('game_name', type=str)
    user_name = request.args.get('user_name', type=str)
    game = rejoin_existing_game(db, game_name, user_name)

    return jsonify(game)


@app.route('/refresh-game', methods=['GET'])
def refresh_game():
    game_name = request.args.get('game_name', type=str)
    game = refresh_existing_game(db, game_name)

    return jsonify(game)


@app.route('/end-turn', methods=['POST'])
def end_turn():
    game_name = request.args.get('game_name', type=str)
    updates = request.get_json()
    
    game = process_updates(db, game_name, updates)

    return jsonify(game)


@app.route('/end-game', methods=['POST'])
def end_game():
    game_name = request.args.get('game_name', type=str)
    updates = request.get_json()
    
    game = end_existing_game(db, game_name, updates["red_score"], updates["blue_score"])

    return jsonify(game)