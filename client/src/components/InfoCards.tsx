import { MapPin, Clock, Mail, Phone, Bed, ExternalLink } from "lucide-react";

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      
      {/* Location Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mr-3">
            <MapPin className="text-nature-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Ubicación</h3>
        </div>
        <p className="text-gray-600 mb-3">Centro de Convenciones</p>
        <p className="text-sm text-gray-500 mb-4">Complejo Ferial - Córdoba Capital</p>
        <a 
          href="https://maps.app.goo.gl/poF8XpgTSUqiaRfK9" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-nature-600 hover:text-nature-700 font-medium text-sm flex items-center"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Ver en Google Maps
        </a>
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
            <span>Jueves 10:</span>
            <span className="font-medium">9:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span>Viernes 11:</span>
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
            <span>+54 9 3518 07-2572</span>
          </div>
          <div className="flex items-center">
            <Phone className="text-gray-400 mr-2 w-4 h-4" />
            <span>+54 9 3516 66-7756</span>
          </div>
          <div className="flex items-center">
            <Mail className="text-gray-400 mr-2 w-4 h-4" />
            <span>apicolacba@gmail.com</span>
          </div>
          <div className="flex items-center">
            <Mail className="text-gray-400 mr-2 w-4 h-4" />
            <span>biodesarrollominbai@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Accommodation Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-3">
            <Bed className="text-orange-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Alojamiento</h3>
        </div>
        <p className="text-gray-600 mb-4">Encuentra hoteles y alojamientos cercanos al evento en Córdoba Capital.</p>
        <a 
          href="https://www.google.com/maps/search/hoteles+cerca+de+Complejo+Ferial+Córdoba+Capital/@-31.4173391,-64.1924976,15z" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Buscar hoteles cercanos
        </a>
      </div>
    </div>
  );
}
