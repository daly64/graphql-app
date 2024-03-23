import {
  prismaGetAllUsers,
  prismaGetUserById,
  prismaCreateUser,
  prismaUpdateUser,
  prismaDeleteUser,
} from "../prisma/userCRUD";

import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
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

const numberIncremented = {
  subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
};
const allUsers = {
  subscribe: () => pubsub.asyncIterator(["ALLUSERS"]),
};

// In the background, increment a number every second and notify subscribers when it changes.
function incrementNumber() {
  currentNumberVar++;
  pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumberVar });
  setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();
function backAllUsers() {
  pubsub.publish("ALLUSERS", { allUsers: prismaGetAllUsers });
  setTimeout(backAllUsers, 0);
}
// Start
backAllUsers();

const resolvers = {
  Query: { getAllUsers, getUser, currentNumber },
  Mutation: { createUser, updateUser, deleteUser },
  Subscription: { numberIncremented, allUsers },
};
export default resolvers;
