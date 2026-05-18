from sqlalchemy import (
    Column,
    Integer,
    String
)

from app.database import Base


class CheckinComment(Base):

    __tablename__ = "checkin_comments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    goal_id = Column(Integer)

    manager_id = Column(Integer)

    comment = Column(String)