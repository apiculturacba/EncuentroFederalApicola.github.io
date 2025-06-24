import { useState } from "react";
import { Menu, X, FileText, ExternalLink, MapPin, Phone } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contacto');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUbicacionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://maps.app.goo.gl/poF8XpgTSUqiaRfK9', '_blank');
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-honey-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            {/* Logo CFI */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border">
              <span className="text-xs text-gray-400 text-center">Logo CFI</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">3er Encuentro Federal Apícola</h1>
              <p className="text-sm text-gray-600">10-11 Julio 2025 | Córdoba Capital</p>
            </div>

            {/* Logo Ministerio */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border">
              <span className="text-xs text-gray-400 text-center">Logo Ministerio</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#actividades" className="text-gray-700 hover:text-honey-600 font-medium transition-colors">
              Programa
            </a>
            <a 
              href="/programa-completo.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-honey-600 font-medium transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              Programa Completo
            </a>
            <a 
              href="https://forms.gle/nN4p1kR9rnwWmThr8" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-honey-600 font-medium transition-colors flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Inscripción
            </a>
            <button 
              onClick={handleUbicacionClick}
              className="text-gray-700 hover:text-honey-600 font-medium transition-colors flex items-center"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Ubicación
            </button>
            <button 
              onClick={handleContactClick}
              className="text-gray-700 hover:text-honey-600 font-medium transition-colors flex items-center"
            >
              <Phone className="w-4 h-4 mr-1" />
              Contacto
            </button>
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
              <a href="#actividades" className="text-gray-700 hover:text-honey-600 font-medium">
                Programa
              </a>
              <a 
                href="/programa-completo.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-honey-600 font-medium"
              >
                Programa Completo
              </a>
              <a 
                href="https://forms.gle/nN4p1kR9rnwWmThr8" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-honey-600 font-medium"
              >
                Inscripción
              </a>
              <button 
                onClick={handleUbicacionClick}
                className="text-gray-700 hover:text-honey-600 font-medium text-left"
              >
                Ubicación
              </button>
              <button 
                onClick={handleContactClick}
                className="text-gray-700 hover:text-honey-600 font-medium text-left"
              >
                Contacto
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
