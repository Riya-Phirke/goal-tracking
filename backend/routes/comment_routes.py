from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.checkin_comment import CheckinComment
from app.schemas.comment_schema import CommentCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/manager/comments")
def add_comment(
    comment: CommentCreate,
    db: Session = Depends(get_db)
):

    new_comment = CheckinComment(
        goal_id=comment.goal_id,
        manager_id=comment.manager_id,
        quarter=comment.quarter,
        comment=comment.comment
    )

    db.add(new_comment)
    db.commit()

    return {
        "message": "Comment added successfully"
    }