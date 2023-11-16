import { MercadoPagoConfig, Preference } from "mercadopago";
import type {
  CreatePreferencePayload,
  PreferencePayer,
  PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import { NextApiRequest, NextApiResponse } from "next";

export default function paymentMercadoPagoHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ global: string | undefined }>
) {
  console.log("Se empezo el proceso")
  const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
  });

  //@ts-ignore
  const { user, turno } = req.body;

  console.log(user,"asdasd")

  const preferenceOptions: CreatePreferencePayload | any = {
    binary_mode: true,
    items: [
      {
        title: `${turno.service} - Nombre de la marca`,
        description: `${turno.description}`,
        picture_url: `${turno.image}`,
        quantity: 1 as number,
        currency_id: "ARS",
        unit_price: turno.price as number,
      },
    ],
    payer: {
      name: user.name as string,
      surname: user.name.split(" ")[1] ?? ("TGB" as string),
      email: user.email as string,
    } as PreferencePayer,
    back_urls: {
      success: "https://success.com",
      failure: "https://failure.com",
      pending: "https://pending.com",
    } as PreferenceBackUrl,
    auto_return: "approved",
  };

  console.log("se empieza con las preferencias")
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