import {prisma} from "@/src/lib/prisma";

export const fetchLogs = async () => {
    return prisma.queryLog.findMany();
}