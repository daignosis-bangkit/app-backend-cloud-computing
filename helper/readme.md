# create table name tbl_article
article_id(40) varchar not null uniq
article_post text
category(25) varchar not null
author(15) varchar not null
createion_date - datetime not null
update_data - datetime not null


INSERT INTO tbl_article (article_id, article_post, category, author, creation_date, update_date, photo_article)
VALUES ('789012', 'This is another article post', 'Business', 'Jane Smith', '2023-05-09 12:30:00', '2023-05-09 12:30:00', 'photo.jpg');

CREATE TABLE Orders (
    OrderID int NOT NULL PRIMARY KEY,
    OrderNumber int NOT NULL,
    PersonID int FOREIGN KEY REFERENCES Persons(PersonID)
);


CREATE TABLE tbl_address (
    address_id varchar(40) PRIMARY KEY,
    user_id varchar(40),
    address text,
    city varchar(24),
    province varchar(30),
    postal_code int(5),
    country varchar(26)
);
