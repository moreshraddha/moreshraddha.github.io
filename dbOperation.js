module.exports = {
  getRecords: function(req, res) {    
        var pg = require('pg');        
        
        var conString = process.env.DATABASE_URL || "pg://postgres:shraddha@localhost:5432/Employee";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("select * from student order by id asc");
        query.on("row", function (row, result) { 
            result.addRow(row); 
        });
        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
    save : function(req, res){
        var pg = require('pg');          
        var conString = process.env.DATABASE_URL || "pg://postgres:shraddha@localhost:5432/Employee";
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("insert into student (firstName,lastName,email,mobile) "+ 
                                "values ('"+req.query.fName+"','"+req.query.lName+"','"+
                                    req.query.email+"','"+req.query.mbl+"')");    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    },    
     delete : function(req, res){
        var pg = require('pg');           
        var conString = process.env.DATABASE_URL || "pg://postgres:shraddha@localhost:5432/Employee";
        var client = new pg.Client(conString);
        client.connect();         
        var query = client.query( "Delete from student Where id ="+req.query.id);    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    },   

    updateRecord : function(req,res){
         var pg = require('pg');           
         var conString = process.env.DATABASE_URL || "pg://postgres:shraddha@localhost:5432/Employee";
         var client = new pg.Client(conString);
        client.connect();         
        var query = client.query("UPDATE student SET firstname = '"+req.query.fName+"',lastname='"+req.query.lName+"',email='"+req.query.email+"',mobile='"+req.query.mbl+"' WHERE id = "+req.query.id);    
      
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });
    }   
};