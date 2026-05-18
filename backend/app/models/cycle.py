from sqlalchemy import (
    Column,
    Integer,
    String
)

from app.database import Base


class Cycle(Base):

    __tablename__ = "cycles"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    phase = Column(String)

    open_month = Column(Integer)