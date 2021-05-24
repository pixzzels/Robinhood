"""empty message

Revision ID: 402c2f7812ca
Revises: afe4c10dacde
Create Date: 2021-05-24 13:05:55.266483

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '402c2f7812ca'
down_revision = 'afe4c10dacde'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Watchlists')
    # ### end Alembic commands ###
