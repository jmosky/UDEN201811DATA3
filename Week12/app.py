# Dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
import datetime
import scrape_mars

app = Flask(__name__)

#Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars"
mongo = PyMongo(app)

@app.route("/scrape")
def scrape():
    # Drops collection if available.
    mars.collection.remove()
    # https://stackoverflow.com/questions/45553629/how-to-run-a-python-script-on-flask-backend
    scrape_mars.scrape()

# # create route that renders index.html template
# @app.route("/")
# def index():

#     return render_template("index.html", dogs=dogs)


if __name__ == "__main__":
    app.run(debug=True)
