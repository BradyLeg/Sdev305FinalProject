
//Import Libaries
import express from 'express';
//Import Database
//import mariadb from 'mariadb'; // <--- maria db


//Create Connection Management/login
//const pool = mariadb.createPool({}); // <--- maria db


//Function to connect
async function connect()
{
    try 
    {
        const conn = await pool.getConnection();
        console.log('Connect to database')
        return conn;
    }
    catch (err)
    {
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
        urgencey: req.body.urgencey
    };

    res.render('thank-you.ejs', { userTasks });


})





//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});