'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef, useState } from 'react';
import Image from 'next/image';

const schema = yup.object({
  nom: yup.string().required('Le nom est obligatoire'),
  email: yup
    .string()
    .email('Email invalide')
    .required("L'email est obligatoire"),
  telephone: yup.string().required('Le téléphone est obligatoire'),
  message: yup.string().optional(),

  photo: yup
    .mixed<File>()
    .test(
      'required',
      'Veuillez importer une photo',
      (value) => value instanceof File
    ),
});

type FormData = {
  nom: string;
  email: string;
  telephone: string;
  message?: string;
  photo?: File;
};

export default function TicketForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  const fileInputRef = useRef<HTMLInputElement>(null);


  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const [ticketCode, setTicketCode] = useState<string | null>(null);


  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (file) {

      setValue('photo', file, {
        shouldValidate: true,
      });


      const reader = new FileReader();

      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };


  const generateCode = () => {

    return (
      'TICKET-' +
      Date.now().toString(36).toUpperCase() +
      '-' +
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()
    );

  };


  const removePhoto = () => {

    setPhotoPreview(null);

    setValue('photo', undefined, {
      shouldValidate: true,
    });


    if(fileInputRef.current){
      fileInputRef.current.value = '';
    }

  };



  const onSubmit = async (data: FormData) => {

    setIsSubmitting(true);
    setTicketCode(null);


    try {


      const formData = new globalThis.FormData();


      Object.entries(data).forEach(([key,value])=>{


        if(key === "photo" && value instanceof File){

          formData.append(key,value);

        }

        else if(typeof value === "string"){

          formData.append(key,value);

        }

      });



      const res = await fetch('/api/send-email', {

        method:'POST',

        body:formData,

      });



      const result = await res.json();



      if(res.ok){


        const code = generateCode();


        setTicketCode(code);


        setSubmitStatus({

          success:true,

          message:
          '✅ Votre demande a été envoyée avec succès !'

        });



        reset();

        setPhotoPreview(null);



        if(fileInputRef.current){

          fileInputRef.current.value='';

        }



      }

      else{


        setSubmitStatus({

          success:false,

          message:
          result.error ||
          "❌ Erreur lors de l'envoi"

        });


      }



    }

    catch(error){


      setSubmitStatus({

        success:false,

        message:'❌ Erreur réseau'

      });


    }

    finally{

      setIsSubmitting(false);

    }

  };



  return (

    <div className="max-w-2xl w-full mx-auto px-4 py-12">


      <div className="text-center mb-8 animate-float">

        <span className="inline-block bg-custom-yellow/20 text-custom-green text-xs font-semibold px-4 py-2 rounded-full border border-custom-yellow/30 backdrop-blur-sm">

          🚀 Obtenez votre code en 2 minutes

        </span>

      </div>



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


<input
{...register('nom')}
placeholder="Votre nom et prénom"
className="w-full p-3 border-2 border-gray-200 rounded-xl"
/>


{errors.nom &&
<p className="text-red-500 text-sm">
{errors.nom.message}
</p>
}




<input

{...register('email')}

type="email"

placeholder="votre@email.com"

className="w-full p-3 border-2 border-gray-200 rounded-xl"

/>



{errors.email &&
<p className="text-red-500 text-sm">
{errors.email.message}
</p>
}





<input

{...register('telephone')}

placeholder="+229 00 00 00 00"

className="w-full p-3 border-2 border-gray-200 rounded-xl"

/>



{errors.telephone &&
<p className="text-red-500 text-sm">
{errors.telephone.message}
</p>
}






<textarea

{...register('message')}

rows={3}

placeholder="Votre message..."

className="w-full p-3 border-2 border-gray-200 rounded-xl"

/>





<input

ref={fileInputRef}

type="file"

accept="image/*"

onChange={handleFileChange}

className="w-full p-4 border-2 border-dashed rounded-xl"

/>



{errors.photo &&
<p className="text-red-500 text-sm">

Veuillez importer une photo

</p>
}






{photoPreview && (

<div className="mt-4 flex justify-center">


<div className="relative">


<Image

src={photoPreview}

alt="Aperçu"

width={160}

height={160}

className="rounded-xl object-cover"

/>



<button

type="button"

onClick={removePhoto}

className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"

>

✕

</button>



</div>


</div>

)}





<button

type="submit"

disabled={isSubmitting}

className="w-full py-4 btn-gradient text-white font-bold rounded-xl"

>


{isSubmitting ?

"Envoi en cours..." :

"📤 Envoyer la demande"

}


</button>





{submitStatus.message && (

<div className="mt-4 p-4 rounded-xl">


{submitStatus.message}



{ticketCode && (

<p className="mt-3 font-bold">

🎫 Code : {ticketCode}

</p>

)}


</div>

)}




</form>


</div>



<p className="text-center text-xs text-gray-400 mt-6">

🔒 Toutes vos données sont sécurisées et envoyées uniquement à notre équipe

</p>


</div>

  );

}
