from __future__ import annotations

from datetime import date, datetime
from typing import Any

from sqlalchemy import (
    JSON,
    Boolean,
    CheckConstraint,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Table,
    Text,
    UniqueConstraint,
    text,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class OutboxEvent(Base):
    """A durable event awaiting at-least-once delivery by the worker."""

    __tablename__ = "outbox_events"
    __table_args__ = (
        CheckConstraint("attempt_count >= 0", name="ck_outbox_attempt_count_nonnegative"),
        Index("ix_outbox_pending", "published_at", "available_at"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    topic: Mapped[str] = mapped_column(String(160), index=True)
    aggregate_type: Mapped[str] = mapped_column(String(80))
    aggregate_id: Mapped[str] = mapped_column(String(120), index=True)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON)
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    available_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    published_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True, index=True
    )
    attempt_count: Mapped[int] = mapped_column(Integer, default=0)
    last_error: Mapped[str | None] = mapped_column(Text, nullable=True)


place_source = Table(
    "place_source",
    Base.metadata,
    Column("place_id", ForeignKey("places.id", ondelete="CASCADE"), primary_key=True),
    Column("source_id", ForeignKey("sources.id", ondelete="RESTRICT"), primary_key=True),
)


total_damage_source = Table(
    "total_damage_source",
    Base.metadata,
    Column(
        "total_damage_version_id",
        ForeignKey("total_damage_versions.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column("source_id", ForeignKey("sources.id", ondelete="RESTRICT"), primary_key=True),
)


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    title: Mapped[str] = mapped_column(String(240))
    kind: Mapped[str] = mapped_column(String(80))
    publisher: Mapped[str] = mapped_column(String(240))
    source_date: Mapped[date] = mapped_column(Date)
    checked_at: Mapped[date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(40))
    note: Mapped[str] = mapped_column(Text)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Provider(Base):
    __tablename__ = "providers"

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    display_name: Mapped[str] = mapped_column(String(240))
    legal_form: Mapped[str] = mapped_column(String(240))
    ownership_model: Mapped[str] = mapped_column(Text)
    service_commitment: Mapped[str] = mapped_column(Text)
    identity_status: Mapped[str] = mapped_column(String(80))
    checked_at: Mapped[date] = mapped_column(Date)
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))

    buildings: Mapped[list[Building]] = relationship(
        back_populates="provider", cascade="all, delete-orphan"
    )


class Building(Base):
    __tablename__ = "buildings"

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    provider_id: Mapped[str] = mapped_column(
        ForeignKey("providers.id", ondelete="RESTRICT"), index=True
    )
    name: Mapped[str] = mapped_column(String(240))
    neighbourhood: Mapped[str] = mapped_column(String(160))
    municipality: Mapped[str] = mapped_column(String(160))
    province: Mapped[str] = mapped_column(String(2))
    country_code: Mapped[str] = mapped_column(String(2))
    location_precision: Mapped[str] = mapped_column(String(80))
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))

    provider: Mapped[Provider] = relationship(back_populates="buildings")
    places: Mapped[list[Place]] = relationship(
        back_populates="building", cascade="all, delete-orphan"
    )


class Place(Base):
    __tablename__ = "places"
    __table_args__ = (
        CheckConstraint("bedrooms >= 0", name="ck_places_bedrooms_nonnegative"),
        CheckConstraint("record_version > 0", name="ck_places_record_version_positive"),
    )

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    building_id: Mapped[str] = mapped_column(
        ForeignKey("buildings.id", ondelete="RESTRICT"), index=True
    )
    publication_status: Mapped[str] = mapped_column(String(80), index=True)
    synthetic_data_notice: Mapped[str] = mapped_column(Text)
    is_synthetic: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    published_at: Mapped[date | None] = mapped_column(Date, nullable=True, index=True)
    checked_at: Mapped[date] = mapped_column(Date)
    next_review_at: Mapped[date] = mapped_column(Date)
    record_version: Mapped[int] = mapped_column(Integer, default=1)

    name: Mapped[str] = mapped_column(String(240))
    unit_label: Mapped[str] = mapped_column(String(160))
    place_type: Mapped[str] = mapped_column(String(240))
    household_type: Mapped[str] = mapped_column(String(240))
    bedrooms: Mapped[int] = mapped_column(Integer)
    summary: Mapped[str] = mapped_column(Text)

    image_src: Mapped[str] = mapped_column(String(500))
    image_alt: Mapped[str] = mapped_column(Text)
    image_caption: Mapped[str] = mapped_column(Text)
    image_evidence_status: Mapped[str] = mapped_column(String(80))
    image_source_id: Mapped[str] = mapped_column(
        ForeignKey("sources.id", ondelete="RESTRICT")
    )

    discovery: Mapped[dict[str, Any]] = mapped_column(JSON)
    vibe: Mapped[list[str]] = mapped_column(JSON)
    backstory: Mapped[list[dict[str, Any]]] = mapped_column(JSON)
    around_here: Mapped[list[dict[str, Any]]] = mapped_column(JSON)
    fine_print: Mapped[dict[str, Any]] = mapped_column(JSON)
    corrections: Mapped[dict[str, Any]] = mapped_column(JSON)

    building: Mapped[Building] = relationship(back_populates="places")
    sources: Mapped[list[Source]] = relationship(secondary=place_source)
    availability: Mapped[Availability] = relationship(
        back_populates="place", cascade="all, delete-orphan", uselist=False
    )
    tenure: Mapped[Tenure] = relationship(
        back_populates="place", cascade="all, delete-orphan", uselist=False
    )
    accessibility_facts: Mapped[list[AccessibilityFact]] = relationship(
        back_populates="place",
        cascade="all, delete-orphan",
        order_by="AccessibilityFact.sort_order",
    )
    heads_up: Mapped[list[HeadsUp]] = relationship(
        back_populates="place", cascade="all, delete-orphan", order_by="HeadsUp.sort_order"
    )
    total_damage_versions: Mapped[list[TotalDamageVersion]] = relationship(
        back_populates="place", cascade="all, delete-orphan"
    )


class Availability(Base):
    __tablename__ = "availabilities"
    __table_args__ = (
        CheckConstraint(
            "units_available >= 0", name="ck_availabilities_units_nonnegative"
        ),
    )

    place_id: Mapped[str] = mapped_column(
        ForeignKey("places.id", ondelete="CASCADE"), primary_key=True
    )
    status: Mapped[str] = mapped_column(String(60))
    available_from: Mapped[date | None] = mapped_column(Date, nullable=True)
    units_available: Mapped[int] = mapped_column(Integer)
    checked_at: Mapped[date] = mapped_column(Date)
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))

    place: Mapped[Place] = relationship(back_populates="availability")


class Tenure(Base):
    __tablename__ = "tenures"

    place_id: Mapped[str] = mapped_column(
        ForeignKey("places.id", ondelete="CASCADE"), primary_key=True
    )
    type: Mapped[str] = mapped_column(String(240))
    initial_term: Mapped[str] = mapped_column(Text)
    ongoing_security: Mapped[str] = mapped_column(Text)
    rights_summary: Mapped[str] = mapped_column(Text)
    allocation_summary: Mapped[str] = mapped_column(Text)
    checked_at: Mapped[date] = mapped_column(Date)
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))

    place: Mapped[Place] = relationship(back_populates="tenure")


class AccessibilityFact(Base):
    __tablename__ = "accessibility_facts"

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    place_id: Mapped[str] = mapped_column(
        ForeignKey("places.id", ondelete="CASCADE"), index=True
    )
    category: Mapped[str] = mapped_column(String(80))
    feature: Mapped[str] = mapped_column(String(240))
    status: Mapped[str] = mapped_column(String(80))
    detail: Mapped[str] = mapped_column(Text)
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))
    checked_at: Mapped[date] = mapped_column(Date)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    place: Mapped[Place] = relationship(back_populates="accessibility_facts")


class HeadsUp(Base):
    __tablename__ = "heads_up"

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    place_id: Mapped[str] = mapped_column(
        ForeignKey("places.id", ondelete="CASCADE"), index=True
    )
    title: Mapped[str] = mapped_column(String(240))
    detail: Mapped[str] = mapped_column(Text)
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))
    checked_at: Mapped[date] = mapped_column(Date)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    place: Mapped[Place] = relationship(back_populates="heads_up")


class TotalDamageVersion(Base):
    __tablename__ = "total_damage_versions"
    __table_args__ = (
        UniqueConstraint("place_id", "version", name="uq_total_damage_place_version"),
        Index(
            "uq_total_damage_current_per_place",
            "place_id",
            unique=True,
            postgresql_where=text("is_current"),
            sqlite_where=text("is_current"),
        ),
        CheckConstraint("length(currency) = 3", name="ck_total_damage_currency_length"),
        CheckConstraint(
            "known_monthly_minor >= 0", name="ck_total_damage_known_nonnegative"
        ),
        CheckConstraint(
            "estimated_monthly_min_minor >= 0 AND "
            "estimated_monthly_max_minor >= estimated_monthly_min_minor",
            name="ck_total_damage_estimated_range",
        ),
        CheckConstraint(
            "required_monthly_min_minor >= 0 AND "
            "required_monthly_max_minor >= required_monthly_min_minor",
            name="ck_total_damage_required_range",
        ),
        CheckConstraint(
            "optional_monthly_min_minor >= 0 AND "
            "optional_monthly_max_minor >= optional_monthly_min_minor",
            name="ck_total_damage_optional_range",
        ),
        CheckConstraint(
            "move_in_required_minor >= 0", name="ck_total_damage_move_in_nonnegative"
        ),
        CheckConstraint(
            "move_in_refundable_minor >= 0 AND "
            "move_in_refundable_minor <= move_in_required_minor",
            name="ck_total_damage_refundable_range",
        ),
    )

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    place_id: Mapped[str] = mapped_column(
        ForeignKey("places.id", ondelete="CASCADE"), index=True
    )
    version: Mapped[str] = mapped_column(String(80))
    currency: Mapped[str] = mapped_column(String(3))
    period: Mapped[str] = mapped_column(String(30))
    effective_from: Mapped[date] = mapped_column(Date)
    reviewed_at: Mapped[date] = mapped_column(Date)
    next_review_at: Mapped[date] = mapped_column(Date)
    is_current: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    known_monthly_minor: Mapped[int] = mapped_column(Integer)
    estimated_monthly_min_minor: Mapped[int] = mapped_column(Integer)
    estimated_monthly_max_minor: Mapped[int] = mapped_column(Integer)
    required_monthly_min_minor: Mapped[int] = mapped_column(Integer)
    required_monthly_max_minor: Mapped[int] = mapped_column(Integer)
    optional_monthly_min_minor: Mapped[int] = mapped_column(Integer)
    optional_monthly_max_minor: Mapped[int] = mapped_column(Integer)
    move_in_required_minor: Mapped[int] = mapped_column(Integer)
    move_in_refundable_minor: Mapped[int] = mapped_column(Integer)
    note: Mapped[str] = mapped_column(Text)

    place: Mapped[Place] = relationship(back_populates="total_damage_versions")
    sources: Mapped[list[Source]] = relationship(secondary=total_damage_source)
    items: Mapped[list[TotalDamageLineItem]] = relationship(
        back_populates="total_damage_version",
        cascade="all, delete-orphan",
        order_by="TotalDamageLineItem.sort_order",
    )


class TotalDamageLineItem(Base):
    __tablename__ = "total_damage_line_items"
    __table_args__ = (
        CheckConstraint("amount_min_minor >= 0", name="ck_line_item_min_nonnegative"),
        CheckConstraint(
            "amount_max_minor >= amount_min_minor", name="ck_line_item_amount_range"
        ),
    )

    id: Mapped[str] = mapped_column(String(120), primary_key=True)
    total_damage_version_id: Mapped[str] = mapped_column(
        ForeignKey("total_damage_versions.id", ondelete="CASCADE"), index=True
    )
    label: Mapped[str] = mapped_column(String(240))
    category: Mapped[str] = mapped_column(String(80))
    amount_min_minor: Mapped[int] = mapped_column(Integer)
    amount_max_minor: Mapped[int] = mapped_column(Integer)
    frequency: Mapped[str] = mapped_column(String(40))
    certainty: Mapped[str] = mapped_column(String(40))
    optional: Mapped[bool] = mapped_column(Boolean)
    refundable: Mapped[bool] = mapped_column(Boolean)
    recipient: Mapped[str] = mapped_column(String(240))
    purpose: Mapped[str] = mapped_column(Text)
    change_rule: Mapped[str] = mapped_column(Text)
    source_id: Mapped[str] = mapped_column(ForeignKey("sources.id", ondelete="RESTRICT"))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    total_damage_version: Mapped[TotalDamageVersion] = relationship(back_populates="items")
