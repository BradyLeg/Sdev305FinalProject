
//Import Libaries
import express from 'express';
//Import Database
import mariadb from 'mariadb'; // <--- maria db

//
import dotenv from 'dotenv';

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

app.post('/thank-you', async (req, res) => {

    const userTasks =
    {
        fname: req.body.fname,
        lname: req.body.lname,
        task: req.body.task,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        urgency: req.body.urgency
    };
    console.log(userTasks);

    //
    const errors = [];

    if (!userTasks.fname || userTasks.fname.trim() === "") {
        errors.push("First name is required");
        res.send(errors);
        return;
    }

    if (!userTasks.lname || userTasks.lname.trim() === "") {
        errors.push("Last name is required");
        res.send(errors);
        return;
    }

    if (!userTasks.task || userTasks.task.trim() === "") {
        errors.push("Task name is required");
        res.send(errors);
        return;
    }

    //Add validation that checks to see if the start date is before end date


    if (!userTasks.startdate) {
        errors.push("Start date is required");
        res.send(errors);
        return;
    }

    if (!userTasks.enddate) {
        errors.push("End date is required");
        res.send(errors);
        return;
    }

    if (!userTasks.urgency) {
        errors.push("Urgency type needs to be selected");
        res.send(errors);
        return;
    } else {
        const vaildOptions = ["Yes", "No"];
        if (!vaildOptions.includes(userTasks.urgency)) {
            errors.push("Urgency Spoofed");
            res.send(errors);
            return;
        }
    }

    //
    const conn = await connect();

    const insertQuery = await conn.query(`INSERT INTO task(
        fname, 
        lname,
        description,
        startdate,
        enddate,
        urgency)
        VALUES (?,?,?,?,?,?)`,
        [userTasks.fname,
        userTasks.lname,
        userTasks.description,
        userTasks.startdate,
        userTasks.enddate,
        userTasks.urgency]);

    res.render('thank-you', { userTasks });

})


//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});