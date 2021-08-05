from .db import db


class Console(db.Model):
    __tablename__ = "consoles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    value = db.Column(db.Numeric(10, 2))
    console_img_url = db.Column(db.String, nullable=False)
    collection_id = db.Column(
        db.Integer, db.ForeignKey("collections.id"), nullable=False)

    collections = db.relationship('Collection', back_populates='consoles')
    games = db.relationship('Game', back_populates='consoles')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'value': float(self.value),
            'collection_id': self.collection_id,
            'console_img_url': self.console_img_url
        }
