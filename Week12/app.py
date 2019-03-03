from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars"
mongo = PyMongo(app)

@app.route("/")
def index():
    results = mongo.db.mars_data.find_one()
    return render_template("index.html", results=results)

@app.route("/scrape")
def scraper():
   results = scrape_mars.master_scrape()
   mongo.db.mars_data.update({},results, upsert=True)
   return redirect("/",302)

if __name__ == "__main__":
    app.run(debug=True)
