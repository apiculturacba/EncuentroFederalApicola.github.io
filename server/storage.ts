import { speakers, rooms, activities, type Speaker, type Room, type Activity, type InsertSpeaker, type InsertRoom, type InsertActivity, type ActivityWithDetails } from "@shared/schema";

export interface IStorage {
  // Speakers
  getSpeakers(): Promise<Speaker[]>;
  getSpeaker(id: number): Promise<Speaker | undefined>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;

  // Rooms
  getRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;

  // Activities
  getActivities(): Promise<ActivityWithDetails[]>;
  getActivity(id: number): Promise<ActivityWithDetails | undefined>;
  getActivitiesByDay(day: number): Promise<ActivityWithDetails[]>;
  searchActivities(query: string): Promise<ActivityWithDetails[]>;
  filterActivities(type?: string, roomId?: number): Promise<ActivityWithDetails[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private speakers: Map<number, Speaker>;
  private rooms: Map<number, Room>;
  private activities: Map<number, Activity>;
  private currentSpeakerId: number;
  private currentRoomId: number;
  private currentActivityId: number;

  constructor() {
    this.speakers = new Map();
    this.rooms = new Map();
    this.activities = new Map();
    this.currentSpeakerId = 1;
    this.currentRoomId = 1;
    this.currentActivityId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize speakers
    const speakersData = [
      { name: "Dr. María González", title: "Directora de Investigación", organization: "Instituto Nacional de Apicultura" },
      { name: "Ing. Carlos Ruiz", title: "Especialista en Construcción", organization: "Cooperativa Los Algarrobos" },
      { name: "Dra. Ana Flores", title: "Profesora de Botánica", organization: "Universidad Nacional Agrícola" },
      { name: "Prof. Jorge Mendez", title: "Investigador Senior", organization: "CONICET" },
      { name: "Lic. Laura Vega", title: "Especialista en Marketing", organization: "MielArgentina" },
      { name: "Dr. Roberto Silva", title: "Veterinario Especialista", organization: "SENASA" }
    ];

    speakersData.forEach(speaker => {
      const id = this.currentSpeakerId++;
      this.speakers.set(id, { ...speaker, id, bio: "", avatar: "" });
    });

    // Initialize rooms
    const roomsData = [
      { name: "Auditorio Principal", capacity: 300, description: "Sala principal para conferencias magistrales" },
      { name: "Sala A", capacity: 80, description: "Sala para talleres y actividades prácticas" },
      { name: "Sala B", capacity: 60, description: "Sala para talleres especializados" },
      { name: "Patio de Exposiciones", capacity: 500, description: "Área abierta para exposiciones comerciales" },
      { name: "Sala de Certificación", capacity: 40, description: "Sala equipada para exámenes" }
    ];

    roomsData.forEach(room => {
      const id = this.currentRoomId++;
      this.rooms.set(id, { ...room, id });
    });

    // Initialize activities - Programa base del 3er Encuentro Federal Apícola
    const activitiesData = [
      // Day 1 - Jueves 10 de Julio
      {
        title: "Bienvenida y Apertura del Evento",
        description: "Ceremonia de inauguración del 3er Encuentro Federal Apícola con autoridades y organizadores.",
        type: "conferencia",
        day: 1,
        startTime: "09:00",
        endTime: "09:30",
        roomId: 1,
        speakerId: 1,
        capacity: 300,
        requiresRegistration: false,
        tags: ["inauguración", "bienvenida"]
      },
      {
        title: "Conferencia Magistral: Estado Actual de la Apicultura Argentina",
        description: "Análisis del panorama actual de la apicultura en Argentina, desafíos y oportunidades del sector.",
        type: "conferencia",
        day: 1,
        startTime: "09:30",
        endTime: "10:30",
        roomId: 1,
        speakerId: 2,
        capacity: 300,
        requiresRegistration: false,
        tags: ["panorama", "sector", "argentina"]
      },
      // Day 2 - Viernes 11 de Julio
      {
        title: "Taller de Manejo de Colmenas",
        description: "Técnicas prácticas para el manejo eficiente de colmenas y mejora de la productividad apícola.",
        type: "taller",
        day: 2,
        startTime: "09:00",
        endTime: "11:00",
        roomId: 2,
        speakerId: 3,
        capacity: 40,
        enrolled: 25,
        requiresRegistration: true,
        tags: ["manejo", "técnicas", "productividad"]
      },
      {
        title: "Mesa Redonda: Innovación en Productos Apícolas",
        description: "Discusión sobre nuevos productos y tendencias en la industria apícola nacional e internacional.",
        type: "panel",
        day: 2,
        startTime: "14:00",
        endTime: "16:00",
        roomId: 1,
        speakerId: 4,
        capacity: 300,
        requiresRegistration: false,
        tags: ["innovación", "productos", "tendencias"]
      }
    ];

    activitiesData.forEach(activity => {
      const id = this.currentActivityId++;
      this.activities.set(id, { ...activity, id, enrolled: activity.enrolled || 0 });
    });
  }

  private getActivityWithDetails(activity: Activity): ActivityWithDetails {
    return {
      ...activity,
      speaker: activity.speakerId ? this.speakers.get(activity.speakerId) : undefined,
      room: activity.roomId ? this.rooms.get(activity.roomId) : undefined,
    };
  }

  async getSpeakers(): Promise<Speaker[]> {
    return Array.from(this.speakers.values());
  }

  async getSpeaker(id: number): Promise<Speaker | undefined> {
    return this.speakers.get(id);
  }

  async createSpeaker(speaker: InsertSpeaker): Promise<Speaker> {
    const id = this.currentSpeakerId++;
    const newSpeaker: Speaker = { ...speaker, id };
    this.speakers.set(id, newSpeaker);
    return newSpeaker;
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(room: InsertRoom): Promise<Room> {
    const id = this.currentRoomId++;
    const newRoom: Room = { ...room, id };
    this.rooms.set(id, newRoom);
    return newRoom;
  }

  async getActivities(): Promise<ActivityWithDetails[]> {
    return Array.from(this.activities.values()).map(activity => 
      this.getActivityWithDetails(activity)
    );
  }

  async getActivity(id: number): Promise<ActivityWithDetails | undefined> {
    const activity = this.activities.get(id);
    return activity ? this.getActivityWithDetails(activity) : undefined;
  }

  async getActivitiesByDay(day: number): Promise<ActivityWithDetails[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.day === day)
      .map(activity => this.getActivityWithDetails(activity));
  }

  async searchActivities(query: string): Promise<ActivityWithDetails[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.activities.values())
      .filter(activity => {
        const speaker = activity.speakerId ? this.speakers.get(activity.speakerId) : undefined;
        return (
          activity.title.toLowerCase().includes(lowerQuery) ||
          activity.description.toLowerCase().includes(lowerQuery) ||
          activity.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
          speaker?.name.toLowerCase().includes(lowerQuery)
        );
      })
      .map(activity => this.getActivityWithDetails(activity));
  }

  async filterActivities(type?: string, roomId?: number): Promise<ActivityWithDetails[]> {
    return Array.from(this.activities.values())
      .filter(activity => {
        if (type && activity.type !== type) return false;
        if (roomId && activity.roomId !== roomId) return false;
        return true;
      })
      .map(activity => this.getActivityWithDetails(activity));
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const newActivity: Activity = { ...activity, id, enrolled: 0 };
    this.activities.set(id, newActivity);
    return newActivity;
  }
}

export const storage = new MemStorage();
