
//Import Libaries
import express from 'express';
//Import Database
//import mariadb from 'mariadb';


//Create Connection Management/login
//const pool = mariadb.createPool({});


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

app.get('/', (req, res) => {

    //Render home page
    res.render('home');    
})

//Send port in Console.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});