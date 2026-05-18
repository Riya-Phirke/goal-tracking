from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey,
    DateTime,
    String
)

from datetime import datetime

from app.database import Base


class GoalAchievement(Base):

    __tablename__ = "goal_achievements"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    goal_id = Column(
        Integer,
        ForeignKey("goals.id")
    )

    achieved_value = Column(Float)

    quarter = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )