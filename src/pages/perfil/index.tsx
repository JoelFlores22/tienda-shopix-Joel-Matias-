"use client"

import { UserContext } from "@/context/UseContext"
import { useContext } from "react"

export default function Page(){
    const { user } = useContext(UserContext)

    return (
        <section>
            <h2>{user.nombre}</h2>

            <p>{user.email}</p>
            <p>{user.edad}</p>
            <p>{user.password}</p>
        </section>
    )
}