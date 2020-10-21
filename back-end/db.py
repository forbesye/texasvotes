from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os


def init_db(app):
    load_dotenv()
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("AWS_DB_KEY")
    return SQLAlchemy(app)
