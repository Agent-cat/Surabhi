import Event from "../models/events.model.js";

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate(
      "Events.registeredStudents",
      "fullName college collegeId email termsandconditions"
    );
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "Events.registeredStudents",
      "fullName college collegeId email termsandconditions"
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(
      "Events.registeredStudents",
      "fullName college collegeId email termsandconditions"
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this new function
export const registerForEvent = async (req, res) => {
  try {
    const { categoryId, eventId } = req.params;
    const userId = req.user._id; // You'll need to add authentication middleware

    const event = await Event.findById(categoryId);
    if (!event) {
      return res.status(404).json({ message: "Category not found" });
    }

    const specificEvent = event.Events.id(eventId);
    if (!specificEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (specificEvent.registeredStudents.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    specificEvent.registeredStudents.push(userId);
    await event.save();

    res.status(200).json({ message: "Successfully registered for event" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEventInCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Event.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.Events.push({
      title: req.body.title,
      details: req.body.details,
      image: req.body.image,
      termsandconditions: req.body.termsandconditions,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEventInCategory = async (req, res) => {
  try {
    const { categoryId, eventId } = req.params;
    const category = await Event.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const event = category.Events.id(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = req.body.title;
    event.details = req.body.details;
    event.image = req.body.image;
    event.termsandconditions = req.body.termsandconditions;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add this new controller function
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category already exists
    const existingCategory = await Event.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Event({
      categoryName,
      Events: [],
    });

    const savedCategory = await newCategory.save();
    console.log("Category saved:", savedCategory); // Debug log

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(400).json({ message: error.message });
  }
};

// Optional: Add delete category functionality
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Event.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
