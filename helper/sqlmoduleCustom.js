const sqlconf = require("../helper/configSql");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: sqlconf.sql_host,
  user: sqlconf.sql_user,
  database: sqlconf.sql_database,
  password: sqlconf.sql_password,
});