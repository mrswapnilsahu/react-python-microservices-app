from fastapi import APIRouter, HTTPException, status
from fastapi import Depends
from sqlalchemy.orm import Session
from app.sql_app.database import SessionLocal
from app.sql_app.schemas import Entries, EntryCreate, Response
from app.sql_app import crud


router = APIRouter()

# Dependency to get db Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create", response_model=Response)
def create_entry(entry: EntryCreate, db: Session = Depends(get_db)):
    """
    Create new entry
    """
    crud.create_entry(db, entry.__dict__)
    return Response(status='Success', code=status.HTTP_200_OK, msg='Entry Created')


@router.get("/entries", response_model=Entries)
def read_entries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Read all entries
    """
    all_entries = crud.read_entries(db, skip, limit)
    return all_entries


@router.put("/update")
def update_entry(entries: Entries, db: Session = Depends(get_db)):
    """
    Update entry
    """
    updated_entry = crud.update_entry(db, entries)
    return Response(status="Success", code=status.HTTP_200_OK, message="Entries Updated successfully", result=updated_entry)


@router.delete("/delete/{id}", response_model=Response)
def delete_entry(id: int,  db: Session = Depends(get_db)):
    """
    Delete an entry by id
    """
    entry = crud.read_entry_by_id(db, id)
    if entry is None:
       raise HTTPException(status_code=404, detail=f'Sorry! entry not found')
    res = crud.delete_entry(db, id)
    return res

