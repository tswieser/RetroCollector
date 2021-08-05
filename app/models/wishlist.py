from .db import db


class WishList(db.Model):
    __tablename__ = "wishlists"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    consoleName = db.Column(db.String(255), nullable=False)
    cib_value = db.Column(db.Numeric(10, 2), nullable=False)
    loose_value = db.Column(db.Numeric(10, 2), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    users = db.relationship('User', back_populates="wishlists")

    def to_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'consoleName': self.consoleName,
            'cib_value': float(self.cib_value),
            'loose_value': float(self.loose_value),
            'genre': self.genre,
            'release_date': self.release_date,
            'user_id': self.user_id
        }
