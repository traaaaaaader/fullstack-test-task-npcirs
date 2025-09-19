DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE IF NOT EXISTS authors(
	id SERIAL PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	rating DECIMAL(2,1) NOT NULL,
	birth_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS books(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	pages INT NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	published_date DATE NOT NULL,
	author_id INT REFERENCES authors(id)
);

INSERT INTO authors(full_name, rating, birth_date) VALUES
('Leo Tolstoy', 9.8, '1828-09-09'),
('Fyodor Dostoevsky', 9.7, '1821-11-11'),
('Anton Chekhov', 9.5, '1860-01-29'),
('Vladimir Nabokov', 9.4, '1899-04-22'),
('Alexander Pushkin', 9.6, '1799-06-06'),
('Ivan Turgenev', 9.0, '1818-11-09'),
('Boris Pasternak', 8.9, '1890-02-10'),
('Mikhail Bulgakov', 9.2, '1891-05-15'),
('Maxim Gorky', 8.7, '1868-03-28'),
('Nikolai Gogol', 9.1, '1809-03-31');

-- Вставка книг
INSERT INTO books(title, pages, price, published_date, author_id) VALUES
('War and Peace', 1225, 19.99, '1869-01-01', 1),
('Anna Karenina', 864, 14.50, '1878-01-01', 1),
('The Death of Ivan Ilyich', 120, 7.99, '1886-01-01', 1),
('Crime and Punishment', 671, 12.99, '1866-01-01', 2),
('The Idiot', 656, 11.50, '1869-01-01', 2),
('Demons', 768, 13.20, '1872-01-01', 2),
('The Cherry Orchard', 96, 5.99, '1904-01-01', 3),
('Uncle Vanya', 128, 6.50, '1899-01-01', 3),
('The Seagull', 120, 6.99, '1896-01-01', 3),
('Lolita', 336, 10.99, '1955-01-01', 4),
('Pale Fire', 314, 9.99, '1962-01-01', 4),
('Speak, Memory', 256, 8.99, '1951-01-01', 4),
('Eugene Onegin', 320, 15.00, '1833-01-01', 5),
('The Captains Daughter', 192, 9.50, '1836-01-01', 5),
('Fathers and Sons', 350, 11.00, '1862-01-01', 6),
('A Month in the Country', 128, 7.50, '1855-01-01', 6),
('Doctor Zhivago', 592, 14.99, '1957-01-01', 7),
('My Sister, Life', 180, 6.99, '1906-01-01', 7),
('The Master and Margarita', 384, 13.50, '1966-01-01', 8),
('Heart of a Dog', 144, 7.99, '1925-01-01', 8),
('Mother', 320, 10.50, '1906-01-01', 9),
('Childhood', 256, 8.50, '1913-01-01', 9),
('Dead Souls', 432, 12.00, '1842-01-01', 10),
('The Overcoat', 96, 5.99, '1842-01-01', 10);


