from flask import Flask
from db import init_db
app = Flask(__name__)
application = app # This is for AWS Elastic Beanstalk, pls don't remove!!!
db = init_db("DEVELOPMENT", app)

class About(db.Model):
    __tablename__ = "about"
    id = db.Column('id', db.Integer, primary_key=True)
    first_name = db.Column('first_name', db.Unicode)
    last_name = db.Column('last_name', db.Unicode)

    def __repr__(self):
        return '<User %r>' % self.first_name

@app.route('/')
def hello_world():
    return 'Hello World 2.0!'

if __name__ == '__main__':
    # db.Query.all()
    app.run(host='0.0.0.0', port=5000, debug=True)
