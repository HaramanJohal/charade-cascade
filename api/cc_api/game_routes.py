import json

from flask import (
    Blueprint, flash, g, redirect, render_template, request, jsonify
)
from werkzeug.exceptions import abort

from .utils import get_random_string
from .game import (
    new_game,
    join_existing_game,
    refresh_existing_game,
    process_updates,
    rejoin_existing_game
)

bp = Blueprint('game_routes', __name__)

@bp.route('/create-game', methods=['GET'])
def create_game():
    game_name = request.args.get('game_name', type=str)
    user_name = request.args.get('user_name', type=str)
    prompts_string = request.args.get('prompts', type=str)
    game = new_game(game_name, user_name, prompts_string)

    return jsonify(game)


@bp.route('/join-game', methods=['GET'])
def join_game():
    game_name = request.args.get('game_name', type=str)
    user_name = request.args.get('user_name', type=str)
    prompts_string = request.args.get('prompts', type=str)
    game = join_existing_game(game_name, user_name, prompts_string)

    return jsonify(game)


@bp.route('/rejoin-game', methods=['GET'])
def rejoin_game():
    game_name = request.args.get('game_name', type=str)
    user_name = request.args.get('user_name', type=str)
    game = rejoin_existing_game(game_name, user_name)

    return jsonify(game)


@bp.route('/refresh-game', methods=['GET'])
def refresh_game():
    game_name = request.args.get('game_name', type=str)
    game = refresh_existing_game(game_name)

    return jsonify(game)


@bp.route('/end-turn', methods=['POST'])
def end_turn():
    game_name = request.args.get('game_name', type=str)
    updates = request.get_json()
    
    game = process_updates(game_name, updates)

    return jsonify(game)
