import express, { Express, Request, Response, json } from 'express';
import { env } from './env';
import { userRoutes } from './http/controllers/users/routes';
import { customErrorHandler } from './http/errors/customErrorHandler';

const app: Express = express()
const port = env.PORT ?? 3333

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allows-Methods', 'GET,PUT,OPTIONS,POST,DELETE')
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
  }
  next()
})

app.use(express.json());

app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
});

userRoutes.use(customErrorHandler)

app.listen(port, () => {
  console.log(`⚡️[portfolio-server]: Server is running at http://localhost:${port}`)
});
