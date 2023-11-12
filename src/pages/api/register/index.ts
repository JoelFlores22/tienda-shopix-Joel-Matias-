import { NextApiRequest, NextApiResponse } from 'next';
import { encriptarPassword } from '@/utils/crypto';
import { emailRegex, passwordRegex } from '@/utils/regex';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usuario = req.body;

    if (Object.values(usuario).includes(undefined)) {
      return res.status(400).json({ msg: 'Error! Faltan datos' });
    }

    if (!usuario.email.match(emailRegex)) {
      return res.status(400).json({ msg: 'Error! Email invalido' });
    }

    if (!usuario.password.match(passwordRegex)) {
      return res.status(400).json({ msg: 'Error! Password incorrecta' });
    }

    const contraseniaHash = await encriptarPassword(usuario.password);

    const usuarioAGuardar = { ...usuario, password: contraseniaHash };

    const usuarioSubido = await prisma.usuario.create({ data: usuarioAGuardar });

    if (!usuarioSubido) {
      return res.status(500).json({ msg: 'No se pudo subir el usuario capo' });
    }

    const token = sign(usuarioAGuardar, process.env.TOKEN_SECRET as string);

    return res.status(201).json({ token });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
}
