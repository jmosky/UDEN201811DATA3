
#################################################
# Import Dependencies
#################################################
#import numpy as np
#import pandas as pd
#from datetime import datetime, timedelta
#import datetime as dt

import json
import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import (
    create_engine, 
    func, 
    inspect, 
    text)

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for)

import get_tweets
#################################################
# Database Setup
#################################################

# The database URI

SQLALCHEMY_DATABASE_URI = "sqlite:///resources/osmp.db"

engine = create_engine(SQLALCHEMY_DATABASE_URI)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to the tables.
trails_data = Base.classes.trails
conservation_areas_data = Base.classes.visitor_master_plan
prairie_dog_colonies_data = Base.classes.prairie_dog_colonies
osmp_lands_data = Base.classes.osmp_lands

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Set Up Routes
#################################################

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/maps/land_ownership")
def maps_land_ownership():
    return render_template("land_ownership.html")

@app.route("/maps/conservation_areas")
def maps_conservation_areas():
    return render_template("conservation_areas.html")

@app.route("/maps/trails")
def maps_trails():
    return render_template("trails.html")

@app.route("/maps/prairie_dogs")
def maps_prairie_dogs():
    return render_template("prairie_dogs.html")

@app.route("/plots")
def plots():
    tweets = get_tweets.find_tweets(12)
    return render_template("plots.html", 
        tweet1=tweets[0]['text'], 
        tweet2=tweets[1]['text'], 
        tweet3=tweets[2]['text'], 
        tweet4=tweets[3]['text'],
        tweet5=tweets[4]['text'], 
        tweet6=tweets[5]['text'], 
        tweet7=tweets[6]['text'],
        tweet8=tweets[7]['text'],
        tweet9=tweets[8]['text'], 
        tweet10=tweets[9]['text'], 
        tweet11=tweets[10]['text'], 
        tweet12=tweets[11]['text'],
        
        url_tweet1=tweets[0]['url'], 
        url_tweet2=tweets[1]['url'], 
        url_tweet3=tweets[2]['url'], 
        url_tweet4=tweets[3]['url'],
        url_tweet5=tweets[4]['url'], 
        url_tweet6=tweets[5]['url'], 
        url_tweet7=tweets[6]['url'],
        url_tweet8=tweets[7]['url'],
        url_tweet9=tweets[8]['url'], 
        url_tweet10=tweets[9]['url'], 
        url_tweet11=tweets[10]['url'], 
        url_tweet12=tweets[11]['url']) 

@app.route("/about")
def about():
    return render_template("about.html")
    
@app.route("/data/prairie_dog_colonies")
def data_prairie_dogs():
    return  "printed"

@app.route("/data/osmp_lands")
def data_osmp_lands():
    Session = sessionmaker(bind=engine)
    session = Session()
    stmt = text("SELECT Manager, PUBLICACCE as publicAccess, sum(Acres) as sumAcres"
        " FROM osmp_lands GROUP BY manager, PUBLICACCE")
    query = session.query("Manager", "publicAccess", "sumAcres").from_statement(stmt).all()
    return json.dumps([ row._asdict() for row in query ])

# @app.route("/data/prairie_dog_plot")
# def prairie_dog_plot():
#     # filename = os.path.join(app.static_folder, 'prairie_dog.json')
#     # with open(filename) as file:
#     #     data = json.dumps(file)
#     # return jsonify(data)

#     urlToVisit = url_for('static', filename='prairie_dog.json')
#     return redirect(urlToVisit)

@app.route('/data/plot_data')
def plot_data():
    urlToVisit = url_for('static', filename='prairie_dog.json')
    return redirect(urlToVisit)

if __name__ == "__main__":
    app.run(debug=True)
