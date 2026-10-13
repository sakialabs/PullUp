"""add transactional outbox

Revision ID: a4b8c2d9e611
Revises: 63c0988ead68
Create Date: 2026-10-12 00:00:00
"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "a4b8c2d9e611"
down_revision: str | Sequence[str] | None = "63c0988ead68"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "outbox_events",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("topic", sa.String(length=160), nullable=False),
        sa.Column("aggregate_type", sa.String(length=80), nullable=False),
        sa.Column("aggregate_id", sa.String(length=120), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("occurred_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("available_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("attempt_count", sa.Integer(), nullable=False),
        sa.Column("last_error", sa.Text(), nullable=True),
        sa.CheckConstraint(
            "attempt_count >= 0", name="ck_outbox_attempt_count_nonnegative"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_outbox_events_aggregate_id", "outbox_events", ["aggregate_id"])
    op.create_index("ix_outbox_events_available_at", "outbox_events", ["available_at"])
    op.create_index("ix_outbox_events_published_at", "outbox_events", ["published_at"])
    op.create_index("ix_outbox_events_topic", "outbox_events", ["topic"])
    op.create_index(
        "ix_outbox_pending", "outbox_events", ["published_at", "available_at"]
    )


def downgrade() -> None:
    op.drop_index("ix_outbox_pending", table_name="outbox_events")
    op.drop_index("ix_outbox_events_topic", table_name="outbox_events")
    op.drop_index("ix_outbox_events_published_at", table_name="outbox_events")
    op.drop_index("ix_outbox_events_available_at", table_name="outbox_events")
    op.drop_index("ix_outbox_events_aggregate_id", table_name="outbox_events")
    op.drop_table("outbox_events")
