from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.goal import Goal
from app.models.achievement import GoalAchievement
from app.schemas.achievement_schema import AchievementCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/achievements")
def create_achievement(
    achievement: AchievementCreate,
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.id == achievement.goal_id
    ).first()

    if not goal:
        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    # Progress Score Logic
    if goal.target_value == 0:
        progress_score = 0
    else:
        progress_score = (
            achievement.actual_value / goal.target_value
        ) * 100

    new_achievement = GoalAchievement(
        goal_id=achievement.goal_id,
        quarter=achievement.quarter,
        planned_value=achievement.planned_value,
        actual_value=achievement.actual_value,
        progress_status=achievement.progress_status,
        progress_score=progress_score
    )

    db.add(new_achievement)
    db.commit()
    db.refresh(new_achievement)

    return {
        "message": "Achievement updated successfully",
        "progress_score": progress_score
    }