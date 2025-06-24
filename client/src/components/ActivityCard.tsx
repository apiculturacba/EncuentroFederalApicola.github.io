import { ActivityWithDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Wrench, 
  Store, 
  Users, 
  IdCard, 
  Clock,
  MapPin,
  User
} from "lucide-react";

interface ActivityCardProps {
  activity: ActivityWithDetails;
}

const typeIcons = {
  conferencia: Mic,
  taller: Wrench,
  exposicion: Store,
  panel: Users,
  certificacion: IdCard,
};

const typeColors = {
  conferencia: "bg-purple-100 text-purple-800",
  taller: "bg-nature-100 text-nature-800",
  exposicion: "bg-honey-100 text-honey-800",
  panel: "bg-blue-100 text-blue-800",
  certificacion: "bg-orange-100 text-orange-800",
};

const typeIconColors = {
  conferencia: "bg-purple-100 text-purple-600",
  taller: "bg-nature-100 text-nature-600",
  exposicion: "bg-honey-100 text-honey-600",
  panel: "bg-blue-100 text-blue-600",
  certificacion: "bg-orange-100 text-orange-600",
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const IconComponent = typeIcons[activity.type as keyof typeof typeIcons] || Mic;
  const typeColor = typeColors[activity.type as keyof typeof typeColors] || typeColors.conferencia;
  const iconColor = typeIconColors[activity.type as keyof typeof typeIconColors] || typeIconColors.conferencia;

  const getCapacityStatus = () => {
    if (!activity.capacity || !activity.requiresRegistration) return null;
    
    const enrolled = activity.enrolled || 0;
    const capacity = activity.capacity;
    const percentage = (enrolled / capacity) * 100;
    
    if (percentage >= 90) {
      return <Badge variant="destructive" className="text-xs">Casi lleno</Badge>;
    } else if (percentage >= 70) {
      return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">{enrolled}/{capacity} cupos</Badge>;
    } else {
      return <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Disponible</Badge>;
    }
  };

  const formatType = (type: string) => {
    const types = {
      conferencia: "Conferencia",
      taller: "Taller",
      exposicion: "Exposición",
      panel: "Panel",
      certificacion: "Certificación",
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <Badge className={`text-xs px-2 py-1 rounded-full font-medium ${typeColor}`}>
              {formatType(activity.type)}
            </Badge>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {activity.startTime} - {activity.endTime}
            </div>
            {activity.room && (
              <div className="flex items-center justify-end mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {activity.room.name}
              </div>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {activity.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {activity.speaker ? (
              <>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{activity.speaker.name}</div>
                  <div className="text-xs text-gray-500">{activity.speaker.organization}</div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {activity.type === "exposicion" ? "30+ expositores" : "Información disponible"}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {getCapacityStatus()}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-honey-600 hover:text-honey-700 text-sm font-medium"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
