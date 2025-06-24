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
      { name: "Teresa Oyhambure", title: "Representante", organization: "CFI" },
      { name: "Marcelo Pérez", title: "Responsable y coordinador del equipo apícola", organization: "CFI" },
      { name: "Rodrigo Cerminara", title: "Especialista en Desarrollo Juvenil", organization: "Sector Productivo" },
      { name: "Antonio Fabro", title: "Productor de material vivo, ex-docente", organization: "Sector Apícola" },
      { name: "Marilina Beltramo", title: "Presidenta", organization: "Federación de Centros Juveniles región central" },
      { name: "Jorge Lanza", title: "Productor apícola", organization: "Provincia de Buenos Aires" },
      { name: "Rodolfo Nicolás Bringas", title: "Productor apícola", organization: "Villa de Soto" },
      { name: "Ezequiel Fabro", title: "Productor apícola", organization: "Malabrigo, Santa Fe" },
      { name: "Martín Colombani", title: "Apicultor", organization: "Sector Productivo" },
      { name: "Nicolás Fioretti", title: "Docente", organization: "Sector Educativo" },
      { name: "Melisa Geisa", title: "Moderadora", organization: "Equipo Organizador" }
    ];

    speakersData.forEach(speaker => {
      const id = this.currentSpeakerId++;
      this.speakers.set(id, { ...speaker, id, bio: "", avatar: "" });
    });

    // Initialize rooms
    const roomsData = [
      { name: "Auditorio Principal", capacity: 300, description: "Sala principal para conferencias y talleres" },
      { name: "Sala de Talleres", capacity: 80, description: "Sala para talleres prácticos y actividades grupales" },
      { name: "Sala de Conferencias", capacity: 150, description: "Sala para conferencias especializadas" },
      { name: "Hall de Recepción", capacity: 500, description: "Área de acreditación y recepción de participantes" },
      { name: "Sala de Reuniones", capacity: 40, description: "Sala para reuniones y actividades específicas" }
    ];

    roomsData.forEach(room => {
      const id = this.currentRoomId++;
      this.rooms.set(id, { ...room, id });
    });

    // Initialize activities - Programa real del 3er Encuentro Federal Apícola
    const activitiesData = [
      // Day 1 - Jueves 10 de Julio
      {
        title: "Acreditación y Recepción",
        description: "Registro de participantes y entrega de materiales del evento.",
        type: "registracion",
        day: 1,
        startTime: "15:00",
        endTime: "15:30",
        roomId: 4,
        speakerId: null,
        capacity: 300,
        requiresRegistration: false,
        tags: ["acreditación", "registro"]
      },
      {
        title: "Apertura - Inicio Taller",
        description: "Palabras de bienvenida!! Comentarios a la validación del diagnóstico en territorio del equipo apícola del CFI en relación a la integración generacional.",
        type: "conferencia",
        day: 1,
        startTime: "15:30",
        endTime: "15:45",
        roomId: 1,
        speakerId: 1,
        capacity: 300,
        requiresRegistration: false,
        tags: ["apertura", "bienvenida", "integración-generacional"]
      },
      {
        title: "La participación de jóvenes en actividades productivas. Tendencias y desafíos",
        description: "Rodrigo Cerminara: La situación actual de los jóvenes y su vinculación con proyectos productivos",
        type: "conferencia",
        day: 1,
        startTime: "15:50",
        endTime: "16:05",
        roomId: 1,
        speakerId: 3,
        capacity: 300,
        requiresRegistration: false,
        tags: ["jóvenes", "productividad", "tendencias"]
      },
      {
        title: "La importancia de la integración generacional en la apicultura",
        description: "Antonio Fabro: La importancia de la integración generacional en la apicultura. Desafíos de los jóvenes en emprendimientos productivos.",
        type: "conferencia",
        day: 1,
        startTime: "16:05",
        endTime: "16:20",
        roomId: 1,
        speakerId: 4,
        capacity: 300,
        requiresRegistration: false,
        tags: ["integración-generacional", "emprendimientos", "desafíos"]
      },
      {
        title: "Líder, se nace o se hace?",
        description: "La importancia de la integración de jóvenes en la apicultura",
        type: "conferencia",
        day: 1,
        startTime: "16:30",
        endTime: "17:00",
        roomId: 1,
        speakerId: 5,
        capacity: 300,
        requiresRegistration: false,
        tags: ["liderazgo", "jóvenes", "integración"]
      },
      {
        title: "Casos de Éxito - Jóvenes apícolas de la región central",
        description: "Casos exitosos de jóvenes productores apícolas de Balcarce, Villa de Soto y Santa Fe",
        type: "panel",
        day: 1,
        startTime: "17:15",
        endTime: "17:45",
        roomId: 1,
        speakerId: 6,
        capacity: 300,
        requiresRegistration: false,
        tags: ["casos-éxito", "jóvenes", "región-central"]
      },
      {
        title: "Espacio de Preguntas y Propuestas",
        description: "Intercambio y participación del público con preguntas y propuestas.",
        type: "panel",
        day: 1,
        startTime: "17:45",
        endTime: "18:00",
        roomId: 1,
        speakerId: null,
        capacity: 300,
        requiresRegistration: false,
        tags: ["preguntas", "propuestas", "participación"]
      },
      {
        title: "Taller: Nuevo paradigma productivo. Tendencias y desafíos en el sector",
        description: "Los productores proponen la consigna disparadora y se reflexiona con los jóvenes apicultores. Conclusiones. Metodología: los jóvenes contestarán la consigna, se listarán en pantalla sus respuestas y se trabajará sobre el abordaje de las mismas.",
        type: "taller",
        day: 1,
        startTime: "18:00",
        endTime: "18:40",
        roomId: 1,
        speakerId: 9,
        capacity: 300,
        requiresRegistration: false,
        tags: ["taller", "paradigma-productivo", "reflexión"]
      },
      {
        title: "Cierre y Conclusiones",
        description: "Conclusiones del primer día del evento.",
        type: "conferencia",
        day: 1,
        startTime: "18:40",
        endTime: "18:50",
        roomId: 1,
        speakerId: null,
        capacity: 300,
        requiresRegistration: false,
        tags: ["cierre", "conclusiones"]
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
