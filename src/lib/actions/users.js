import { serverMutation } from "../core/server";

export const updateUserRole = async (userId, newRole) => {
    console.log(newRole);
    return serverMutation(`/api/users/role/${userId}`, { role: newRole }, "PATCH");
};

export const deleteUser = async (userId) => {
    return serverMutation(`/api/users/${userId}`, {}, "DELETE");
};