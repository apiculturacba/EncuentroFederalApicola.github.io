export default function Hero() {
  const scrollToProgram = () => {
    const programSection = document.getElementById('actividades');
    programSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 overflow-hidden min-h-[500px]">
      {/* Honeycomb pattern background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 52,15 52,37 30,50 8,37 8,15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
              <polygon points="90,2 112,15 112,37 90,50 68,37 68,15" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
              <polygon points="0,28 22,41 22,63 0,76 -22,63 -22,41" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
              <polygon points="60,28 82,41 82,63 60,76 38,63 38,41" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
              <polygon points="120,28 142,41 142,63 120,76 98,63 98,41" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb)"/>
        </svg>
      </div>
      
      {/* Floating honey drops */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-200 rounded-full opacity-80 animate-bounce shadow-lg"></div>
        <div className="absolute top-32 right-20 w-4 h-4 bg-amber-200 rounded-full opacity-70 animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-orange-200 rounded-full opacity-60 animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-yellow-300 rounded-full opacity-90 animate-bounce shadow-lg" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-amber-300 rounded-full opacity-50 animate-bounce shadow-lg" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-bounce shadow-lg" style={{animationDelay: '2.5s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            3er Encuentro Federal Apícola
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4 drop-shadow-md">
            10-11 Julio 2025
          </p>
          <p className="text-lg text-white/90 mb-8 drop-shadow-md">
            Centro de Convenciones, Complejo Ferial - Córdoba Capital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToProgram}
              className="bg-white text-honey-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Ver Programa
            </button>
            <a 
              href="https://forms.gle/nN4p1kR9rnwWmThr8"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-honey-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Inscribirse
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}