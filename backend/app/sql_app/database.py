from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from app.utils.utils import generate_DB_url

"""
creating DB connection
"""
SQLALCHEMY_DB_URL = generate_DB_url()

"""
create the DB engine to be used throughout the app
"""
engine = create_engine(SQLALCHEMY_DB_URL, echo_pool=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

"""
It will act as the base class for DB models
"""
Base = declarative_base()