from fastapi import FastAPI
from app.database import engine, Base

from app.models.user import User
from app.models.goal import Goal

from app.models.achievement import GoalAchievement
from app.routes.achievement_routes import router as achievement_router

from app.routes.goal_routes import router as goal_router

from app.models.checkin_comment import CheckinComment
from app.routes.comment_routes import router as comment_router

from app.auth.dependencies import get_current_user
from app.models.user import User
from fastapi import Depends

from app.routes.auth_routes import router as auth_router

from app.models.audit_log import AuditLog
from app.routes.admin_routes import router as admin_router

from app.routes.report_routes import router as report_router
from app.routes.analytics_routes import router as analytics_router

from fastapi.middleware.cors import CORSMiddleware

from app.routes.ai_routes import router as ai_router

from app.routes.cycle_routes import (
    router as cycle_router
)

from app.routes.admin_completion_routes import (
    router as completion_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(goal_router)

app.include_router(achievement_router)

app.include_router(comment_router)

app.include_router(admin_router)

app.include_router(report_router)

app.include_router(analytics_router)

app.include_router(ai_router)

app.include_router(cycle_router)

app.include_router(completion_router)


@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.get("/profile")
def profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }

