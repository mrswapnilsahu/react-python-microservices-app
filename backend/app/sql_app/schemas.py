from typing import Optional, List
from pydantic import BaseModel

"""
    Schemas for Request body of different requests like create, read, update and delete.
    FastAPI allows us to specify schemas in router functions which acts as data validator.
    No need for a custom validator.
"""
class EntryBase(BaseModel):
    id: Optional[int] = None
    title: str
    type: str
    position: int
    src: str
    
    class Config:
        orm_mode = True


class EntryCreate(EntryBase):
    pass

class Entries(BaseModel):
    __root__: List[EntryBase]

class Response(BaseModel):
    status: str
    code: Optional[str]
    msg: Optional[str]
    data: Optional[dict]