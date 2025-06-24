import { Calendar, Users, GraduationCap } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-honey-500 to-nature-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Programa del Evento</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Descubre todas las conferencias, talleres y actividades del encuentro más importante de apicultura del país
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="bg-white/20 px-4 py-2 rounded-full flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            3 días de contenido
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-full flex items-center">
            <Users className="w-4 h-4 mr-2" />
            50+ ponentes
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-full flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" />
            25+ talleres
          </div>
        </div>
      </div>
    </section>
  );
}
