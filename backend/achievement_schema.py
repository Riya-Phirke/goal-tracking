from pydantic import BaseModel

class AchievementCreate(BaseModel):
    goal_id: int
    quarter: str
    planned_value: float
    actual_value: float
    progress_status: str