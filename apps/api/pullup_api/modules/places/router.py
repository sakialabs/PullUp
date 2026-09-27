from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, Response, status
from sqlalchemy.orm import Session

from pullup_api.dependencies import get_session
from pullup_api.modules.places.repository import (
    etag_for_contract,
    get_published_place,
    list_published_places,
    serialize_collection,
    serialize_place,
)
from pullup_api.schemas import PublicPlaceContract, PublicPlacesEnvelope

router = APIRouter(prefix="/v1/places", tags=["places"])
SessionDependency = Annotated[Session, Depends(get_session)]


@router.get(
    "",
    response_model=PublicPlacesEnvelope,
    response_model_by_alias=True,
    summary="List published Places",
)
def list_places(
    session: SessionDependency,
    response: Response,
    if_none_match: Annotated[str | None, Header()] = None,
) -> PublicPlacesEnvelope | Response:
    contract = serialize_collection(list_published_places(session))
    etag = etag_for_contract(contract)
    if if_none_match == etag:
        return Response(status_code=status.HTTP_304_NOT_MODIFIED, headers={"ETag": etag})
    response.headers["ETag"] = etag
    response.headers["Cache-Control"] = "public, max-age=60, must-revalidate"
    return contract


@router.get(
    "/{slug}",
    response_model=PublicPlaceContract,
    response_model_by_alias=True,
    summary="Get one published Place",
)
def get_place(
    slug: str,
    session: SessionDependency,
    response: Response,
    if_none_match: Annotated[str | None, Header()] = None,
) -> PublicPlaceContract | Response:
    place = get_published_place(session, slug)
    if place is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "code": "place_not_found",
                "message": "That published Place was not found.",
            },
        )
    contract = serialize_place(place)
    etag = etag_for_contract(contract)
    if if_none_match == etag:
        return Response(status_code=status.HTTP_304_NOT_MODIFIED, headers={"ETag": etag})
    response.headers["ETag"] = etag
    response.headers["Cache-Control"] = "public, max-age=60, must-revalidate"
    return contract
