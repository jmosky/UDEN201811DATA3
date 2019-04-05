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

@app.route("/api/")

   return redirect("/",302)

if __name__ == "__main__":
    app.run(debug=True)
