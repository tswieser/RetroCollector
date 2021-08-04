from .db import db


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    game_id = db.Column(
        db.Integer, db.ForeignKey("games.id"), nullable=False)

    games = db.relationship('Game', back_populates='reviews')
    users= db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return{
            'id': self.id,
            'rating': self.rating,
            'review': self.review,
            'user_id': self.user_id,
            'game_id': self.game_id
        }
