import { useState } from "react";

export default function ImageViewer() {
  const [imageSrc] = useState("/attached_assets/WhatsApp Image 2025-06-24 at 09.28.22 (1)_1750770546371.jpeg");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Programa Original del Evento</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img 
            src={imageSrc} 
            alt="Programa del 3er Encuentro Federal Apícola"
            className="w-full h-auto rounded-lg border border-gray-200"
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Puedes ver el programa original arriba. Comparte los detalles específicos que quieres incluir en la aplicación.
          </p>
        </div>
      </div>
    </div>
  );
}