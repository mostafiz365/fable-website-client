import { serverFetch } from "../core/server";

export const getBookmarkByUserId = async (userId) => {
    return serverFetch(`/api/my/bookmarks?userId=${userId}`);
}