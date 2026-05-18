from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User

from app.models.goal import Goal

from app.models.achievement import GoalAchievement

router = APIRouter(
    prefix="/completion",
    tags=["Completion Dashboard"]
)


@router.get("/quarter/{quarter}")
def quarter_completion(
    quarter: str,
    db: Session = Depends(get_db)
):

    employees = db.query(User).filter(
        User.role == "employee"
    ).all()

    result = []

    for employee in employees:

        goals = db.query(Goal).filter(
            Goal.employee_id == employee.id
        ).all()

        total_goals = len(goals)

        completed = 0

        for goal in goals:

            achievement = db.query(
                GoalAchievement
            ).filter(
                GoalAchievement.goal_id == goal.id,
                GoalAchievement.quarter == quarter
            ).first()

            if achievement:

                completed += 1

        percentage = 0

        if total_goals > 0:

            percentage = (
                completed / total_goals
            ) * 100

        result.append({

            "employee": employee.name,

            "total_goals": total_goals,

            "completed_checkins": completed,

            "completion_percentage": percentage
        })

    return result