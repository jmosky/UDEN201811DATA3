# TUTOR - Why can't I just import all of sqlalchemy?
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func

# TUTOR - why can't I add the next line? Grouping?
# %matplotlib inline

from matplotlib import style
style.use('fivethirtyeight')
import matplotlib.pyplot as plt

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import datetime as dt

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, text

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################

weather = Flask(__name__)

#################################################
# Flask Routes
#################################################

# Home page.
@weather.route("/")
def home():
    #TUTOR - Why are the f strings? Why is it out of order? Why can't I show the print() line?
    return """
        <p>Available Routes:</p>
        <BLOCKQUOTE>
            /api/v1.0/precipitation<br>
            /api/v1.0/stations<br>
            /api/v1.0/temperatures<br>
        </BLOCKQUOTE>
        """

# Precipitation page. Shows dates with total rainfall for each date.
@weather.route("/api/v1.0/precipitation")
def precipitation():
    precip = []

    # TUTOR - Is this indentation right?
    for row in session.query(Measurement).all():
            precip.append({
                "date": row.date,
                "prcp": row.prcp
            })

    # Create dataframe from all records.
    precip_df = pd.DataFrame.from_records(precip)
    # precip_df.set_index('date', inplace=True)

    # Add new column converting date string to datetime format.
    precip_df['datetime'] = pd.to_datetime(precip_df['date'], format='%Y-%m-%d')

    # Determine the most recent date.
    max_date = precip_df.datetime.max()

    # If the row's date is within a year of the most recent date, mark as True else False.
    precip_df['include_flag'] = precip_df['datetime'].apply(lambda x: True if max_date - x <= timedelta(days=365) else False) 

    # TUTOR - Why does precip_df in the next line generate a NoneType object?
    # precip_df = precip_df.query('include_flag == True', inplace=True)

    # Filter the dataframe for only the lase year of data.
    precip_df.query('include_flag == True', inplace=True)

    # Sort dates in ascending order.
    precip_df.sort_values('date',inplace=True)

    # Aggregate prcp by date.
    precip_df = precip_df[['date','prcp']].groupby(['date']).agg({'prcp': 'sum'}).reset_index()

    # Convert dataframe to dictionary so it can be jsonified.
    precip_dict = precip_df.set_index("date").to_dict()

    # Jsonify!
    return jsonify(precip_dict)

# Stations page. Returns list of all stations.
@weather.route("/api/v1.0/stations")
def stations():
    results = session.query(Station.station).all()
    all_stations = list(np.ravel(results))
    return jsonify(all_stations)

# Temperature page. Returns list of all temps for the last year.
@weather.route("/api/v1.0/temperatures")
def temperatures():
    station = []

    for row in session.query(Measurement).filter(Measurement.station == 'USC00519281').all():
        station.append({
            "date": row.date,
            "temp": row.tobs
        })

    # Create dataframe from all records.
    station_df = pd.DataFrame.from_records(station)

    # Add new column converting date string to datetime format.
    station_df['datetime'] = pd.to_datetime(station_df['date'], format='%Y-%m-%d')

    # Determine the most recent date.
    max_date = station_df.datetime.max()

    # If the row's date is within a year of the most recent date, mark as True else False.
    station_df['include_flag'] = station_df['datetime'].apply(lambda x: True if max_date - x <= timedelta(days=365) else False) 

    # Filter the dataframe for only the lase year of data.
    station_df.query('include_flag == True', inplace=True)

    # Sort dates in ascending order.
    station_df.sort_values('date',inplace=True)

    # Aggregate prcp by date.
    station_df = station_df[['date','temp']].groupby(['date']).agg({'temp': 'sum'}).reset_index()

    # Convert dataframe to dictionary so it can be jsonified.
    station_dict = station_df.set_index("date").to_dict()

    # Jsonify!
    return jsonify(station_dict)

# Show min, max, and average temps for a given timeframe with a start and end date.
@weather.route("/api/v1.0/start=<start>&end=<end>")
def calc_temps_start_end(start,end):
    start_date = '{}'.format(start)
    end_date = '{}'.format(end)

    # TUTOR - Why do I need this? Without it I get an error:
    # "SQLite objects created in a thread can only be used in that same thread"
    session = Session(engine)

    return jsonify(session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), \
            func.max(Measurement.tobs)).filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all())

# Show min, max, and average temps for a given timeframe with a start and default max(date) in dataset end date.
@weather.route("/api/v1.0/start=<start>")
def calc_temps_start(start):
    start_date = '{}'.format(start)

    session = Session(engine)

    return jsonify(session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), \
            func.max(Measurement.tobs)).filter(Measurement.date >= start_date).all())

if __name__ == "__main__":
    weather.run(debug=True)