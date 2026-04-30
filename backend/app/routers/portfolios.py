from datetime import datetime
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.user import User
from app.models.portfolio import Portfolio
from app.schemas.portfolio import (
    PortfolioCreate,
    PortfolioUpdate,
    PortfolioResponse,
    PortfolioPublish,
    PublicPortfolioResponse,
)
from app.dependencies import get_current_user

router = APIRouter(prefix="/portfolios", tags=["portfolios"])


@router.get("", response_model=list[PortfolioResponse])
async def list_portfolios(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio)
        .where(Portfolio.user_id == current_user.id)
        .order_by(Portfolio.updated_at.desc())
    )
    portfolios = result.scalars().all()
    return portfolios


@router.post("", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
async def create_portfolio(
    portfolio_data: PortfolioCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Check if slug already exists for this user
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.user_id == current_user.id,
            Portfolio.slug == portfolio_data.slug,
        )
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a portfolio with this slug",
        )

    # Get puck_json from source portfolio if cloning
    puck_json = None
    if portfolio_data.clone_from:
        result = await db.execute(
            select(Portfolio).where(
                Portfolio.id == portfolio_data.clone_from,
                Portfolio.user_id == current_user.id,
            )
        )
        source_portfolio = result.scalar_one_or_none()
        if source_portfolio:
            puck_json = source_portfolio.puck_json

    portfolio = Portfolio(
        user_id=current_user.id,
        name=portfolio_data.name,
        slug=portfolio_data.slug,
    )
    if puck_json:
        portfolio.puck_json = puck_json

    db.add(portfolio)
    await db.commit()
    await db.refresh(portfolio)
    return portfolio


@router.get("/{portfolio_id}", response_model=PortfolioResponse)
async def get_portfolio(
    portfolio_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found",
        )

    return portfolio


@router.put("/{portfolio_id}", response_model=PortfolioResponse)
async def update_portfolio(
    portfolio_id: UUID,
    portfolio_data: PortfolioUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found",
        )

    if portfolio_data.name is not None:
        portfolio.name = portfolio_data.name
    if portfolio_data.puck_json is not None:
        portfolio.puck_json = portfolio_data.puck_json

    portfolio.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(portfolio)
    return portfolio


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_portfolio(
    portfolio_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found",
        )

    await db.delete(portfolio)
    await db.commit()


@router.post("/{portfolio_id}/publish", response_model=PortfolioResponse)
async def publish_portfolio(
    portfolio_id: UUID,
    publish_data: PortfolioPublish,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found",
        )

    # Check if new slug conflicts with another portfolio
    if publish_data.slug != portfolio.slug:
        result = await db.execute(
            select(Portfolio).where(
                Portfolio.user_id == current_user.id,
                Portfolio.slug == publish_data.slug,
                Portfolio.id != portfolio_id,
            )
        )
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You already have a portfolio with this slug",
            )
        portfolio.slug = publish_data.slug

    portfolio.is_published = True
    portfolio.published_at = datetime.utcnow()
    portfolio.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(portfolio)
    return portfolio


@router.post("/{portfolio_id}/unpublish", response_model=PortfolioResponse)
async def unpublish_portfolio(
    portfolio_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio).where(
            Portfolio.id == portfolio_id,
            Portfolio.user_id == current_user.id,
        )
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found",
        )

    portfolio.is_published = False
    portfolio.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(portfolio)
    return portfolio


# Public endpoint (no auth required)
@router.get(
    "/public/{username}/{slug}",
    response_model=PublicPortfolioResponse,
    tags=["public"],
)
async def get_public_portfolio(
    username: str,
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Portfolio)
        .join(User)
        .where(
            User.username == username,
            Portfolio.slug == slug,
            Portfolio.is_published == True,
        )
        .options(selectinload(Portfolio.user))
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio not found or not published",
        )

    return PublicPortfolioResponse(
        name=portfolio.name,
        slug=portfolio.slug,
        puck_json=portfolio.puck_json,
        published_at=portfolio.published_at,
        username=portfolio.user.username,
    )
