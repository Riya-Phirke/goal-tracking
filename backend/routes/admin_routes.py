from fastapi import APIRouter

from sqlalchemy.orm import Session

from fastapi import Depends

from fastapi.responses import FileResponse

import pandas as pd

from app.database import get_db

from app.models.goal import Goal

from app.models.user import User

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/analytics")
def get_analytics(
    db: Session = Depends(get_db)
):

    total_users = db.query(User).count()

    total_goals = db.query(Goal).count()

    approved_goals = db.query(Goal).filter(
        Goal.status == "approved"
    ).count()

    completed_goals = db.query(Goal).filter(
        Goal.progress_status == "Completed"
    ).count()

    return {
        "total_users": total_users,
        "total_goals": total_goals,
        "approved_goals": approved_goals,
        "completed_goals": completed_goals
    }


@router.get("/export-goals")
def export_goals(
    db: Session = Depends(get_db)
):

    goals = db.query(Goal).all()

    data = []

    for goal in goals:

        data.append({
            "Employee ID": goal.employee_id,
            "Goal": goal.title,
            "Target": goal.target_value,
            "Achievement": goal.current_value,
            "Status": goal.progress_status
        })

    df = pd.DataFrame(data)

    file_path = "goals_report.xlsx"

    df.to_excel(file_path, index=False)

    return FileResponse(
        path=file_path,
        filename="goals_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )