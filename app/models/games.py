from .db import db


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    console_id = db.Column(db.Integer, db.ForeignKey("consoles.id"))
    collection_id = db.Column(
        db.Integer, db.ForeignKey("collections.id"), nullable=False)
    value = db.Column(db.Numeric(10, 2))
    genre = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.String(255))

    consoles = db.relationship('Console', back_populates='games')
    reviews = db.relationship('Review', back_populates='games')

    def to_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'console_id': self.console_id,
            'collection_id': self.collection_id,
            'value': int(self.value),
            'genre': self.genre,
            'release_date': self.release_date
        }
