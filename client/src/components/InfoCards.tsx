import { MapPin, Clock, Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      
      {/* Location Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mr-3">
            <MapPin className="text-nature-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Ubicación</h3>
        </div>
        <p className="text-gray-600 mb-3">Centro de Convenciones Buenos Aires</p>
        <p className="text-sm text-gray-500 mb-4">Av. Figueroa Alcorta 2275, C1425CLA CABA</p>
        <button className="text-nature-600 hover:text-nature-700 font-medium text-sm flex items-center">
          <ExternalLink className="w-3 h-3 mr-1" />
          Ver en Google Maps
        </button>
      </div>

      {/* Schedule Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-honey-100 rounded-full flex items-center justify-center mr-3">
            <Clock className="text-honey-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Horarios</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Viernes:</span>
            <span className="font-medium">9:00 - 20:30</span>
          </div>
          <div className="flex justify-between">
            <span>Sábado:</span>
            <span className="font-medium">8:30 - 21:00</span>
          </div>
          <div className="flex justify-between">
            <span>Domingo:</span>
            <span className="font-medium">9:00 - 18:00</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <Mail className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Contacto</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Phone className="text-gray-400 mr-2 w-4 h-4" />
            <span>+54 11 4567-8900</span>
          </div>
          <div className="flex items-center">
            <Mail className="text-gray-400 mr-2 w-4 h-4" />
            <span>info@encuentroapicola.com.ar</span>
          </div>
          <div className="flex items-center">
            <Globe className="text-gray-400 mr-2 w-4 h-4" />
            <span>www.encuentroapicola.com.ar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
