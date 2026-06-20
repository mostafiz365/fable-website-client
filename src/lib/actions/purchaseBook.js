'use server'

import { serverMutation } from "../core/server";


export const purchaseBook = async (purchaseBookData) => {
    return serverMutation('/api/purchase', purchaseBookData);
}