from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.goal import Goal

from app.models.checkin_comment import CheckinComment

from app.models.user import User

router = APIRouter(
    prefix="/manager",
    tags=["Manager"]
)


@router.get("/team-goals/{manager_id}")
def get_team_goals(
    manager_id: int,
    db: Session = Depends(get_db)
):

    employees = db.query(User).filter(
        User.manager_id == manager_id
    ).all()

    employee_ids = [
        emp.id for emp in employees
    ]

    goals = db.query(Goal).filter(
        Goal.employee_id.in_(employee_ids)
    ).all()

    return goals


@router.put("/inline-edit/{goal_id}")
def inline_edit_goal(
    goal_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    goal = db.query(Goal).filter(
        Goal.id == goal_id
    ).first()

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    # SHARED GOAL RULES

    if goal.shared:

        goal.weightage = data["weightage"]

    else:

        goal.target_value = data["target_value"]

        goal.weightage = data["weightage"]

    db.commit()

    return {
        "message": "Goal updated"
    }