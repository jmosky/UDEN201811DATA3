
#################################################
# Import Dependencies
#################################################
#import numpy as np
#import pandas as pd
#from datetime import datetime, timedelta
#import datetime as dt

import json
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
    redirect)

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
    tweets = get_tweets.find_tweets(10)
    return render_template("plots.html", tweets=tweets)

@app.route("/about")
def about():
    return render_template("about.html")
    
@app.route("/data/prairie_dog_colonies")
def data_prairie_dogs():
    Session = sessionmaker(bind=engine)
    session = Session()
    results = session.query(prairie_dog_colonies_data).all()
    ## data = session.query('name').from_statement('SELECT name from users')

#   @app.route("/api/p")
#    return redirect("/",302)

if __name__ == "__main__":
    app.run(debug=True)
