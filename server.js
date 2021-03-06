// Configuration
const express = require('express');
const app = express();

const path = require('path');

const cors = require('cors');
app.use(cors());

app.use(express.static( __dirname + '/sampleApp/dist' ));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dateFormat = require('dateformat');

let morgan = require("morgan");
app.use(morgan('dev'));

var myConnection  = require('express-myconnection')

// Model
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sampleTracker',
    charset: 'utf8'
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE sampleTracker';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database created')
    });
});
// create tables
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT NOT NULL, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user table created!')
    });
});
app.get('/createsamplestable', (req, res) => {
    let sql = 'CREATE TABLE samples(id int AUTO_INCREMENT, styleNo VARCHAR(255) NOT NULL, season VARCHAR(255), color VARCHAR(255) NOT NULL, description TEXT, material VARCHAR(255), location VARCHAR(255), status VARCHAR(255) NOT NULL, holiday VARCHAR(255), created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('samples table created!')
    });
});
app.get('/createorderstable', (req, res) => {
    let sql = 'CREATE TABLE orders(id int AUTO_INCREMENT, type VARCHAR(255) NOT NULL, users_id INT NOT NULL, PRIMARY KEY(id), CONSTRAINT FK_UserOrder FOREIGN KEY (users_id) REFERENCES users(id), created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('orders table created!')
    });
});
app.get('/createsampleorderstable', (req, res) => {
    let sql = 'CREATE TABLE sampleOrders(orders_id INT NOT NULL,samples_id INT NOT NULL, PRIMARY KEY(orders_id, samples_id), CONSTRAINT FK_SamplesHasOrders FOREIGN KEY (orders_id) REFERENCES orders(id), CONSTRAINT FK_OrdersHasSamples FOREIGN KEY (samples_id) REFERENCES samples(id), created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('samples orders table created!')
    });
});
// requests table joins sample + user:
app.get('/createrequesttable', (req, res) => {
    let sql = 'CREATE TABLE requests(users_id INT NOT NULL,samples_id INT NOT NULL, PRIMARY KEY(users_id, samples_id), CONSTRAINT FK_SamplesHasUsers FOREIGN KEY (users_id) REFERENCES users(id), CONSTRAINT FK_UsersHasSamples FOREIGN KEY (samples_id) REFERENCES samples(id), created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('requests table created!')
    });
});
// Sample Controller

app.get('/api/samples', function(req,res) {
    db.query('SELECT * FROM samples', (err, samples) => {
        res.json({samples:samples});
    });
});

app.get('/api/samples/:id', function(req,res) {
    db.query('SELECT * FROM samples WHERE id = ?', req.params.id, (err, sample) => {
        res.json({sample: sample});
    });
});

app.post('/api/samples', function(req,res) {
    db.query('INSERT INTO samples SET ?', req.body, (err, result) => {
        console.log(req.body);
        console.log('at least we got here');
    });
});

app.delete('/api/samples/:id', function(req,res) {
    db.query('DELETE FROM samples WHERE id = ?', req.params.id, (err, data) => {
        console.log('deleted successfully');
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.put('/api/samples/:id', function(req,res) {
    db.query('UPDATE samples SET styleNo = ?, season = ?, color = ?, description = ?, material = ?, location = ?, status = ?, holiday = ?, updated_at = NOW() WHERE id = ?', [req.body.styleNo, req.body.season, req.body.color, req.body.description, req.body.material, req.body.location, req.body.status, req.body.holiday, req.params.id], (err) => {
        if (err) {
            console.log('error updating!!')
        } else {
        console.log("success updated at server.js")
        }
    });
});
app.put('/api/samples/:id/status', function(req,res) {
    db.query('UPDATE samples SET status = ?, updated_at = NOW() WHERE id = ?', [req.body.status, req.params.id], (err, data) => {
        if (err) {
            console.log('error updating!!')
        } else {
            res.send(data);
        }
    });
});
app.post('/search/:id', function(req, res){
    console.log("req.body is ", req.body)
    console.log(req.params.id)
        if(req.params.id == 1){
            db.query('SELECT * FROM samples WHERE styleNo like ? AND color like ? AND season like ?', [req.body.styleNo, req.body.color, req.body.season], (err, data) => {
                if (err) throw err;
                else{
                    console.log("Working! Data for case 1 is ", data)
                    res.send(data);
                }
            }
        );
        }
        if(req.params.id == 2){
            db.query('SELECT * FROM samples WHERE styleNo like ? AND season like ?', [req.body.styleNo, req.body.season], (err, data) => {
                if (err) throw err;
                else{
                    console.log("Working! Data for case 2 is ", data)
                    res.send(data);
                }
            }
        );
        }

});

// User Controller

app.get('/api/users', function(req,res) {
    db.query('SELECT * FROM users', (err, users) => {
        if (err) {
            res.send(err);
        } else {
            res.send(users);
        }
    });
});

app.get('/api/users/:id', function(req,res) {
    db.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, user) => {
        if (err) {
            res.send(err)
        } else {
            res.send(user)
        }
    });
});

app.post('/api/users', function(req,res) {
    db.query('INSERT INTO users SET ?', req.body, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        };
    });
});

app.delete('/api/users/:id', function(req,res) {
    db.query('DELETE FROM users WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.json({err:err});
        } else {
            console.log('user deleted successfully');
        }
    });
});

// Order Controller
app.get('/api/orders', function(req,res) {
    db.query('SELECT * FROM orders', (err, orders) => {
        if (err) {
            res.send(err);
        } else {
            res.json({orders:orders});
        }
    });
});

app.post('/api/orders', function(req, res) {
    db.query('INSERT INTO orders SET ?', req.body, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})
// app.post('/api/orders/last', function(req, res) {
//     db.query('SELECT * FROM orders ORDER BY ID DESC LIMIT 1', (err, result) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     })
// })

// SampleOrder Controller
app.post('/api/sampleorders', function(req, res) {
    db.query('INSERT INTO sampleOrders SET ?', req.body, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})


app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./sampleApp/dist/index.html"))
});

// Server Listener
const port = 8000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));
