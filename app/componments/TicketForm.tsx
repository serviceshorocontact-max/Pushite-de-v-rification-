'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';

const schema = yup.object({
  nom: yup.string().required('Le nom est obligatoire'),
  email: yup.string().email('Email invalide').required('L\'email est obligatoire'),
  telephone: yup.string().required('Le téléphone est obligatoire'),
  message: yup.string(),
  photo: yup.mixed().required('Veuillez importer une photo'),
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
        setSubmitStatus({ success: true, message: 'Votre demande a été envoyée avec succès !' });
        reset();
        setPhotoPreview(null);
      } else {
        setSubmitStatus({ success: false, message: result.error || 'Erreur lors de l\'envoi' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Erreur réseau' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-custom-yellow/30">
      <h2 className="text-3xl font-bold text-custom-green mb-6 text-center">Demande de ticket</h2>
      <p className="text-center text-gray-600 mb-6">Remplissez le formulaire et un code vous sera attribué après envoi.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-custom-green">Nom complet *</label>
        <input {...register('nom')} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-yellow focus:border-transparent" />
        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-custom-green">Email *</label>
        <input {...register('email')} type="email" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-yellow focus:border-transparent" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-custom-green">Téléphone *</label>
        <input {...register('telephone')} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-yellow focus:border-transparent" />
        {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-custom-green">Message (optionnel)</label>
        <textarea {...register('message')} rows={3} className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-yellow focus:border-transparent" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-custom-green">Importer une photo *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full p-2 border-2 border-dashed border-custom-yellow rounded-lg cursor-pointer hover:bg-custom-light-yellow/30 transition"
        />
        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
        {photoPreview && (
          <div className="mt-2">
            <Image src={photoPreview} alt="Aperçu" width={150} height={150} className="rounded-lg object-cover" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-custom-green text-white font-semibold rounded-lg hover:bg-custom-light-green transition disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </button>

      {submitStatus.message && (
        <div className={`mt-4 p-3 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
          {ticketCode && (
            <p className="mt-2 font-bold text-custom-green">
              🎫 Votre code ticket : <span className="bg-yellow-100 px-2 py-1 rounded">{ticketCode}</span>
            </p>
          )}
        </div>
      )}
    </form>
  );
}
