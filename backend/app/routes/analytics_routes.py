from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.goal import Goal
from app.models.achievement import GoalAchievement

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/analytics/goal-status")
def goal_status_analytics():

    db = SessionLocal()

    total_goals = db.query(Goal).count()

    approved = db.query(Goal).filter(
        Goal.status == "approved"
    ).count()

    pending = db.query(Goal).filter(
        Goal.status == "pending_approval"
    ).count()

    rework = db.query(Goal).filter(
        Goal.status == "rework"
    ).count()

    return {
        "total_goals": total_goals,
        "approved": approved,
        "pending": pending,
        "rework": rework
    }

@router.get("/analytics/completion")
def completion_dashboard():

    db = SessionLocal()

    total_achievements = db.query(
        GoalAchievement
    ).count()

    completed = db.query(GoalAchievement).filter(
        GoalAchievement.progress_status == "Completed"
    ).count()

    on_track = db.query(GoalAchievement).filter(
        GoalAchievement.progress_status == "On Track"
    ).count()

    not_started = db.query(GoalAchievement).filter(
        GoalAchievement.progress_status == "Not Started"
    ).count()

    return {
        "total": total_achievements,
        "completed": completed,
        "on_track": on_track,
        "not_started": not_started
    }

@router.get("/analytics/quarterly-trends")
def quarterly_trends():

    db = SessionLocal()

    achievements = db.query(
        GoalAchievement
    ).all()

    data = []

    for achievement in achievements:
        data.append({
            "quarter": achievement.quarter,
            "progress_score": achievement.progress_score
        })

    return data