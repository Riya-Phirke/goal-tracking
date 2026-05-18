from pydantic import BaseModel

class CommentCreate(BaseModel):
    goal_id: int
    manager_id: int
    quarter: str
    comment: str