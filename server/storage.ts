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
      { name: "Teresa Oyhambure", title: "Representante", organization: "CFI", bio: "Representante del Consejo Federal de Inversiones." },
      { name: "Marcelo Pérez", title: "Responsable y coordinador del equipo apícola", organization: "CFI", bio: "Responsable y coordinador del equipo apícola del CFI." },
      { name: "Rodrigo Cerminara", title: "Especialista en Desarrollo Juvenil", organization: "Sector Productivo", bio: "Especialista en Desarrollo Juvenil del sector productivo." },
      { name: "Antonio Fabro", title: "Productor de material vivo, ex-docente", organization: "Sector Apícola", bio: "Productor de material vivo y ex-docente del sector apícola." },
      { name: "Marilina Beltramo", title: "Presidenta", organization: "Federación de Centros Juveniles región central", bio: "Presidenta de la Federación de Centros Juveniles de la región central." },
      { name: "Jorge Lanza", title: "Productor apícola", organization: "Provincia de Buenos Aires", bio: "Productor apícola de la Provincia de Buenos Aires." },
      { name: "Rodolfo Nicolás Bringas", title: "Productor apícola", organization: "Villa de Soto", bio: "Productor apícola de Villa de Soto." },
      { name: "Ezequiel Fabro", title: "Productor apícola", organization: "Malabrigo, Santa Fe", bio: "Productor apícola de Malabrigo, Santa Fe." },
      { name: "Martín Colombani", title: "Apicultor", organization: "Sector Productivo", bio: "Apicultor del sector productivo." },
      { name: "Nicolás Fioretti", title: "Docente", organization: "Sector Educativo", bio: "Docente del sector educativo." },
      { name: "Melisa Geisa", title: "Moderadora", organization: "Equipo Organizador", bio: "Moderadora del equipo organizador." },
      { name: "Daniel Vieytes", title: "Asesor", organization: "Ministerio de Bioagroindustria", bio: "Asesor especializado del Ministerio de Bioagroindustria de la Provincia de Córdoba." },
      
      // Day 2 speakers  
      { name: "Martín Llaryora", title: "Gobernador", organization: "Provincia de Córdoba", bio: "Gobernador de la Provincia de Córdoba." },
      { name: "Ignacio Lamothe", title: "Secretario General", organization: "Gobierno de Córdoba", bio: "Secretario General del Gobierno de Córdoba." },
      { name: "Monica Odstrcil", title: "Funcionaria", organization: "Gobierno de Tucumán", bio: "Especialista en innovación tecnológica en apicultura tucumana e identificación de zonas óptimas mediante análisis geoespacial." },
      { name: "Emanuel Canales Fuenzalida", title: "Productor y Especialista Apícola", organization: "Chile", bio: "Productor y especialista apícola de Chile, experto en apicultura regenerativa y determinación de estándares de calidades de mieles." },
      { name: "Martin Colombani", title: "Docente y Productor", organization: "Sector Apícola", bio: "Docente y productor especializado en estrategia sanitaria regional como sello de calidad sostenible." },
      { name: "Carolina Ulla", title: "CEO", organization: "AeroSustentable SAS", bio: "CEO de AeroSustentable SAS, especialista en sustentabilidad y liderazgo en apicultura." },
      { name: "Martin Girodo", title: "Productor", organization: "Nueva Zelanda", bio: "Productor de miel de Manuka en Nueva Zelanda, experto en diversificación continua como estrategia sustentable de valor." },
      { name: "Pablo Callieri", title: "CEO", organization: "Agro Catamarca S.A.", bio: "CEO de Agro Catamarca S.A., especialista en agregado de valor y conservación ambiental. Caso de éxito: Miel de Yunga." },
      { name: "Gabriela Tamaño", title: "Docente e Investigadora", organization: "Universidad", bio: "Docente e investigadora universitaria especializada en caracterización y diferenciación de mieles como estrategia de valoración." },
      { name: "Teresa Oyhamburu", title: "Directora de Programas", organization: "CFI", bio: "Directora de Programas del Consejo Federal de Inversiones (CFI)." }
    ];

    speakersData.forEach(speaker => {
      const id = this.currentSpeakerId++;
      this.speakers.set(id, { ...speaker, id, avatar: null });
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
      this.rooms.set(id, { ...room, id, description: room.description || null });
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
      },

      // Day 2 activities (Friday July 11, 2025)
      {
        title: "Acreditación y Recepción",
        description: "Registro de participantes y entrega de material del evento.",
        type: "registro",
        day: 2,
        startTime: "09:30",
        endTime: "10:30",
        roomId: 1,
        speakerId: null,
        capacity: 300,
        requiresRegistration: false,
        tags: ["registro", "bienvenida"]
      },
      {
        title: "Apertura Institucional",
        description: "Inicio de la Jornada Técnica con autoridades provinciales.",
        type: "ceremonia",
        day: 2,
        startTime: "10:30",
        endTime: "11:00",
        roomId: 1,
        speakerId: 15,
        capacity: 300,
        requiresRegistration: false,
        tags: ["apertura", "autoridades", "ceremonial"]
      },
      {
        title: "Innovación Tecnológica y Productiva - Bloque 1",
        description: "La importancia de la Inteligencia Artificial (IA) y el uso de nuevas tecnologías aplicadas a desarrollos apícolas. Incluye innovación tecnológica en apicultura tucumana, polinización en sistemas productivos y plataforma de gestión integral.",
        type: "conferencia",
        day: 2,
        startTime: "11:00",
        endTime: "11:45",
        roomId: 1,
        speakerId: 16,
        capacity: 300,
        requiresRegistration: true,
        tags: ["tecnología", "inteligencia artificial", "innovación", "polinización"]
      },
      {
        title: "Innovación Tecnológica y Productiva - Bloque 2",
        description: "Apicultura regenerativa en la región. Casos de éxito: proyecciones y desafíos. Incluye determinación de estándares de calidades de mieles y paisajes y corredores biológicos en Córdoba.",
        type: "conferencia",
        day: 2,
        startTime: "11:45",
        endTime: "12:15",
        roomId: 1,
        speakerId: 17,
        capacity: 300,
        requiresRegistration: true,
        tags: ["apicultura regenerativa", "calidad", "biodiversidad", "chile"]
      },
      {
        title: "Innovación Organizacional - Bloque 1",
        description: "Innovación organizacional en grupo de productores y cooperativas. Estrategia sanitaria regional como sello de calidad sostenible y el poder del trabajo colectivo en consorcios apícolas.",
        type: "panel",
        day: 2,
        startTime: "12:20",
        endTime: "13:00",
        roomId: 1,
        speakerId: 18,
        capacity: 300,
        requiresRegistration: true,
        tags: ["cooperativas", "organización", "trabajo colectivo", "calidad"]
      },
      {
        title: "Innovación Organizacional - Bloque 2",
        description: "Sustentabilidad y liderazgo en apicultura. La importancia de la sustentabilidad y herramientas estratégicas para el desarrollo productivo.",
        type: "conferencia",
        day: 2,
        startTime: "14:00",
        endTime: "14:20",
        roomId: 1,
        speakerId: 19,
        capacity: 300,
        requiresRegistration: true,
        tags: ["sustentabilidad", "liderazgo", "desarrollo productivo"]
      },
      {
        title: "Estrategias Comerciales y Valor Agregado - Bloque 1",
        description: "Certificación de mieles como oportunidad de diferenciación. Miel de Manuka y diversificación continua como estrategia sustentable de valor. Incluye caso de éxito de Identificación Geográfica (IG).",
        type: "panel",
        day: 2,
        startTime: "14:30",
        endTime: "15:00",
        roomId: 1,
        speakerId: 20,
        capacity: 300,
        requiresRegistration: true,
        tags: ["certificación", "manuka", "identificación geográfica", "diferenciación"]
      },
      {
        title: "Estrategias Comerciales y Valor Agregado - Bloque 2",
        description: "Mieles regionales diferenciadas. Agregado de valor y conservación ambiental con casos de éxito: Miel de Yunga, Miel de Flores de Altamisqui y Miel de Azahar de Limón.",
        type: "panel",
        day: 2,
        startTime: "15:00",
        endTime: "15:45",
        roomId: 1,
        speakerId: 21,
        capacity: 300,
        requiresRegistration: true,
        tags: ["mieles regionales", "valor agregado", "conservación", "yunga", "chaco"]
      },
      {
        title: "Charla TED: Caracterización y Diferenciación de Mieles",
        description: "Caracterización y diferenciación de mieles como estrategia de valoración. Diferencia entre diferenciación y calidad, en el marco de la adulteración.",
        type: "charla especial",
        day: 2,
        startTime: "15:45",
        endTime: "16:00",
        roomId: 1,
        speakerId: 22,
        capacity: 300,
        requiresRegistration: true,
        tags: ["TED", "caracterización", "diferenciación", "calidad", "adulteración"]
      },
      {
        title: "Fortalecimiento Institucional",
        description: "Acciones para el fortalecimiento del sector apícola. Presentación de Lineamientos CFI para el sector apícola, validación e implementación de acciones de fomento.",
        type: "presentación institucional",
        day: 2,
        startTime: "16:30",
        endTime: "17:00",
        roomId: 1,
        speakerId: null,
        capacity: 300,
        requiresRegistration: false,
        tags: ["CFI", "lineamientos", "fomento", "institucional"]
      },
      {
        title: "Cierre y Conclusiones",
        description: "Conclusiones del 3° Encuentro Federal Apícola. Presentación de conclusiones finales con autoridades ministeriales.",
        type: "cierre",
        day: 2,
        startTime: "17:00",
        endTime: "17:30",
        roomId: 1,
        speakerId: 23,
        capacity: 300,
        requiresRegistration: false,
        tags: ["conclusiones", "cierre", "autoridades"]
      }
    ];

    activitiesData.forEach(activity => {
      const id = this.currentActivityId++;
      this.activities.set(id, { 
        ...activity, 
        id, 
        enrolled: 0,
        capacity: activity.capacity || null,
        roomId: activity.roomId || null,
        speakerId: activity.speakerId || null,
        requiresRegistration: activity.requiresRegistration || null,
        tags: activity.tags || null
      });
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
