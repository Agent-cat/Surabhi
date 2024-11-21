import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
} from "../controllers/events.controller.js";

const router = express.Router();

// Create a new event
router.post("/", createEvent);

// Get all events
router.get("/", getAllEvents);

// Get a single event by ID
router.get("/:id", getEventById);

// Update an event
router.put("/:id", updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

// Register for an event
router.put("/:id/register", registerForEvent);

export default router;
