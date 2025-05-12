import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      const newFighter = fighterService.create(req.body);
      res.data = newFighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
  updateFighterValid,
  async (req, res, next) => {
    try {
      const updatedFighter = await fighterService.update(
        req.params.id,
        req.body
      );
      if (!updatedFighter) {
        throw new Error("Fighter not found");
      }
      res.data = updatedFighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const fighter = fighterService.search({ id: req.params.id });
      if (!fighter) {
        throw new Error("Fighter not found");
      }
      res.data = fighter;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/",
  (req, res, next) => {
    try {
      const fighters = fighterService.getAll();
      res.data = fighters;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const result = fighterService.delete(req.params.id);
      if (!result) {
        throw new Error("Fighter not found");
      }
      res.data = { message: "Fighter deleted successfully" };
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
