import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectDB } from './config/database.js';

connectDB();

app.get('/', (req, res, next) => {
    res.send('<h1>Working...</h1>')
})

app.listen(process.env.PORT, () => console.log(`Server is working on... ${process.env.PORT}, in ${process.env.NODE_ENV} Mode`))