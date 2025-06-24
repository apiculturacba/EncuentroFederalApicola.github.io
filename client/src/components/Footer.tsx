import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Event Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-honey-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9C9 10.1 9.9 11 11 11V13C11 14.1 11.9 15 13 15H15C16.1 15 17 14.1 17 13V11C18.1 11 19 10.1 19 9Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">3er Encuentro Federal Apícola</h3>
            </div>
            <p className="text-gray-300 mb-4">
              El evento más importante de apicultura en Argentina. Conectando a productores, investigadores y entusiastas de la apicultura.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-honey-400 transition-colors">Programa completo</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Lista de ponentes</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Inscripciones</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Alojamiento</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Patrocinadores</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-honey-400 transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-honey-400 transition-colors">Política de privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Encuentro Federal Apícola. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
