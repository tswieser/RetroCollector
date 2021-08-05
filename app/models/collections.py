from .db import db


class Collection(db.Model):
    __tablename__ = "collections"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    collection_img_url = db.Column(db.String, nullable=False)

    users = db.relationship('User', back_populates='collections')
    consoles = db.relationship('Console', back_populates='collections')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'collection_img_url': self.collection_img_url
        }
