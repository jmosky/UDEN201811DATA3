df.describe()
df.info()
df.dtypes  # no parens

df["reviews.addedYear"] = df["reviews.dateAdded"].map(lambda x: x.split("-")[0])
filtered = df[(df["reviews.addedYear"] == '2017') & (df["reviews.addedMonth"] == '09')].copy()

# --------------------------------------------------------------------------------------------------


from collections import Counter

# function vs. method
# variable assignments and when/where
# computationally expensive
# "the try except block indentations in expressions"

data = [1, 2, 55, 78, 35]
outcomes = []

for index, val in enumerate(data):
  try:
    current_val = val
    next_val = data[index + 1]
    print(current_val < next_val)
    print(current_val, next_val)
    is_sorted = current_val < next_val
    outcomes.append(is_sorted)
  except IndexError:
    pass

print(is_sorted)
print(outcomes)

print(data)

print(min(data))
print(max(data))
print(data[::-1])
print(data[-1])
print(data[:2])

for item in data:
  print(item)

  # SHIFT COMMAND V 
 
# name = "Jennifer Sunshine Wilson"
age = 30.76
profession = "Human"
dogs = 1

# new way
greeting = f"Hi my name is {name} and I am {age - 10} years old"

# okay way
# print("Hi my name is ", name, "and I am ", age, "years old.")

# old way (pre-3.6)
# print("Hi my name is {} and I am {} years old".format(name, age))

# print(f"Hi my name is {name} and I am {age - 10} years old.")

# print(greeting)
# print(type(age))
# print(type(greeting))

# print(greeting[:10])
# print(len(greeting))

# words = greeting.split()
# print(words)

# name.startswith("J")

words = ["jen","dog","moose"]
for w in words:
    if w.startswith("j"):
        # This must be indented.
        print(w, "does in fact start with j")


# assign a letter grade

score = 78

def get_grade(some_score):
    if some_score >=90:
        letter_grade = "A"
    elif some_score >= 80:
        letter_grade = "B"
    elif some_score >= 70:
        letter_grade = "C"
    elif some_score >= 60:
        letter_grade = "D"
    else:
        letter_grade = "F"
    
    return letter_grade

print(get_grade(score))



# Incorporate the random library
import random

# Print Title
print("Let's Play Rock Paper Scissors!")

# Specify the three options
options = ["r", "p", "s"]

# Computer Selection
computer_choice = random.choice(options)

# User Selection
user_choice = input("Make your Choice: (r)ock, (p)aper, (s)cissors? ")

# Run Conditionals
if computer_choice == user_choice:
    print("Tie!")
elif computer_choice == 'r' and user_choice == 'p':
    print("Computer wins!")
elif computer_choice == 'r' and user_choice == 's':
    print("Computer wins!")
elif computer_choice == 'p' and user_choice == 'r':
        print("User wins!")
elif computer_choice == 'p' and user_choice == 's':
        print("User wins!")
elif computer_choice == 's' and user_choice == 'r':
    print("User wins!")
elif computer_choice == 's' and user_choice == 'p':
    print("Computer wins!")
else:
    print("Error")

### Warmup Activity #1 - lists and iteration, plus string operations

people = ["John", "Jack", "Mr Ed", "Ronald", "Becky", 
    "Dianne", "Germaine", "Horas", "Ed", "Edd", "Wilbur",
    "Constantine", "Scouty Pants"
]

# 1) Find names (create a new list) which either start or end with "ed"
# 2) Sort the names alphabetically using the sorted function, which takes a list
# 3) Sort the names based on the length of the name, google "python sort list based on length of string"

ed_names = []
names_count = 0
for name in people:
    names_count += 1
    if name.lower().endswith("ed") or name.lower().startswith("ed"):
        ed_names.append(name)

print(sorted(people))

# Alphabetical list.
print(sorted(ed_names))

# List by character length.
print(sorted(ed_names, key=len)) # does not modify original
people.sort(key=len) # modifies original
print(sorted(people, key=lambda x: len(x)))

# Show number of names in original list.
print(names_count)












# First we'll import the os module
# This will allow us to create file paths across operating systems
import os

# Module for reading CSV files
import csv

csvpath = os.path.join('..', 'Resources', 'accounting.csv')

# # Method 1: Plain Reading of CSV files
# with open(csvpath, 'r') as file_handler:
#     lines = file_handler.read()
#     print(lines)
#     print(type(lines))


# Method 2: Improved Reading using CSV module

# This is a context manager. Once excited, the connection is closed.
with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')

    print(csvreader)

    # Read the header row first (skip this step if there is now header)
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    # Read each row of data after the header
    for row in csvreader:
        print(row)

        first, last, ss = row
        print(first, last, ss)
        
        firstname, lastname, ss = row[0], row[1], row[]
        # how to print only the first column
        first_name = row[0]

# --------------------------------------------------------------------------------------------------
import os
import csv
csvpath = os.path.join('..', 'Resources', 'netflix_ratings.csv')

# selection = input("What shall we find?")
selection = "Gossip Girl"

with open(csvpath, newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    # print(csvreader)

    for row in csvreader:
        movie, rating, rating_score = row[0], row[1], row[5]
        if movie == selection:
            print(f"{movie} is rated {rating} with a rating of {rating_score}.")
            break

    for row in csvreader:
        if row[0] == selection:
            print( " | ".join(row))
            break
