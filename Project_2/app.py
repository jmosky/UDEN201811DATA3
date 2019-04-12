
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
    return render_template("plots.html", tweet1=tweets[0]['text'], 
        tweet2=tweets[1]['text'], tweet3=tweets[2]['text'], tweet4=tweets[3]['text'],
        tweet5=tweets[4]['text'], tweet6=tweets[5]['text'], tweet7=tweets[6]['text']) 

@app.route("/about")
def about():
    return render_template("about.html")
    
@app.route("/data/prairie_dog_colonies")
def data_prairie_dogs():
    Session = sessionmaker(bind=engine)
    session = Session()
    stmt = text("select YearAcquir as yearAcquired,sum(Acres) as sumAcres,"
        " CASE"
        " WHEN name LIKE 'White Rocks%' THEN 'White Rock'"
        " WHEN name LIKE 'West Rudd%' THEN 'West Rudd'"
        " WHEN name LIKE 'Yunker%' THEN 'Yunker'"
        " WHEN name LIKE 'Weiser%' THEN 'Weiser'"
        " WHEN name LIKE 'Varra%' THEN 'Varra'"
        " WHEN name LIKE 'Eggleston%' THEN 'Eggleston'"
        " WHEN name LIKE 'Van Vleet%' THEN 'Van Vleet'"
        " WHEN name LIKE 'Valmont Butte%' THEN 'Valmont Butte'"
        " WHEN name LIKE 'Tracy%' THEN 'Tracy Collins'"
        " WHEN name LIKE 'Teller%' THEN 'Teller Farms'"
        " WHEN name LIKE 'Superior%' THEN 'Superior Associates'"
        " WHEN name LIKE '%Stepanek%' THEN 'Stepanek, Canino, Cito'"
        " WHEN name LIKE '%Canino%' THEN 'Stepanek, Canino, Cito'"
        " WHEN name LIKE '%Cito%' THEN 'Stepanek, Canino, Cito'"
        " WHEN name LIKE 'Steele%' THEN 'Steele'"
        " WHEN name LIKE 'Schneider%' THEN 'Schneider'"
        " WHEN name LIKE 'Sams Lane%' THEN 'Sams Lane'"
        " WHEN name LIKE 'Ryan%' THEN 'Ryan'"
        " WHEN name LIKE 'Nu %' THEN 'NU West'"
        " WHEN name LIKE 'McKenzie %' THEN 'McKenzie'"
        " WHEN name LIKE 'Kolb%' THEN 'Kolb'"
        " WHEN name LIKE 'Klein %' THEN 'Klein'"
        " WHEN name LIKE 'Abbot%' THEN 'Abbot'"
        " WHEN name LIKE 'Andrus%' THEN 'Andrus'"
        " WHEN name LIKE 'Axelson%' THEN 'Axelson'"
        " WHEN name LIKE 'Blip%' THEN 'Blip'"
        " WHEN name LIKE 'BVR%' THEN 'BVR 103 Corp'"
        " WHEN name LIKE 'Belgrove%' THEN 'Belgrove'"
        " WHEN name LIKE 'Colorado Open%' THEN 'Colorado Open Lands'"
        " WHEN name LIKE 'Cosslett%' THEN 'Cosslett'"
        " WHEN name LIKE 'Damyon%' THEN 'Damyanovich'"
        " WHEN name LIKE 'ERTL%' THEN 'ERTL'"
        " WHEN name LIKE 'East Park%' THEN 'East Park'"
        " WHEN name LIKE 'East Beech%' THEN 'East Beech'"
        " WHEN name LIKE 'East Rudd%' THEN 'East Rudd'"
        " WHEN name LIKE 'IBM%' THEN 'IBM'"
        " WHEN name LIKE 'Hogan Brothers%' THEN 'Hogan Brothers'"
        " WHEN name LIKE 'Jewel%' THEN 'Jewel Mountain'"
        " WHEN name LIKE 'Joder%' THEN 'Joder'"
        " WHEN name LIKE 'Johnson/Daw%' THEN 'Johnson/Dawson'"
        " WHEN name LIKE 'Johnson%' THEN 'Johnson'"
        " ELSE name END as Name"
        " from prairie_dog_colonies"
        " group by Name,YearAcquir"
        " order by Name,YearAcquir")
    query = session.query("Name", "yearAcquired", "sumAcres").from_statement(stmt).all()
    return json.dumps([ row._asdict() for row in query ])

    # x = year acquired
    # y = sumAcres
    # other dim (each line in the chart) = Name
    #
    # var trace3 = {
    #     x: [1, 2, 3, 4],
    #     y: [12, 9, 15, 12],
    #     mode: 'lines+markers'
    #     };

@app.route("/data/osmp_lands")
def data_osmp_lands():
    Session = sessionmaker(bind=engine)
    session = Session()
    stmt = text("SELECT Manager, PUBLICACCE as publicAccess, sum(Acres) as sumAcres"
        " FROM osmp_lands GROUP BY manager, PUBLICACCE")
    query = session.query("Manager", "publicAccess", "sumAcres").from_statement(stmt).all()
    return json.dumps([ row._asdict() for row in query ])

if __name__ == "__main__":
    app.run(debug=True)
