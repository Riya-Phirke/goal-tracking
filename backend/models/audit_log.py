from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime

from app.database import Base


class AuditLog(Base):

    __tablename__ = "audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    goal_id = Column(Integer)

    action = Column(String)

    field_name = Column(String)

    old_value = Column(String)

    new_value = Column(String)

    changed_by = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )