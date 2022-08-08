from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import event, DDL

from app.sql_app.models import BoardModel
from app.sql_app.schemas import Entries, EntryCreate, Response

"""
    This file contains all the functions to handle operations like
    create, read, update and delete data from DB.
"""


def read_entries(db: Session, skip: int = 0, limit: int = 100) -> List[Entries]:
    res = db.query(BoardModel).order_by(BoardModel.position.asc()).offset(skip).limit(limit).all()
    return res


def read_entry_by_id(db: Session, entry_id: int) -> EntryCreate:
    res = db.query(BoardModel).filter(BoardModel.id == entry_id).first()
    return res

def create_entry(db: Session, entry: EntryCreate) -> EntryCreate:
    new_entry = BoardModel(**entry)
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry


def delete_entry(db: Session, entry_id: int) -> Response:
    existing_entry = read_entry_by_id(db=db, entry_id=entry_id)
    db.delete(existing_entry)
    db.commit()
    return Response(status='success', code="200", msg='Successfully Deleted')


def update_entry(db: Session, entries: Entries) -> Entries:
    # Need a better solution for this
    for entry in entries.__root__:
        existing_entry = read_entry_by_id(db=db, entry_id=entry.id)
        if existing_entry.position != entry.position:
            existing_entry.position = entry.position

    db.commit()
    return entries

"""
    This event will listen for the table create event and whenever the table gets
    created it will insert the data into the table 
"""
event.listen(BoardModel.__table__, 
            'after_create',
            DDL(""" INSERT INTO board (title, type, position, src) VALUES 
                ('Young & broke', 'young-&-broke', 0, 'https://media.giphy.com/media/LLsUNd14gwSkSLYTcR/giphy.gif'), 
                ('Tokyo nights', 'tokyo-nights', 1, 'https://media.giphy.com/media/uBTWyINWTrWz6/giphy.gif'), 
                ('Crusing through time', 'crusing-through-time', 2, 'https://media.giphy.com/media/9zExs2Q2h1EHfE4P6G/giphy.gif'),
                ('Sanji x moist cigarette', 'sanji-x-moist-cigarette', 3, 'https://media.giphy.com/media/SSFfVBJ9EbF9DIZHEj/giphy.gif'),
                ('Happy bulldog', 'happy-bulldog', 4, 'https://media.giphy.com/media/l46CpEQZ8G9M7OP0k/giphy.gif')  
            """))