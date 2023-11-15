"use client"
import { FormEvent ,useEffect,useRef } from "react";
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

        window.location.href = "/"
    }

    return(
        <main>
            <div className="mx-auto max-w-lg text-center py-20">
                <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                <p className="mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form onSubmit={mandarDatosDeRegistro} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="nombre" className="sr-only">Nombre</label>

                    <div className="relative">
                        <input
                        type="text"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Nombre"
                        ref={nombreRef}
                        />
                    </div>
                    </div>
                <div>
                    <label htmlFor="Edad" className="sr-only">Edad</label>

                    <div className="relative">
                        <input
                        type="number"
                        inputMode="numeric"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Edad"
                        ref={edadRef}
                        />
                    </div>
                    </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="relative">
                        <input
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        ref={emailRef}
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="password" className="sr-only">Password</label>

                    <div className="relative">
                        <input
                        type="password"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password"
                        ref={passwordRef}
                        />
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Register
                    </button>
                </div>
                <br />
                <br />
                <br />
            </form>

        </main>
    )
}