from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.sql_app import crud, models
from app.sql_app.database import engine
from app.routers.board import router
import uvicorn

app = FastAPI(title="React Sortable Gallery App")

origins = [
    'http://localhost',
    'localhost'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router, prefix="/api", tags=["API Endpoints"])

# start up event to create tables if they doesn't exist
@app.on_event("startup")
def init_db():    
    models.Base.metadata.create_all(bind=engine)

@app.get('/')
async def root():
    return {"message": "Hello Users"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)