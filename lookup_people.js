const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  client.query("SELECT * FROM famous_people WHERE (first_name = $1 OR last_name = $1)", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found " + result.rows.length + " person(s) by the name '" + name + "':")
    for (i=0; i<result.rows.length; i++) {
      console.log ('- ' + (i+1) + ' ' + result.rows[i].first_name + ' ' + result.rows[i].last_name + ', born ' + "'"+ ('' + result.rows[0].birthdate).split(' 00:00:00')[0] +"'")
    }
    client.end();
  });
});

//.split(' 00:00:00')[0]