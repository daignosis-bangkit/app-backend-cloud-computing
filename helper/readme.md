# instance
cloud sql => mode development
instance id: lukaku-instance-cloudsql
password: lukakusqlKu123

# connection
const sql_host = "34.101.93.195";
const sql_user = "root";
const sql_database = "db_lukaku";
const sql_password = "lukakusqlKu123";

# create table name tbl_article
article_id(40) varchar not null uniq
article_post text
category(25) varchar not null
author(15) varchar not null
createion_date - datetime not null
update_data - datetime not null


INSERT INTO tbl_article (article_id, article_post, category, author, creation_date, update_date, photo_article)
VALUES ('789012', 'This is another article post', 'Business', 'Jane Smith', '2023-05-09 12:30:00', '2023-05-09 12:30:00', 'photo.jpg');