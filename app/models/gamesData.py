from .db import db


class GameData(db.Model):
    __tablename__ = "games_data"

    id = db.Column(db.Integer, primary_key=True)
    console_name = db.Column(db.String(255), nullable=False)
    product_name = db.Column(db.String(255), nullable=False)
    loose_price = db.Column(db.String(255))
    cib_price = db.Column(db.String(255))
    new_price = db.Column(db.String(255))
    genre = db.Column(db.String(255))
    release_date = db.Column(db.String(255))
    

    def to_dict(self):
        return{
            'id': self.id,
            'console_name': self.console_name,
            'product_name': self.product_name,
            'loose_price': self.loose_price,
            'cib_price': self.cib_price,
            'new_price': self.new_price,
            'genre': self.genre,
            'release_date': self.release_date
        }
