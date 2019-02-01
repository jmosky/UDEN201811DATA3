-- 1a. Display the first and last names of all actors from the table actor.

SELECT first_name, last_name
FROM actor;

-- 1b. Display the first and last name of each actor in a single column in 
-- upper case letters. Name the column Actor Name.

SELECT upper(concat(first_name, " ",last_name)) as 'Actor Name'
FROM actor;

-- 2a. You need to find the ID number, first name, and last name of an 
-- actor, of whom you know only the first name, "Joe." 
-- What is one query would you use to obtain this information?

SELECT first_name, last_name, actor_id
FROM actor
WHERE first_name like 'Joe';

-- 2b. Find all actors whose last name contain the letters GEN:

SELECT *
FROM actor
WHERE last_name like '%GEN%';

-- 2c. Find all actors whose last names contain the letters LI. 
-- This time, order the rows by last name and first name, in that order:

SELECT *
FROM actor
WHERE last_name like '%LI%'
ORDER BY last_name ASC, first_name ASC;

-- d. Using IN, display the country_id and country columns of the 
-- following countries: Afghanistan, Bangladesh, and China:

SELECT country_id, country 
FROM country
WHERE country in ('Afghanistan', 'Bangladesh', 'China');

-- 3a. You want to keep a description of each actor. You don't think 
-- you will be performing queries on a description, so create a column 
-- in the table actor named description and use the data type BLOB 

ALTER TABLE actor ADD COLUMN description BLOB AFTER last_name;

-- 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the description column.

ALTER TABLE actor DROP COLUMN description;

-- 4a. List the last names of actors, as well as how many actors have that last name.

SELECT last_name, count(actor_id) as qty
FROM actor
GROUP BY last_name
ORDER BY qty DESC;

-- 4b. List last names of actors and the number of actors who have 
-- that last name, but only for names that are shared by at least two actors.

SELECT last_name, count(actor_id) as qty
FROM actor
GROUP BY last_name
HAVING count(actor_id) > 1
ORDER BY qty DESC;

-- 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table 
-- as GROUCHO WILLIAMS. Write a query to fix the record.

UPDATE actor SET first_name = "HARPO"
WHERE last_name = "WILLIAMS" and first_name = "GROUCHO";

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out 
-- that GROUCHO was the correct name after all! In a single query, if the 
-- first name of the actor is currently HARPO, change it to GROUCHO.

UPDATE actor SET first_name = "GROUCHO"
WHERE last_name = "WILLIAMS" and first_name = "HARPO";

-- 5a. You cannot locate the schema of the address table. 
-- Which query would you use to re-create it?
-- TUTOR: https://www.w3resource.com/sql/sql-basic/create-schema.php

describe sakila.address;

show create table sakila.address;

CREATE TABLE `address` (
  `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `district` varchar(20) NOT NULL,
  `city_id` smallint(5) unsigned NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `location` geometry NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `idx_fk_city_id` (`city_id`),
  SPATIAL KEY `idx_location` (`location`),
  CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=606 DEFAULT CHARSET=utf8;

-- 6a. Use JOIN to display the first and last names, as well as the address, 
-- of each staff member. Use the tables staff and address:

SELECT 
	st.first_name, 
    st.last_name, 
    ad.address,
    ad.address2,
    ad.district,
    ad.city_id,
    ad.postal_code,
    ad.phone,
    ad.location
FROM staff st
LEFT JOIN address ad ON st.address_id = ad.address_id;

-- 6b. Use JOIN to display the total amount rung up by each staff 
-- member in August of 2005. Use tables staff and payment.

SELECT 
	st.staff_id,
    st.first_name,
    st.last_name,
    sum(amount) as ttl_amount
FROM staff st
LEFT JOIN payment pmt ON st.staff_id = pmt.staff_id
WHERE date_format(pmt.payment_date, '%Y-%m') = '2005-08'
GROUP BY 
	st.staff_id,
    st.first_name,
    st.last_name
;

-- 6c. List each film and the number of actors who are listed 
-- for that film. Use tables film_actor and film. Use inner join.

SELECT 
	f.film_id,
    f.title,
	count(fa.actor_id) as actors -- Confirmed there are no duplicates.
FROM film f
INNER JOIN film_actor fa ON f.film_id = fa.film_id
GROUP BY
	f.film_id,
    f.title
 ;   
-- 6d. How many copies of the film Hunchback Impossible
-- exist in the inventory system?

SELECT count(inventory_id) as stock
FROM inventory inv
INNER JOIN film f ON inv.film_id = f.film_id
WHERE  f.title = "Hunchback Impossible";


-- 6e. Using the tables payment and customer and the JOIN command, 
-- list the total paid by each customer. List the customers 
-- alphabetically by last name:

SELECT 
	cust.customer_id,
    cust.first_name,
    cust.last_name,
    sum(amount) as 'total_amount_paid'
FROM customer cust
JOIN payment pmt ON cust.customer_id = pmt.customer_id
GROUP BY
	cust.customer_id,
    cust.first_name,
    cust.last_name
ORDER BY cust.last_name ASC;

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely 
-- resurgence. As an unintended consequence, films starting with the 
-- letters K and Q have also soared in popularity. Use subqueries to 
-- display the titles of movies starting with the letters K and Q 
-- whose language is English.

SELECT title
FROM film 
INNER JOIN
	(SELECT language_id
    FROM language
    WHERE name = 'English'
    ) x
ON film.language_id = x.language_id
WHERE title like 'K%' or title like 'Q%'
ORDER BY title ASC;

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.

SELECT act.*
FROM actor act
INNER JOIN film_actor fa ON act.actor_id = fa.actor_id
INNER JOIN
	(SELECT *
	FROM film
	WHERE title = 'Alone Trip'
	) fil
ON fa.film_id = fil.film_id;

-- 7c. You want to run an email marketing campaign in Canada, for which you 
-- will need the names and email addresses of all Canadian customers. Use 
-- joins to retrieve this information.

SELECT c.name, cust.email
FROM customer_list c
INNER JOIN customer cust ON c.id = cust.customer_id
WHERE cust.country = 'Canada';


-- 7d. Sales have been lagging among young families, and you wish to target all 
-- family movies for a promotion. Identify all movies categorized as family films.

SELECT title
FROM film_list
WHERE category = 'Family';

-- 7e. Display the most frequently rented movies in descending order.

SELECT f.title, count(r.rental_id) as rental_qty
FROM film f
INNER JOIN inventory i ON f.film_id = i.film_id
INNER JOIN rental r ON r.inventory_id = i.inventory_id
GROUP BY 1
ORDER BY rental_qty DESC;

-- 7f. Write a query to display how much business, in dollars, each store brought in.

SELECT store, total_sales
FROM sales_by_store;

-- 7g. Write a query to display for each store its store ID, city, and country.

SELECT 
	s.store_id,
    ci.city,
    co.country
FROM store s
LEFT JOIN address a ON s.address_id = a.address_id
LEFT JOIN city ci ON a.city_id = ci.city_id
LEFT JOIN country co ON ci.country_id = co.country_id;

-- 7h. List the top five genres in gross revenue in descending order. 

SELECT 
	category,
    total_sales
FROM sales_by_film_category
ORDER BY  total_sales DESC
LIMIT 5;
-- OR --
SELECT 
    c.name,
    sum(pmt.amount) as ttl_sales
FROM category c
INNER JOIN film_category fc ON c.category_id = fc.category_id
INNER JOIN inventory inv ON fc.film_id = inv.film_id
INNER JOIN rental r ON inv.inventory_id = r.inventory_id
INNER JOIN payment pmt ON r.rental_id = pmt.rental_id
GROUP BY c.name
ORDER BY ttl_sales DESC
LIMIT 5;

-- 8a. In your new role as an executive, you would like to have an 
-- easy way of viewing the Top five genres by gross revenue. 
-- Use the solution from the problem above to create a view. 
-- If you haven't solved 7h, you can substitute another query to create a view.

CREATE VIEW top_five_genres AS
SELECT 
    c.name,
    sum(pmt.amount) as ttl_sales
FROM category c
INNER JOIN film_category fc ON c.category_id = fc.category_id
INNER JOIN inventory inv ON fc.film_id = inv.film_id
INNER JOIN rental r ON inv.inventory_id = r.inventory_id
INNER JOIN payment pmt ON r.rental_id = pmt.rental_id
GROUP BY c.name
ORDER BY ttl_sales DESC
LIMIT 5;

-- 8b. How would you display the view that you created in 8a?

SELECT * FROM top_five_genres;

-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.

DROP VIEW IF EXISTS top_five_genres;







