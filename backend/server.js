import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
import {notFound, errhandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js' 

dotenv.config()
connectDB();
const app = express();
app.get('/', (req,res) => {
    res.send('API is running....vvv')
})

app.use('/api/products', productRoutes)
app.use(notFound);
app.use(errhandler);

const port = process.env.PORT || 8000
app.listen(port, console.log(`Server Runnig in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold));