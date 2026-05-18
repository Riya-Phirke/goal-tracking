from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.cycle import Cycle

router = APIRouter(
    prefix="/cycles",
    tags=["Cycles"]
)


@router.get("")
def get_cycles(
    db: Session = Depends(get_db)
):

    return db.query(Cycle).all()


@router.post("/create")
def create_cycle(
    data: dict,
    db: Session = Depends(get_db)
):

    existing = db.query(Cycle).filter(
        Cycle.phase == data["phase"]
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Cycle already exists"
        )

    cycle = Cycle(
        phase=data["phase"],
        open_month=data["open_month"]
    )

    db.add(cycle)

    db.commit()

    return {
        "message": "Cycle created"
    }


@router.put("/update/{cycle_id}")
def update_cycle(
    cycle_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    cycle = db.query(Cycle).filter(
        Cycle.id == cycle_id
    ).first()

    if not cycle:

        raise HTTPException(
            status_code=404,
            detail="Cycle not found"
        )

    cycle.open_month = data["open_month"]

    db.commit()

    return {
        "message": "Cycle updated"
    }