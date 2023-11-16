import { CartContext } from "@/context/CartContext";
import { Product } from "@/utils/interface";
import { useContext } from "react";
import Image from 'next/image';

export default function Cart(){
    //@ts-ignore
    const { cart } = useContext(CartContext);
    return (
        <>
            <h1 className='font-bold text-4xl text-center'>Cart</h1>
            <div
                className="relative w-screen max-w-sm border border-gray-600 my-24 m-auto bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
                aria-modal="true"
                role="dialog"
            >

                {!cart || !cart.products || !cart.price ? (
                    <p>No has seleccionado ningún producto.</p>
                ) : (
                    <div className="mt-4 space-y-6">
                        <ul className="space-y-4">
                            {cart.products.map((product: Product, index: number) => (
                                <li className="flex items-center gap-4" key={index}>
                                    <Image
                                        src={product.image}
                                        alt="image-product"
                                        className="h-16 w-16 rounded object-cover"
                                        width={300}
                                        height={300}
                                    />

                                    <div>
                                        <h3 className="text-sm text-gray-900">{product.title}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Categoria:</dt>
                                                <dd className="inline">{product.category}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Precio:</dt>
                                                <dd className="inline">${product.price}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <span>Precio Total: ${cart.price}</span>
                    </div>
                )}
            </div>
        </>
    )
}