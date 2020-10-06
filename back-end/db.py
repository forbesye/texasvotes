from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

def init_db(database, app):
    load_dotenv()
    if database == 'PRODUCTION':
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('AWS_PROD_DB')
    elif database == 'DEVELOPMENT':
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('AWS_DEV_DB')
    else:
        return Exception("Invalid database!")
    
    return SQLAlchemy(app)
