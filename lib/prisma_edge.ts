import { PrismaClient } from "@prisma/client/edge";

const prisma_edge =
  global.prisma_edge ||
  new PrismaClient({
    datasourceUrl: process.env.PRISMA_CONNECTION_STRING,
  });

if (process.env.NODE_ENV === "development") global.prisma_edge = prisma_edge;

export default prisma_edge;
