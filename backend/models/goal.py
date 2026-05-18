from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Date
)

from app.database import Base


class Goal(Base):

    __tablename__ = "goals"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(Integer)

    thrust_area = Column(String)

    title = Column(String)

    description = Column(String)

    uom_type = Column(String)

    target_value = Column(Float)

    current_value = Column(
        Float,
        default=0
    )

    weightage = Column(Float)

    status = Column(
        String,
        default="draft"
    )

    progress_status = Column(
        String,
        default="Not Started"
    )

    is_locked = Column(
        Boolean,
        default=False
    )

    shared = Column(
        Boolean,
        default=False
    )

    shared_goal_group = Column(String)

    deadline_date = Column(Date)

    completion_date = Column(Date)