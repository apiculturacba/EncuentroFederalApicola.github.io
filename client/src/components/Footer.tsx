import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Event Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">3er Encuentro Federal Apícola</h3>
            <p className="text-gray-300 mb-4">
              El evento más importante de apicultura del país, reuniendo a productores, especialistas y jóvenes del sector.
            </p>
            <p className="text-sm text-gray-400">
              10-11 Julio 2025 | Centro de Convenciones, Córdoba Capital
            </p>
          </div>
          
          {/* Logo CFI */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Organizado por</h4>
            <div className="w-32 h-20 flex items-center justify-center">
              <img 
                src="/logo-cfi.png" 
                alt="Consejo Federal de Inversiones" 
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Logo Ministerio - Más prominente */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Con el apoyo de</h4>
            <div className="w-40 h-24 flex items-center justify-center">
              <img 
                src="/logo-ministerio.jpg" 
                alt="Ministerio de Bioagroindustria - Gobierno de Córdoba" 
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-gray-300">
              <p>+54 9 3518 07-2572</p>
              <p>+54 9 3516 66-7756</p>
              <p>apicolacba@gmail.com</p>
              <p>biodesarrollominbai@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 3er Encuentro Federal Apícola. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
