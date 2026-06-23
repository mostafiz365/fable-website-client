const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { headers } from "next/headers"
import { auth } from "../auth"

export const serverApi = async(path) =>{

    const {token} = await auth.api.getToken({
            headers: await headers()
        })
        const res = await fetch(`${baseUrl}${path}`,{
            cache: "no-store",
            headers: {

                authorization: `Bearer ${token}`
            }
        });
    // handle 401, 404, 403
    return res.json();
}
