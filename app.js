//Import Libaries
import express from 'express';
//Import Database
import mariadb from 'mariadb'; // <--- maria db
//Import Services
import { validateFields } from './services/validation.js';

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

    //Validation
    const result = validateFields(userTasks)
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }


    res.render('thank-you', { userTasks });

})

//Navigate back to home from Thank you page
app.get("/home", (req, res) => {
    res.render("home.ejs")
})



//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});