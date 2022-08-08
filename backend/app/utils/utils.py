import os
from app.config import config
"""
    This file contains utility functions
"""
def generate_DB_url():
    """This function will generate the DB url"""
    db_user = config.settings.db_user
    password = config.settings.password
    host = config.settings.host
    port = config.settings.port
    db = config.settings.db

    url = f"postgresql://{db_user}:{password}@{host}:{port}/{db}"
    
    return url

