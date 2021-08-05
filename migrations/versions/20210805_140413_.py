"""empty message

Revision ID: 8dd780f05027
Revises: 52041cd5a523
Create Date: 2021-08-05 14:04:13.163684

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8dd780f05027'
down_revision = '52041cd5a523'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('wishlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('consoleName', sa.String(length=255), nullable=False),
    sa.Column('cib_value', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('loose_value', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('genre', sa.String(length=255), nullable=False),
    sa.Column('release_date', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlists')
    # ### end Alembic commands ###
