import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching activities" });
    }
  });

  // Get activities by day
  app.get("/api/activities/day/:day", async (req, res) => {
    try {
      const day = parseInt(req.params.day);
      if (isNaN(day) || day < 1 || day > 3) {
        return res.status(400).json({ message: "Invalid day parameter" });
      }
      const activities = await storage.getActivitiesByDay(day);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching activities by day" });
    }
  });

  // Search activities
  app.get("/api/activities/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const activities = await storage.searchActivities(query);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error searching activities" });
    }
  });

  // Filter activities
  app.get("/api/activities/filter", async (req, res) => {
    try {
      const type = req.query.type as string;
      const roomId = req.query.roomId ? parseInt(req.query.roomId as string) : undefined;
      
      const activities = await storage.filterActivities(type, roomId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error filtering activities" });
    }
  });

  // Get all speakers
  app.get("/api/speakers", async (req, res) => {
    try {
      const speakers = await storage.getSpeakers();
      res.json(speakers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching speakers" });
    }
  });

  // Get all rooms
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Error fetching rooms" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
