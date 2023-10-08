import { create } from "./create";
import { Router } from "express";
import { register } from "./register";

export const userRoutes = Router();

userRoutes.get('/', function(req, res) {
  res.send('User home page');
});

userRoutes.route('/create').post(
  create
)

userRoutes.route('/register').post(
  register
)

