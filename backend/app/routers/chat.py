from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User
from app.models.portfolio import Portfolio
from app.models.chat_message import ChatMessage
from app.schemas.chat import ChatMessageCreate, ChatMessageResponse
from app.dependencies import get_current_user

router = APIRouter(prefix="/chat", tags=["chat"])


async def verify_portfolio_access(
    portfolio_id: UUID,
    user: User,
    db: AsyncSession,
) -> Portfolio:
    """Verify user has access to the portfolio."""
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == user.id,
        )
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found",
        )

    return portfolio


@router.post(
    "/{portfolio_id}",
    response_model=ChatMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
async def save_chat_message(
    portfolio_id: UUID,
    message_data: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await verify_portfolio_access(portfolio_id, current_user, db)

    message = ChatMessage(
        portfolio_id=portfolio_id,
        role=message_data.role,
        content=message_data.content,
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message


@router.get("/{portfolio_id}", response_model=list[ChatMessageResponse])
async def get_chat_history(
    portfolio_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await verify_portfolio_access(portfolio_id, current_user, db)

    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.portfolio_id == portfolio_id)
        .order_by(ChatMessage.timestamp.asc())
    )
    messages = result.scalars().all()
    return messages
