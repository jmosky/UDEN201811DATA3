## INITIAL PROJECT SUMMARY
The sources of data that you will extract from: https://data.world/typhon/new-york-times-bestsellers-from-2011-to-2018/workspace/file?filename=books_uniq_weeks.csv and using the ISBN, we will scrape from GoodReads, Amazon, or another book site to extract additional information about each title.

The type of transformation needed for this data (cleaning, joining, filtering, aggregating, etc).: joining on ISBN, cleaning of scraped data, filtering if any data exceptions appear (e.g. missing ISBN) , analyze by aggregating across various dimensions

The type of final production database to load the data into (relational or non-relational): relational

The final tables or collections that will be used in the production database:  Data.world inputs, scraped + aggregated data from TBD website (see options above) 

## FINAL REPORT

**Extract**
Source 1: books_uniq_weeks ( https://data.world/typhon/new-york-times-bestsellers-from-2011-to-2018/workspace/file?filename=books_uniq_weeks.csv)
Source 2: GoodReads.com via BeautifulSoup (HTML data)

**Transform**
Using ISBN from CSV, we opened GoodReads and scraped the book page's HTML. We extracted the average rating, number of ratings, number of reviews, and we scraped the right rail carousel to extract the suggested titles.

**Load**
We created a list of dictionaries which we inserted into a MongoDB collection call "nyt_bestsellers" with a document call "bestsellers." Each Book has it's own document and houses a variety of different data formats from string formatted BeautifulSoup object to a list of related titles to an integer showing the number of weeks the title was on the bestseller list.
