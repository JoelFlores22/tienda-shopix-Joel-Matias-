import { Product } from "@/utils/interface";
import { MercadoPagoConfig, Preference } from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferencePayer,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import { NextApiRequest, NextApiResponse } from "next";

export interface PaymentResponse {
  success: boolean;
  preferenceId?: string;
  error?: string;
}

export default async function paymentMercadoPagoHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ global: string | undefined }>,
  product: Product
  ) {
  console.log('Iniciando función paymentMercadoPagoHandler');
  const simulatedUser = {
    name: 'Usuario de Prueba',
    email: 'test@example.com',
    edad: 22,
    password: 'Patito123'
  };
  const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
  });

  //@ts-ignore
  const { user, turno } = req.body;


  console.log(product);
  const preferenceOptions: CreatePreferencePayload | any = {
    
    binary_mode: true,
    items: [
      {
        title: `Shopix`,
        description: `Descripcion del producto`,
        picture_url: "url de imagen",
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: 200,
      },
    ],
    payer: {
      name: simulatedUser.name as string,
      surname: simulatedUser.name.split(" ")[1] ?? ("TGB" as string),
      email: simulatedUser.email as string,
    } as PreferencePayer,
    back_urls: {
      success: "https://success.com",
      failure: "https://failure.com",
      pending: "https://pending.com",
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  console.log('Opciones de preferencia:', preferenceOptions);
  const preference = new Preference(mercadopago);

  preference
    .create(preferenceOptions)
    .then(function (response) {
      res.status(200).json({ global: response.id });
    })
    .catch((error) => {
      res.status(500).json({ global: error });
    });
}