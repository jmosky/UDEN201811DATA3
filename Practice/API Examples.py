
# coding: utf-8

# In[3]:

# Dependencies
import requests
import json


# In[4]:

# URL for GET requests to retrieve Star Wars character data
base_url = "https://swapi.co/api/people/"


# In[5]:

# Create a url with a specific character id
character_id = '4'
url = base_url + character_id
print(url)


# In[6]:

# Perform a get request for this character
response = requests.get(url)
print(response.url)


# In[7]:

# Storing the JSON response within a variable
data = response.json()
data


# In[8]:

# Collecting the name of the character collected
data.get('name')


# In[9]:

# Print the character and the number of films that they were in
# YOUR CODE HERE
data.get('films') # can we get the names of the films?


# In[11]:

# Figure out what their first starship was and print the ship
# YOUR CODE HERE
data.get('starships')[0]


# In[12]:

print(data.get('name'), len(data.get('films')))


# In[13]:

# Names of the movies
data.get('films')


# In[17]:

def get_key_value_from_endpoint(url):
    resp = requests.get(url).json()
    return resp.get('title')


# In[19]:

for f in data.get('films'):
    print(get_key_value_from_endpoint( f))


# In[27]:

# get the first 10 characters and all their films into some kind of data structure
# dictionary where the key char, value list of films
people = ['https://swapi.co/api/people/{}/'.format(x) for x in range(1, 10)]
data = {}
for row in people:
    resp = requests.get(row).json()
    person_name = resp.get('name')
    films = resp.get('films')
    film_names = [get_key_value_from_endpoint(x) for x in films]
    print(person_name, film_names)
    data[person_name] = film_names


# In[30]:

for person, films in data.items():
    print(person,films)
    print()
    
    
# new dict, key = film, value = list of actors
# what characters have been in more than 2 movies together?


# In[ ]:



