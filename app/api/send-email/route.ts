import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nom = formData.get('nom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const message = formData.get('message') as string;
    const photo = formData.get('photo') as File | null;

    if (!nom || !email || !telephone) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const attachments = [];
    if (photo) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: photo.name,
        content: buffer,
      });
    }

    await transporter.sendMail({
      from: `"Formulaire Ticket" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nouveau ticket de ${nom}`,
      html: `
        <h2>🟢 Nouvelle demande de ticket</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Message :</strong> ${message || 'Aucun'}</p>
        <p><em>La photo est jointe en pièce jointe.</em></p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API :', error);
    return NextResponse.json({ error: 'Erreur d\'envoi' }, { status: 500 });
  }
}
