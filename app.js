//Import Libaries
import express from 'express';
//Import Database
import mariadb from 'mariadb'; // <--- maria db

//
import dotenv from 'dotenv';

import { validateFields } from './services/validation.js';

dotenv.config();

//Create Connection Management/login
const pool = mariadb.createPool({
    host: process.env.DB_Host,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}); // <--- maria db


//Function to connect
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to database')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`);
    }
}

//Create express app
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));

//Set view engine for app
app.set('view engine', 'ejs');

//serve static files
app.use(express.static('public'));

//Define a port
const PORT = process.env.APP_PORT || 3000;

//Array
const tasks = [];

//Define routes
app.get('/', (req, res) => {

    //Render home page
    res.render('home');
})

//Render Calendar
app.get('/calendar', async (req, res) => {
    const conn = await connect();
    const tasks = await conn.query("SELECT * FROM item");
    res.render('calendar', { userTasks: tasks });
});

app.post('/thank-you', async (req, res) => {

    const userTasks =
    {
        fname: req.body.fname,
        lname: req.body.lname,
        task: req.body.task,
        startday: req.body.assignedday,
        tasklength: Number(req.body.tasklength),
        description: req.body.description,
        urgency: req.body.urgency
    };

    console.log(userTasks);

    //
    const errors = [];

    //Validation
    const result = validateFields(userTasks);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    const conn = await connect();

    const insertQuery = await conn.query(`INSERT INTO item(
        fname, 
        lname,
        description,
        assignedday,
        days,
        urgency,
        task)
        VALUES (?,?,?,?,?,?,?)`,
        [userTasks.fname,
        userTasks.lname,
        userTasks.description,
        userTasks.startday,
        userTasks.tasklength,
        userTasks.urgency,
        userTasks.task]);

    res.render('thank-you', { userTasks });

    conn.release()

});

app.get('/admin', async (req, res) => {

    const conn = await connect();

    const tasks = await conn.query('SELECT * FROM item;');

    console.log(tasks);

    res.render('admin', { tasks });

    conn.release()
});


//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});