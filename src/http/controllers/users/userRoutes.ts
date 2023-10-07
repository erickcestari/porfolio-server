import { Router } from "express";

export const userRoutes = Router();

userRoutes.get('/', function(req, res) {
  res.send('User home page');
});