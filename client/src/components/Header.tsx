import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-4 border-honey-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-honey-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9C9 10.1 9.9 11 11 11V13C11 14.1 11.9 15 13 15H15C16.1 15 17 14.1 17 13V11C18.1 11 19 10.1 19 9Z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">3er Encuentro Federal Apícola</h1>
              <p className="text-sm text-gray-600">10-11 Julio 2025 | Córdoba Capital</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#programa" className="text-gray-700 hover:text-honey-600 font-medium transition-colors">
              Programa
            </a>
            <a href="/image-viewer" className="text-gray-700 hover:text-honey-600 font-medium transition-colors">
              Programa Original
            </a>
            <a href="#ponentes" className="text-gray-700 hover:text-honey-600 font-medium transition-colors">
              Ponentes
            </a>
            <a href="#ubicacion" className="text-gray-700 hover:text-honey-600 font-medium transition-colors">
              Ubicación
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-honey-600 font-medium transition-colors">
              Contacto
            </a>
          </nav>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-gray-700 w-6 h-6" />
            ) : (
              <Menu className="text-gray-700 w-6 h-6" />
            )}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-6">
            <nav className="flex flex-col space-y-4">
              <a href="#programa" className="text-gray-700 hover:text-honey-600 font-medium">
                Programa
              </a>
              <a href="#ponentes" className="text-gray-700 hover:text-honey-600 font-medium">
                Ponentes
              </a>
              <a href="#ubicacion" className="text-gray-700 hover:text-honey-600 font-medium">
                Ubicación
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-honey-600 font-medium">
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
