import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log("Users:", users.length);
    users.forEach(u => console.log(`User: ${u.userId} - ${u.username}`));

    const tasks = await prisma.task.findMany();
    console.log("Tasks:", tasks.length);
    tasks.forEach(t => console.log(`Task: ${t.id} - ${t.title}`));

    const teams = await prisma.team.findMany();
    console.log("Teams:", teams.length);
    teams.forEach(t => console.log(`Team: ${t.id} - ${t.teamName}`));
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
