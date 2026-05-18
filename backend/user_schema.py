from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
    department: str

class UserLogin(BaseModel):
    email: str
    password: str