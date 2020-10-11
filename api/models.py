from app import db


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String())
    red_score = db.Column(db.Integer())
    blue_score = db.Column(db.Integer())
    turn = db.Column(db.Integer())
    game_over = db.Column(db.Boolean())

    def __init__(self, game_name, red_score, blue_score, turn):
        self.game_name = game_name
        self.red_score = red_score
        self.blue_score = blue_score
        self.turn = turn
        self.game_over = False

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id, 
            'game_name': self.game_name,
            'red_score': self.red_score,
            'blue_score': self.blue_score,
            'turn': self.turn,
            'game_over': self.game_over,
        }


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String())
    user_name = db.Column(db.String())
    team = db.Column(db.String())

    def __init__(self, game_name, user_name, team):
        self.game_name = game_name
        self.user_name = user_name
        self.team = team

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id, 
            'game_name': self.game_name,
            'user_name': self.user_name,
            'team': self.team,
        }


class Prompt(db.Model):
    __tablename__ = 'prompts'

    id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.String())
    prompt = db.Column(db.String())
    game_round = db.Column(db.String())

    def __init__(self, game_name, prompt, game_round):
        self.game_name = game_name
        self.prompt = prompt
        self.game_round = game_round

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id, 
            'game_name': self.game_name,
            'prompt': self.prompt,
            'game_round': self.game_round,
        }
