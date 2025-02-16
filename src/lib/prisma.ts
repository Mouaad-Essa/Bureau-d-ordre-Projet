import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
});

const prismaForLogs = new PrismaClient();

prisma.$on('query', async (e) => {
    if (!e.query.startsWith('BEGIN') && !e.query.startsWith('COMMIT')) {
        await prismaForLogs.queryLog.create({
            data: {
                query: e.query,
                duration: e.duration,
            },
        });
    }
});

export default prisma;
