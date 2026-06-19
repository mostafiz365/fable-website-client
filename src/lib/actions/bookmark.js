'use server'

import { serverMutation } from "../core/server";

export const saveBookmark = async (BookmarkData) => {
    return serverMutation('/api/bookmarks', BookmarkData);
}