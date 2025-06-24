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

    // Initialize activities
    const activitiesData = [
      // Day 1
      {
        title: "Innovaciones en Manejo de Colmenas: Tecnología y Tradición",
        description: "Exploramos las últimas tecnologías aplicadas a la apicultura moderna, desde sensores IoT hasta técnicas tradicionales mejoradas.",
        type: "conferencia",
        day: 1,
        startTime: "09:00",
        endTime: "10:00",
        roomId: 1,
        speakerId: 1,
        capacity: 300,
        requiresRegistration: false,
        tags: ["tecnología", "innovación", "manejo"]
      },
      {
        title: "Construcción de Colmenas Sustentables",
        description: "Taller práctico sobre construcción de colmenas usando materiales locales y técnicas ecológicas. Incluye kit de herramientas.",
        type: "taller",
        day: 1,
        startTime: "10:30",
        endTime: "12:00",
        roomId: 2,
        speakerId: 2,
        capacity: 25,
        enrolled: 20,
        requiresRegistration: true,
        tags: ["construcción", "sustentabilidad", "práctico"]
      },
      {
        title: "Feria de Productos Apícolas y Equipamiento",
        description: "Exposición comercial con los mejores productos de miel, equipos para apicultura y derivados apícolas de todo el país.",
        type: "exposicion",
        day: 1,
        startTime: "14:00",
        endTime: "18:00",
        roomId: 4,
        speakerId: 5,
        capacity: 500,
        requiresRegistration: false,
        tags: ["comercial", "productos", "equipamiento"]
      },
      {
        title: "Desafíos del Cambio Climático en la Apicultura",
        description: "Mesa redonda con expertos internacionales sobre adaptación de la apicultura a los nuevos escenarios climáticos.",
        type: "panel",
        day: 1,
        startTime: "15:30",
        endTime: "17:00",
        roomId: 1,
        speakerId: 4,
        capacity: 300,
        requiresRegistration: false,
        tags: ["clima", "adaptación", "sustentabilidad"]
      },
      {
        title: "Plantas Melíferas: Identificación y Cultivo",
        description: "Aprende a identificar y cultivar las mejores plantas para la producción de miel en diferentes regiones del país.",
        type: "taller",
        day: 1,
        startTime: "17:30",
        endTime: "19:00",
        roomId: 3,
        speakerId: 3,
        capacity: 60,
        enrolled: 45,
        requiresRegistration: true,
        tags: ["plantas", "cultivo", "botanica"]
      },
      {
        title: "Certificación en Buenas Prácticas Apícolas",
        description: "Examen para obtener certificación oficial en buenas prácticas apícolas. Válido para registro sanitario.",
        type: "certificacion",
        day: 1,
        startTime: "19:30",
        endTime: "20:30",
        roomId: 5,
        speakerId: 6,
        capacity: 40,
        enrolled: 35,
        requiresRegistration: true,
        tags: ["certificacion", "buenas-practicas", "sanitario"]
      },
      // Day 2
      {
        title: "Genética Apícola y Mejoramiento de Razas",
        description: "Conferencia sobre técnicas avanzadas de mejoramiento genético en abejas para mayor productividad y resistencia.",
        type: "conferencia",
        day: 2,
        startTime: "09:00",
        endTime: "10:30",
        roomId: 1,
        speakerId: 1,
        capacity: 300,
        requiresRegistration: false,
        tags: ["genetica", "mejoramiento", "razas"]
      },
      {
        title: "Procesamiento y Control de Calidad de Miel",
        description: "Taller práctico sobre técnicas de procesamiento, análisis fisicoquímico y control de calidad de productos apícolas.",
        type: "taller",
        day: 2,
        startTime: "11:00",
        endTime: "13:00",
        roomId: 2,
        speakerId: 6,
        capacity: 25,
        enrolled: 22,
        requiresRegistration: true,
        tags: ["procesamiento", "calidad", "análisis"]
      },
      {
        title: "Marketing Digital para Apicultores",
        description: "Estrategias de marketing digital, comercio electrónico y branding para pequeños y medianos productores apícolas.",
        type: "conferencia",
        day: 2,
        startTime: "14:00",
        endTime: "15:30",
        roomId: 1,
        speakerId: 5,
        capacity: 300,
        requiresRegistration: false,
        tags: ["marketing", "digital", "comercialización"]
      },
      // Day 3
      {
        title: "Polinización y Servicios Ecosistémicos",
        description: "Importancia de la polinización en la agricultura y conservación de ecosistemas. Valoración económica de servicios apícolas.",
        type: "conferencia",
        day: 3,
        startTime: "09:30",
        endTime: "11:00",
        roomId: 1,
        speakerId: 3,
        capacity: 300,
        requiresRegistration: false,
        tags: ["polinización", "ecosistemas", "agricultura"]
      },
      {
        title: "Sanidad Apícola y Prevención de Enfermedades",
        description: "Protocolo de prevención y tratamiento de las principales enfermedades que afectan las colmenas.",
        type: "taller",
        day: 3,
        startTime: "11:30",
        endTime: "13:00",
        roomId: 2,
        speakerId: 6,
        capacity: 25,
        enrolled: 18,
        requiresRegistration: true,
        tags: ["sanidad", "enfermedades", "prevencion"]
      },
      {
        title: "Clausura y Perspectivas Futuras",
        description: "Ceremonia de clausura con síntesis de conclusiones y perspectivas para el desarrollo de la apicultura nacional.",
        type: "conferencia",
        day: 3,
        startTime: "16:00",
        endTime: "17:30",
        roomId: 1,
        speakerId: 1,
        capacity: 300,
        requiresRegistration: false,
        tags: ["clausura", "perspectivas", "desarrollo"]
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
