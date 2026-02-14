import express from 'express';
import { PORT } from '../config/config.service.js';
import { NODE_ENV } from '../config/config.service.js';
import authRouter from './modules/auth/auth.controller.js';
import { connectDb } from './DB/connection.js';
import { bookRouter } from './modules/book/book.controller.js';
import { authorsRouter } from './modules/authors/authors.controller.js';
import { logsRouter } from './modules/logs/logs.controller.js';

async function bootstrap(){
    const app = express();
    const port=PORT;
    await connectDb()
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/book',bookRouter)
    app.use('/authors',authorsRouter)
    app.use('/logs',logsRouter)
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    //global error handling middleware
      app.use((error, req, res, next) => {
    return NODE_ENV == "dev" ?
    res
      .status(error.cause?.statusCode ?? 500)
      .json({ message: error.message, error, stack: error.stack })
      :
    res
      .status(error.cause?.statusCode ?? 500)
      .json({ message: "something went wrong" });
    // res.status(error.cause.statusCode || 500).json({ message: error.message ,error , stack: error.stack});
    // res.status(error.cause.statusCode ? error.cause.statusCode : 500).json({ message: error.message ,error , stack: error.stack});
  });
    app.listen(port, () => {
        console.log(`Server is running on port ::${port}`);
    });
}
export default bootstrap;