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

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", results=results)

@app.route("/maps/land_ownership")
def index():
    return render_template("land_ownership.html", results=results)

@app.route("/conservation_areas")
def index():
    return render_template("conservation_areas.html", results=results)

@app.route("/maps/trails")
def index():
    return render_template("trails.html", results=results)

@app.route("/maps/prairie_dogs")
def index():
    return render_template("prairie_dogs.html", results=results)

@app.route("/plots")
def index():
    return render_template("plots.html", results=results)

@app.route("/about")
def index():
    return render_template("about.html", results=results)

@app.route("/api/p")
   return redirect("/",302)

if __name__ == "__main__":
    app.run(debug=True)
