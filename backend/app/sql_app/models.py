from sqlalchemy import  event, Column, Integer, String
from app.sql_app.database import Base

"""
    This class will map to the DB and SQLalchemy will 
    create the table in the DB acco. to this model only
"""
class BoardModel(Base):
    __tablename__ ="board"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String)
    type = Column(String)
    position = Column(Integer)
    src = Column(String)
