"""Add published_puck_json column to portfolios

Revision ID: 002
Revises: 001
Create Date: 2024-01-02 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '002'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add published_puck_json column
    op.add_column(
        'portfolios',
        sa.Column('published_puck_json', postgresql.JSONB(), nullable=True)
    )

    # Copy puck_json to published_puck_json for already published portfolios
    op.execute("""
        UPDATE portfolios
        SET published_puck_json = puck_json
        WHERE is_published = true
    """)


def downgrade() -> None:
    op.drop_column('portfolios', 'published_puck_json')
