'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';

const schema = yup.object({
  nom: yup.string().required('Le nom est obligatoire'),
  email: yup.string().email('Email invalide').required("L'email est obligatoire"),
  telephone: yup.string().required('Le téléphone est obligatoire'),
  message: yup.string(),

  photo: yup
    .mixed<File>()
    .nullable()
    .required('Veuillez importer une photo'),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function TicketForm() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});
  const [ticketCode, setTicketCode] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('photo', file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateCode = () => {
    return 'TICKET-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setTicketCode(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photo' && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      });

      const res = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        const code = generateCode();
        setTicketCode(code);
        setSubmitStatus({ success: true, message: '✅ Votre demande a été envoyée avec succès !' });
        reset();
        setPhotoPreview(null);
      } else {
        setSubmitStatus({ success: false, message: result.error || '❌ Erreur lors de l\'envoi' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: '❌ Erreur réseau' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-12">
      {/* Badge */}
      <div className="text-center mb-8 animate-float">
        <span className="inline-block bg-custom-yellow/20 text-custom-green text-xs font-semibold px-4 py-2 rounded-full border border-custom-yellow/30 backdrop-blur-sm">
          🚀 Obtenez votre code en 2 minutes
        </span>
      </div>

      {/* Carte principale */}
      <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 hover-lift">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-custom-green">
            🎫 Demande de ticket
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Remplissez le formulaire ci-dessous
          </p>
          <div className="w-20 h-1 bg-custom-yellow mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-custom-green mb-1">
              👤 Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              {...register('nom')}
              placeholder="Votre nom et prénom"
              className="w-full p-3 border-2 border-gray-200 rounded-xl input-focus bg-white/60"
            />
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-custom-green mb-1">
              📧 Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="votre@email.com"
              className="w-full p-3 border-2 border-gray-200 rounded-xl input-focus bg-white/60"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-semibold text-custom-green mb-1">
              📱 Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              {...register('telephone')}
              placeholder="+229 00 00 00 00"
              className="w-full p-3 border-2 border-gray-200 rounded-xl input-focus bg-white/60"
            />
            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-custom-green mb-1">
              💬 Message (optionnel)
            </label>
            <textarea
              {...register('message')}
              rows={3}
              placeholder="Votre message..."
              className="w-full p-3 border-2 border-gray-200 rounded-xl input-focus bg-white/60 resize-none"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-semibold text-custom-green mb-1">
              📸 Importer une photo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 border-2 border-dashed border-custom-yellow rounded-xl cursor-pointer hover:bg-custom-light-yellow/30 transition bg-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-custom-green file:text-white hover:file:bg-custom-light-green"
              />
            </div>
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
            {photoPreview && (
              <div className="mt-4 flex justify-center">
                <div className="relative group">
                  <Image
                    src={photoPreview}
                    alt="Aperçu"
                    width={160}
                    height={160}
                    className="rounded-xl object-cover shadow-lg border-2 border-custom-yellow/30"
                  />
                  <button
                    onClick={() => {
                      setPhotoPreview(null);
                      setValue('photo', null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 btn-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
            ) : (
              '📤 Envoyer la demande'
            )}
          </button>

          {/* Statut */}
          {submitStatus.message && (
            <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${submitStatus.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {submitStatus.message}
              {ticketCode && (
                <div className="mt-3 p-3 bg-custom-yellow/20 rounded-lg border border-custom-yellow">
                  <p className="text-center">
                    🎫 Votre code :{' '}
                    <span className="font-bold text-custom-green text-lg">{ticketCode}</span>
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Gardez ce code précieusement
                  </p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-6">
        🔒 Toutes vos données sont sécurisées et envoyées uniquement à notre équipe
      </p>
    </div>
  );
}
