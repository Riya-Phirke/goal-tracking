from pydantic import BaseModel

class GoalCreate(BaseModel):
    employee_id: int
    thrust_area: str
    title: str
    description: str
    uom_type: str
    target_value: float
    weightage: float