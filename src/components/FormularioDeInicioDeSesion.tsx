"use client"
import { FormEvent ,useEffect,useRef } from "react";
import { verify } from "jsonwebtoken";
import { useContext } from "react";
import { UserContext } from "@/context/UseContext";
import Link from "next/link";

export default function FormularioDeInicioDeSesion(){
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
            email: emailRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value
        }

        console.log(datosAEnviar)
        const respuesta = await fetch(
            "http://localhost:3000/api/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosAEnviar),
        });


        if (respuesta.status != 200){
            const error = await respuesta.json()
            alert(error.msg);
        }

        const { token } = await respuesta.json();

        const usuarioDecodificado = verify(token, 
            process.env.NEXT_PUBLIC_TOKEN_SECRET as string
        );
        console.log(datosAEnviar)
        console.log(usuarioDecodificado)
        setUser({ usuarioDecodificado, token })

        console.log(user);



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
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="relative">
                        <input
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        ref={emailRef}
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                        </span>
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

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        </span>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                </div>
                <br />
                <br />
                <br />
            </form>

        </main>
    )
}