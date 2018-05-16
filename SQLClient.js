const sql = require('mysql');
const readline = require('readline-sync');

var host = process.argv[2]
var user = process.argv[3]
var password = process.argv[4]
var database = process.argv[5]

var con = sql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

var text = '';

function main(){
  if(database == null){
    console.log("Usage: node SQLClient.js [host] [username] [password] [database]");
  }else{
    // while(!(text == 'quit' || text == 'exit')){
      text = readline.question(user + "@" + host +">");
      logQuery(text);
    // }
  }
}

function logQuery(text){
  var response = "";
  con.connect(function(err){
    if(err){
      console.error("Error Connecting");
      con.end();
    }
  });

  con.query(text, function(error, results, fields){
    if(error){
      console.log("Incorrect Command Syntax or Error Connecting: " + text);
      con.end();
      return;
    };
    response = results;
    con.end();
    console.log(response);
    return;
  });

}

main();
