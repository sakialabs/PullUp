from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from pullup_api.dependencies import get_session
from pullup_api.schemas import HealthResponse

router = APIRouter(tags=["health"])
SessionDependency = Annotated[Session, Depends(get_session)]


@router.get("/health", response_model=HealthResponse, response_model_by_alias=True)
def health(request: Request, session: SessionDependency) -> HealthResponse:
    try:
        session.execute(text("SELECT 1"))
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "code": "database_unavailable",
                "message": "The API cannot reach its system of record.",
            },
        ) from exc
    return HealthResponse(service=request.app.state.settings.service_name)
