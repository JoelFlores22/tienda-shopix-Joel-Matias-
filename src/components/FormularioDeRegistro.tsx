"use client"
import { FormEvent ,useEffect,useRef } from "react";
import { verify } from "jsonwebtoken";
import { useContext } from "react";
import { UserContext } from "@/context/UseContext";
import Link from "next/link";

export default function FormularioDeRegistro(){

    
    const nombreRef = useRef(null);
    const edadRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { user, setUser } = useContext(UserContext);
    
    useEffect(() => {
        // Esta lógica se ejecutará cada vez que user se actualice
        console.log("Usuario actualizado:", user);
      }, [user]);

    async function mandarDatosDeRegistro(evento: FormEvent){
        evento.preventDefault()

        const datosAEnviar = {
            //@ts-ignore
            nombre: nombreRef.current?.value,
            //@ts-ignore
            edad: Number(edadRef.current?.value),
            //@ts-ignore
            email: emailRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value
        }

        const respuesta = await fetch(
            "http://localhost:3000/api/register", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosAEnviar),
        });

        if (respuesta.status != 201){
            const error = await respuesta.json()
            alert(error.msg);
        }

        const { token } = await respuesta.json();

        setUser({ ...datosAEnviar, token })

        // const usuarioDecodificado = verify(token, 
        //     process.env.NEXT_PUBLIC_TOKEN_SECRET as string
        // );

        // console.log(usuarioDecodificado);
    }

    return(
        <main>
            <form onSubmit={mandarDatosDeRegistro} className="flex flex-col w-80 text-black">
                <input ref={nombreRef} type="text" placeholder="Nombre completo" />
                <input ref={edadRef} type="number" inputMode="numeric" placeholder="Edad" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Contraseña" />

                <input type="submit" value="Registrarse" className="text-white"/>
            </form>

            <button onClick={() => console.log(user)}>Click</button>

            <Link href="auth/iniciar-sesion">Ir a inicio de sesion</Link>
        </main>
    )
}