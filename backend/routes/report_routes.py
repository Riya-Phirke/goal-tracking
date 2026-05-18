from fastapi import APIRouter
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.goal import Goal

import pandas as pd

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/reports/export-csv")
def export_csv():

    db = SessionLocal()

    goals = db.query(Goal).all()

    data = []

    for goal in goals:
        data.append({
            "Goal ID": goal.id,
            "Employee ID": goal.employee_id,
            "Title": goal.title,
            "Target": goal.target_value,
            "Weightage": goal.weightage,
            "Status": goal.status
        })

    df = pd.DataFrame(data)

    file_path = "goals_report.csv"

    df.to_csv(file_path, index=False)

    return FileResponse(
        path=file_path,
        filename="goals_report.csv",
        media_type="text/csv"
    )

@router.get("/reports/export-excel")
def export_excel():

    db = SessionLocal()

    goals = db.query(Goal).all()

    data = []

    for goal in goals:
        data.append({
            "Goal ID": goal.id,
            "Employee ID": goal.employee_id,
            "Title": goal.title,
            "Target": goal.target_value,
            "Weightage": goal.weightage,
            "Status": goal.status
        })

    df = pd.DataFrame(data)

    file_path = "goals_report.xlsx"

    df.to_excel(file_path, index=False)

    return FileResponse(
        path=file_path,
        filename="goals_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )