import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetSequences() {
    const tableNames = [
        "User",
        "Project",
        "Team",
        "Task",
        "TaskAssignment",
        "Attachment",
        "Comment",
        "ProjectTeam"
    ];

    for (const tableName of tableNames) {
        const idColumnName = tableName === "User" ? "userId" : "id";
        try {
            // Postgres specific command to update sequence to max(id) + 1
            // We need to handle case where table is empty (coalesce to 1)
            await prisma.$executeRawUnsafe(
                `SELECT setval(pg_get_serial_sequence('"${tableName}"', '${idColumnName}'), coalesce(max("${idColumnName}")+1, 1), false) FROM "${tableName}";`
            );
            console.log(`Reset sequence for ${tableName}`);
        } catch (error) {
            console.error(`Error resetting sequence for ${tableName}:`, error);
        }
    }
}

resetSequences()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
