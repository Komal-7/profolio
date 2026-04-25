from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field
from typing import Literal


class ChatMessageCreate(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1)


class ChatMessageResponse(BaseModel):
    id: UUID
    portfolio_id: UUID
    role: str
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True
