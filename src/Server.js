const express = require('express');
const app=express();
const cors=require('cors');
const bcrypt=require('bcrypt');
const sql = require('sqlite3');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const db = new sql.Database('./project.db');

function insert(table,values){
    const placeholders = values.map(()=>'?').join(', ');
    const statement=`INSERT INTO ${table} VALUES (${placeholders});`;
    db.run(statement,values, (err)=>{
        if (err){
            return false;
        }
        else{
            return true;
        }
    });
}

app.post('/signup',async (req,res)=>{
    const saltRounds=10;
    if (insert("user",["1","2","3"])){

    }
    else{
        console.error("Username exists");
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});