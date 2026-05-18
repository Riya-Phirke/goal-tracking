from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from datetime import datetime

from app.database import get_db

from app.models.goal import Goal

from app.models.achievement import GoalAchievement

from app.models.audit_log import AuditLog

from app.models.cycle import Cycle

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)


def validate_cycle(
    phase: str,
    db: Session
):

    current_month = datetime.now().month

    cycle = db.query(Cycle).filter(
        Cycle.phase == phase
    ).first()

    if not cycle:

        raise HTTPException(
            status_code=404,
            detail="Cycle not configured"
        )

    if current_month != cycle.open_month:

        raise HTTPException(
            status_code=400,
            detail=f"{phase} cycle is closed"
        )


@router.post("/create")
def create_goal(
    goal: dict,
    db: Session = Depends(get_db)
):

    validate_cycle(
        "Goal Setting",
        db
    )

    if float(goal["weightage"]) < 10:

        raise HTTPException(
            status_code=400,
            detail="Minimum weightage per goal is 10%"
        )

    employee_goals = db.query(Goal).filter(
        Goal.employee_id == goal["employee_id"]
    ).count()

    if employee_goals >= 8:

        raise HTTPException(
            status_code=400,
            detail="Maximum 8 goals allowed"
        )

    existing_goals = db.query(Goal).filter(
        Goal.employee_id == goal["employee_id"]
    ).all()

    total_weightage = sum(
        g.weightage for g in existing_goals
    )

    total_weightage += float(goal["weightage"])

    if total_weightage > 100:

        raise HTTPException(
            status_code=400,
            detail="Total weightage cannot exceed 100%"
        )

    new_goal = Goal(

        employee_id=goal["employee_id"],

        thrust_area=goal["thrust_area"],

        title=goal["title"],

        description=goal["description"],

        uom_type=goal["uom_type"],

        target_value=goal["target_value"],

        current_value=0,

        weightage=goal["weightage"],

        shared=goal.get("shared", False),

        shared_goal_group=goal.get(
            "shared_goal_group"
        ),

        deadline_date=goal.get(
            "deadline_date"
        )
    )

    db.add(new_goal)

    db.commit()

    db.refresh(new_goal)

    return new_goal


@router.put("/update-progress/{goal_id}")
def update_progress(
    goal_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    validate_cycle(
        data["quarter"],
        db
    )

    goal = db.query(Goal).filter(
        Goal.id == goal_id
    ).first()

    if not goal:

        raise HTTPException(
            status_code=404,
            detail="Goal not found"
        )

    old_value = goal.current_value

    goal.current_value = data["current_value"]

    goal.completion_date = datetime.now()

    achievement = GoalAchievement(
        goal_id=goal.id,
        achieved_value=data["current_value"],
        quarter=data["quarter"]
    )

    db.add(achievement)

    # UOM FORMULAS

    if goal.uom_type == "Min":

        progress = (
            goal.current_value /
            goal.target_value
        ) * 100

    elif goal.uom_type == "Max":

        progress = (
            goal.target_value /
            goal.current_value
        ) * 100

    elif goal.uom_type == "Zero":

        if goal.current_value == 0:
            progress = 100
        else:
            progress = 0

    elif goal.uom_type == "Timeline":

        if (
            goal.completion_date <=
            goal.deadline_date
        ):
            progress = 100
        else:
            progress = 50

    else:

        progress = (
            goal.current_value /
            goal.target_value
        ) * 100

    if progress == 0:

        goal.progress_status = "Not Started"

    elif progress < 100:

        goal.progress_status = "On Track"

    else:

        goal.progress_status = "Completed"

    if goal.shared:

        linked_goals = db.query(Goal).filter(
            Goal.shared_goal_group ==
            goal.shared_goal_group
        ).all()

        for linked_goal in linked_goals:

            linked_goal.current_value = (
                goal.current_value
            )

    log = AuditLog(
        goal_id=goal.id,
        action="Progress Updated",
        field_name="current_value",
        old_value=str(old_value),
        new_value=str(goal.current_value),
        changed_by=data["changed_by"]
    )

    db.add(log)

    db.commit()

    return {
        "message": "Progress updated"
    }