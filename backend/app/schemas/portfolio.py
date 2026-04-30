from datetime import datetime
from typing import Any, Dict, Optional
from uuid import UUID
from pydantic import BaseModel, Field


class PortfolioCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=100, pattern=r"^[a-z0-9-]+$")
    clone_from: Optional[UUID] = None


class PortfolioUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    puck_json: Optional[Dict[str, Any]] = None


class PortfolioPublish(BaseModel):
    slug: str = Field(..., min_length=1, max_length=100, pattern=r"^[a-z0-9-]+$")


class PortfolioResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    slug: str
    puck_json: Dict[str, Any]
    is_published: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PublicPortfolioResponse(BaseModel):
    name: str
    slug: str
    puck_json: Dict[str, Any]
    published_at: Optional[datetime]
    username: str

    class Config:
        from_attributes = True
