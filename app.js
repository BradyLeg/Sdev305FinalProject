
//Import Libaries
import express from 'express';
//Import Database
//import mariadb from 'mariadb'; // <--- maria db
//Import Services
import { validateFields } from './services/validation.js';


//Create Connection Management/login
//const pool = mariadb.createPool({}); // <--- maria db


//Function to connect
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connect to database')
        return conn;
    }
    catch (err) {
        console.log(`Error connecting to the data base${err}`);
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
const PORT = 3000;

//Array
const tasks = [];

//Define routes
app.get('/', (req, res) => {

    //Render home page
    res.render('home');
})

app.post('/thank-you', (req, res) => {

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
    if(!result.isValid)
    {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    res.render('thank-you', { userTasks });

})


//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});