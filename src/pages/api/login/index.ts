// Importa los tipos de Next.js
import { NextApiRequest, NextApiResponse } from 'next';

// Importa los módulos necesarios
import { emailRegex, passwordRegex } from "@/utils/regex";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// Crea una instancia de PrismaClient
const prisma = new PrismaClient();

// Exporta la función de la página
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtiene los datos de la solicitud
    const usuario = req.body;

    // Validaciones de email y contraseña
    if (!usuario.email.match(emailRegex)) {
      return res.status(400).json({ msg: "Error! Email invalido" });
    }

    if (!usuario.password.match(passwordRegex)) {
      return res.status(400).json({ msg: "Error! Password incorrecta" });
    }

    // Consulta el usuario en la base de datos
    const usuarioEnDB = await prisma.usuario.findUnique({
      where: {
        email: usuario.email,
      },
    });

    // Verifica si el usuario existe
    if (!usuarioEnDB) {
      return res.status(403).json({ msg: "Cuenta no existe!" });
    }

    // Compara las contraseñas
    const contrasenaValida = await compare(usuario.password, usuarioEnDB.password);

    // Si la contraseña no es válida
    if (!contrasenaValida) {
      return res.status(403).json({ msg: "Cuenta no existe!" });
    }

    // Genera un token con el ID del usuario
    const token = sign({ userId: usuarioEnDB.id }, process.env.TOKEN_SECRET as string, { expiresIn: "7d" });

    // Devuelve el token como respuesta
    return res.status(200).json({ token });
  } catch (error) {
    // Maneja errores
    console.error('Error en el servidor:', error);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
}
