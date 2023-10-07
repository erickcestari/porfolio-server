import express, { Express, Request, Response } from 'express';
import { env } from './env';
import { userRoutes } from './http/controllers/users/userRoutes';

const app: Express = express()
const port = env.PORT ?? 3333

app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
});


app.listen(port, () => {
  console.log(`⚡️[portfolio-server]: Server is running at http://localhost:${port}`)
});
