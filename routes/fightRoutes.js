import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { fighter1Id, fighter2Id } = req.body;
    const fight = await fightersService.simulateFight(fighter1Id, fighter2Id);
    res.json(fight);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
});

router.get("/", (req, res) => {
  const fights = fightersService.getAllFights();
  res.json(fights);
});

router.get("/:id", (req, res) => {
  try {
    const fight = fightersService.getFightById(req.params.id);
    res.json(fight);
  } catch (err) {
    res.status(404).json({ error: true, message: err.message });
  }
});

export { router };
