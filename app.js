
//Import Libaries
import express from 'express';
//Import Database
import mariadb from 'mariadb';

const pool = mariadb.createPool({});

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
