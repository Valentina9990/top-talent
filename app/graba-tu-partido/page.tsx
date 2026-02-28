"use client";

import { useState } from "react";
import { Video, CheckCircle, Send, Phone, Users, Calendar, MapPin, User } from "lucide-react";

export default function GrabaTuPartidoPage() {
  const [formData, setFormData] = useState({
    nombreEquipo: "",
    nombreContacto: "",
    telefono: "",
    fechaPartido: "",
    lugarPartido: "",
    paquete: "1hora",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paqueteTexto =
      formData.paquete === "1hora"
        ? "1 Hora de Grabación - $120.000"
        : "2 Horas de Grabación - $140.000";

    const mensaje = `*Solicitud de Grabación Profesional*%0A%0A*Equipo:* ${formData.nombreEquipo}%0A*Contacto:* ${formData.nombreContacto}%0A*Teléfono:* ${formData.telefono}%0A*Fecha del partido:* ${formData.fechaPartido}%0A*Lugar:* ${formData.lugarPartido}%0A*Paquete seleccionado:* ${paqueteTexto}`;

    const whatsappUrl = `https://wa.me/573107764018?text=${mensaje}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-500 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 mb-6">
              <Video className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white tracking-wide uppercase">
                Servicio Profesional
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Graba tu Partido
              <span className="block text-primary-50 mt-2">como un Profesional</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-50 sm:text-xl">
              Lleva tu juego al siguiente nivel con grabaciones de alta calidad. 
              Ideal para destacar ante reclutadores y escuelas deportivas.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 70C1200 73.3 1320 66.7 1380 63.3L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Mira cómo trabajamos
            </h2>
            <p className="mt-2 text-gray-600">
              Un ejemplo de nuestras grabaciones profesionales
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
            <video
              controls
              className="w-full aspect-video bg-black"
              poster=""
              preload="metadata"
            >
              <source
                src="https://futbol-media.s3.us-east-2.amazonaws.com/videos/VideoPromocion.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              En 4 simples pasos tendras tu video profesional
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: Send,
                title: "Solicita",
                description: "Llena el formulario con los datos de tu partido.",
              },
              {
                step: 2,
                icon: Phone,
                title: "Coordinamos",
                description: "Te contactamos para confirmar detalles y pago.",
              },
              {
                step: 3,
                icon: Video,
                title: "Grabamos",
                description: "Nuestro equipo profesional cubre tu partido.",
              },
              {
                step: 4,
                icon: CheckCircle,
                title: "Recibes",
                description: "Te entregamos el video editado y lo subimos a tu perfil.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500 text-white mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="absolute top-4 right-4 text-5xl font-extrabold text-gray-100">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 order-2 lg:order-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Solicita una Grabación Profesional
                </h2>
                <p className="mt-2 text-gray-600">
                  Completa el formulario y nos pondremos en contacto para coordinar la grabación de tu próximo partido.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <Users className="h-4 w-4 text-primary-500" />
                    Nombre del Equipo
                  </label>
                  <input
                    type="text"
                    name="nombreEquipo"
                    value={formData.nombreEquipo}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                    placeholder="Ej: Club Deportivo Los Tigres"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <User className="h-4 w-4 text-primary-500" />
                    Nombre de Contacto
                  </label>
                  <input
                    type="text"
                    name="nombreContacto"
                    value={formData.nombreContacto}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <Phone className="h-4 w-4 text-primary-500" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                    placeholder="Ej: 310 123 4567"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    Fecha del Partido
                  </label>
                  <input
                    type="date"
                    name="fechaPartido"
                    value={formData.fechaPartido}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    Lugar del Partido (Cancha)
                  </label>
                  <input
                    type="text"
                    name="lugarPartido"
                    value={formData.lugarPartido}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
                    placeholder="Ej: Cancha Sintética El Campín"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Selecciona tu paquete
                  </label>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        formData.paquete === "1hora"
                          ? "border-primary-500 bg-primary-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paquete"
                          value="1hora"
                          checked={formData.paquete === "1hora"}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                        />
                        <div>
                          <span className="font-semibold text-gray-900">1 Hora</span>
                          <p className="text-xs text-gray-500">Grabación completa</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary-700">$120.000</span>
                    </label>

                    <label
                      className={`flex items-center justify-between rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        formData.paquete === "2horas"
                          ? "border-primary-500 bg-primary-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paquete"
                          value="2horas"
                          checked={formData.paquete === "2horas"}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                        />
                        <div>
                          <span className="font-semibold text-gray-900">2 Horas</span>
                          <p className="text-xs text-gray-500">Grabación + Fotos</p>
                        </div>
                      </div>
                      <span className="font-bold text-primary-700">$140.000</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  <Send className="h-5 w-5" />
                  Enviar Solicitud por WhatsApp
                </button>
              </form>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
                  Elige la Duración
                </h2>
                <p className="text-gray-600">
                  Selecciona el paquete de grabación para tu partido.
                </p>
              </div>

              <div className="relative bg-white rounded-2xl border-2 border-primary-500 shadow-lg p-6 sm:p-8 overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  POPULAR
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      1 Hora de Grabación
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-primary-700">
                      $120.000
                    </p>
                    <p className="text-sm text-gray-500">$60.000 por equipo</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">Grabación profesional del partido completo.</span>
                  </div>
                </div>
              </div>

              <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-md hover:border-primary-500 hover:shadow-lg transition-all p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      2 Horas de Grabación
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-primary-700">
                      $140.000
                    </p>
                    <p className="text-sm text-gray-500">$70.000 por equipo</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">Grabación profesional del partido completo.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">Sesiones de fotos para cada jugador.</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
