const express = require('express');
const app = express();
const helmet = require('helmet');

const routes = require('./routes');
const db = require('./database/_db');
const models = require('./models');

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', routes);

async function main(){
    try {
        await db.sync({force: false});
        app.listen(3001);
        console.log('Server listening on port', 3001);
    } catch (error) {
        console.error('Could not connect to the database', error);
    }
}

main();