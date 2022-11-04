const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    //Add event types
    await prisma.event_type.createMany({
        data: [
            { name: "did foul", key: "didFaul" },
            { name: "was foulted", key: "wasFaulted"},
            { name: "scored", key: "scored"},
            { name: "let score", key: "letScore"}
        ]
    });
    // Add league
    await prisma.league.create({
        data: {
            name: "Test league",
            description: "League made for testing",
            image_url: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        }
    })
}

main()
.then(async() => {
    await prisma.$disconnect();
})
.catch(async(err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1)
})