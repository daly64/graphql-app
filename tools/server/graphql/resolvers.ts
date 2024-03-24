import {
  prismaGetAllUsers,
  prismaGetUserById,
  prismaCreateUser,
  prismaUpdateUser,
  prismaDeleteUser,
} from "../prisma/userCRUD";

const getAllUsers = prismaGetAllUsers;

const getUser = (_parent: any, data: { id: string }) => {
  return prismaGetUserById(data.id);
};

const createUser = (parent: any, data: { input: any }) => {
  return prismaCreateUser(data.input);
};

const updateUser = (parent: any, data: { id: string; input: any }) => {
  return prismaUpdateUser(data.id, data.input);
};

const deleteUser = (parent: any, data: { id: string }) => {
  const deletedUser = prismaDeleteUser(data.id);
  return deletedUser !== null;
};
let currentNumberVar = 0;
const currentNumber = () => currentNumberVar;

const resolvers = {
  Query: { getAllUsers, getUser, currentNumber },
  Mutation: { createUser, updateUser, deleteUser },
};
export default resolvers;
