import { serverFetch } from "../core/server";

export const getPurchasedBooksByWriter = async (writerId) => {
    return serverFetch(`/api/purchase/writer/${writerId}`);
}