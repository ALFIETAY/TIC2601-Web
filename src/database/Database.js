import sql from sqlite3;

function ConnectToDatabase(){
    const db=new sql.Database("project.db",(err)=>{
        if (err){
            console.error("Error opening database:",err.message);
        }
        else{
            console.log('Connected to SQLite database');
        }
    });
}

function insert(table,values){
    db.run("BEGIN TRANSACTION");
    db.each("INSERT INTO "+table+" VALUES("+values+");",(err)=>{
        if (err){
            return false;
        }
        else {
            return true;
        }
    });

}

function CloseDatabase(db){
    db.close((err)=>{
        if (err){
            console.error("Error closing database: ",err.message);
        }
        else{
            console.log("Database connection closed");
        }
    });
}


modules.export={
    ...exports
};