import { ActivityWithDetails } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Clock,
  MapPin,
  User,
  Users,
  Mic,
  Wrench,
  Store,
  IdCard
} from "lucide-react";

interface ActivityDetailModalProps {
  activity: ActivityWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons = {
  conferencia: Mic,
  taller: Wrench,
  exposicion: Store,
  panel: Users,
  certificacion: IdCard,
  registracion: User,
};

const typeColors = {
  conferencia: "bg-purple-100 text-purple-800",
  taller: "bg-nature-100 text-nature-800",
  exposicion: "bg-honey-100 text-honey-800",
  panel: "bg-blue-100 text-blue-800",
  certificacion: "bg-orange-100 text-orange-800",
  registracion: "bg-gray-100 text-gray-800",
};

const formatType = (type: string) => {
  const types = {
    conferencia: "Conferencia",
    taller: "Taller",
    exposicion: "Exposición",
    panel: "Panel",
    certificacion: "Certificación",
    registracion: "Registro",
  };
  return types[type as keyof typeof types] || type;
};

// Datos de moderadores por actividad
const getModerator = (activityTitle: string) => {
  const moderators = {
    "La participación de jóvenes en actividades productivas. Tendencias y desafíos": {
      name: "Marcelo Pérez",
      title: "Responsable y coordinador del equipo apícola",
      organization: "CFI"
    },
    "Casos de Éxito - Jóvenes apícolas de la región central": {
      name: "Melisa Geisa",
      title: "Moderadora",
      organization: "Equipo Organizador"
    },
    "Taller: Nuevo paradigma productivo. Tendencias y desafíos en el sector": {
      name: "Martín Colombani y Nicolás Fioretti",
      title: "Apicultor y docente",
      organization: "Conducción del taller"
    }
  };
  
  return moderators[activityTitle as keyof typeof moderators];
};

export default function ActivityDetailModal({ activity, isOpen, onClose }: ActivityDetailModalProps) {
  if (!activity) return null;

  const IconComponent = typeIcons[activity.type as keyof typeof typeIcons] || Mic;
  const typeColor = typeColors[activity.type as keyof typeof typeColors] || typeColors.conferencia;
  const moderator = getModerator(activity.title);

  const getCapacityInfo = () => {
    if (!activity.capacity || !activity.requiresRegistration) return null;
    
    const enrolled = activity.enrolled || 0;
    const capacity = activity.capacity;
    const percentage = (enrolled / capacity) * 100;
    
    return {
      enrolled,
      capacity,
      percentage,
      available: capacity - enrolled
    };
  };

  const capacityInfo = getCapacityInfo();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-purple-100 text-purple-600`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-sm px-3 py-1 rounded-full font-medium ${typeColor}`}>
                  {formatType(activity.type)}
                </Badge>
                {capacityInfo && (
                  <Badge variant="secondary" className="text-sm">
                    {capacityInfo.enrolled}/{capacityInfo.capacity} participantes
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                {activity.title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{activity.startTime} - {activity.endTime}</span>
            </div>
            {activity.room && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{activity.room.name}</span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{activity.description}</p>
          </div>

          {/* Moderador */}
          {moderator && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Moderador</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-honey-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-honey-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{moderator.name}</div>
                    <div className="text-sm text-gray-600">{moderator.title}</div>
                    <div className="text-sm text-gray-500">{moderator.organization}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ponente */}
          {activity.speaker && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ponente</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-nature-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-nature-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.speaker.name}</div>
                    <div className="text-sm text-gray-600">{activity.speaker.title}</div>
                    <div className="text-sm text-gray-500">{activity.speaker.organization}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Información de capacidad */}
          {capacityInfo && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Información de participación</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{capacityInfo.capacity}</div>
                    <div className="text-sm text-gray-600">Capacidad total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{capacityInfo.enrolled}</div>
                    <div className="text-sm text-gray-600">Inscriptos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{capacityInfo.available}</div>
                    <div className="text-sm text-gray-600">Disponibles</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${capacityInfo.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-1">
                    {capacityInfo.percentage.toFixed(1)}% ocupado
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sala información */}
          {activity.room && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ubicación</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">{activity.room.name}</div>
                    <div className="text-sm text-gray-600">Capacidad: {activity.room.capacity} personas</div>
                    {activity.room.description && (
                      <div className="text-sm text-gray-500">{activity.room.description}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Temas</h3>
              <div className="flex flex-wrap gap-2">
                {activity.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}