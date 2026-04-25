from app.routers.auth import router as auth_router
from app.routers.portfolios import router as portfolios_router
from app.routers.chat import router as chat_router

__all__ = ["auth_router", "portfolios_router", "chat_router"]
