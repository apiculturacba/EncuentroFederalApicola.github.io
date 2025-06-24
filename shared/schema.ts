import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const speakers = pgTable("speakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
});

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  capacity: integer("capacity").notNull(),
  description: text("description"),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // conferencia, taller, exposicion, panel, certificacion
  day: integer("day").notNull(), // 1, 2, 3
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  roomId: integer("room_id").references(() => rooms.id),
  speakerId: integer("speaker_id").references(() => speakers.id),
  capacity: integer("capacity"),
  enrolled: integer("enrolled").default(0),
  requiresRegistration: boolean("requires_registration").default(false),
  tags: text("tags").array(),
});

export const insertSpeakerSchema = createInsertSchema(speakers).omit({
  id: true,
});

export const insertRoomSchema = createInsertSchema(rooms).omit({
  id: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  enrolled: true,
});

export type Speaker = typeof speakers.$inferSelect;
export type InsertSpeaker = z.infer<typeof insertSpeakerSchema>;

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type ActivityWithDetails = Activity & {
  speaker?: Speaker;
  room?: Room;
};
