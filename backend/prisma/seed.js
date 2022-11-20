const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    //Add event types
    await prisma.event_type.createMany({
        data: [
            { id_event_type: 1, name: "did foul", key: "didFaul" },
            { id_event_type: 2, name: "was foulted", key: "wasFaulted"},
            { id_event_type: 3, name: "scored", key: "scored"},
            { id_event_type: 4, name: "let score", key: "letScore"}
        ]
    });
    // Add league
    await prisma.league.create({
        data: {
            id_league: 1000,
            name: "Test league",
            description: "League made for testing",
            image_url: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        }
    });
    // Add users
    await prisma.user.createMany({
        data: [
            { first_name: "Jan", last_name: "Cvrček", email: "jc@seznam.cz", time_registered: new Date(), id_user: 1000},
            { first_name: "Tomáš", last_name: "Roubal", email: "tr@seznam.cz", time_registered: new Date(), id_user: 1001},
            { first_name: "Zdeněk", last_name: "Špinar", email: "zs@seznam.cz", time_registered: new Date(), id_user: 1002},
            { first_name: "Jaroslav", last_name: "Červenka", email: "jc@seznam.cz", time_registered: new Date(), id_user: 1003},
        ]
    });

    await prisma.team.createMany({
        data: [
            {id_team: 1000, name: "Bouráci", image_url: "https://picsum.photos/200/300"},
            {id_team: 1001, name: "Práskači", image_url: "https://picsum.photos/200/300"},
        ]
    });

    await prisma.team_has_players.createMany({
        data: [
            {id_user: 1000, id_team: 1000, state: "joined"},
            {id_user: 1001, id_team: 1000, state: "joined"},
            {id_user: 1002, id_team: 1001, state: "joined"},
            {id_user: 1003, id_team: 1001, state: "joined"},
        ]
    });

    await prisma.match.createMany({
        data: [
            {id_match: 1000, time_created: new Date("2022-11-11T10:42:12"), time_start: new Date("2022-11-11T10:45:00"), state: "done", edit_hash: "dfuighjkaEDGYU", id_league: 1000, season: "s2022"},
            {id_match: 1001, time_created: new Date("2022-11-18T10:42:23"), time_start: new Date("2022-11-18T14:30:00"), state: "done", edit_hash: "fgdfy54fsdtsdf", id_league: 1000, season: "s2022"},
        ]
    });

    await prisma.match_has_team.createMany({
        data: [
            {id_team: 1000, id_match: 1000, state: "accepted"},
            {id_team: 1001, id_match: 1000, state: "accepted"},
            {id_team: 1000, id_match: 1001, state: "accepted"},
            {id_team: 1001, id_match: 1001, state: "accepted"},
        ]
    });

    await prisma.match_players.createMany({
        data: [
            { match_game_name: "Bouráci", match_role: "Brankář", id_player: 1000, id_match: 1000, id_team: 1000},
            { match_game_name: "Bouráci", match_role: "Útočník", id_player: 1001, id_match: 1000, id_team: 1000},
            { match_game_name: "Bouráci", match_role: "Brankář", id_player: 1000, id_match: 1001, id_team: 1000},
            { match_game_name: "Bouráci", match_role: "Útočník", id_player: 1001, id_match: 1001, id_team: 1000},
            { match_game_name: "Práskači", match_role: "Útočník", id_player: 1002, id_match: 1000, id_team: 1001},
            { match_game_name: "Práskači", match_role: "Brankář", id_player: 1003, id_match: 1000, id_team: 1001},
            { match_game_name: "Práskači", match_role: "Brankář", id_player: 1002, id_match: 1001, id_team: 1001},
            { match_game_name: "Práskači", match_role: "Útočník", id_player: 1003, id_match: 1001, id_team: 1001},
        ]
    });

    // Add events
    await prisma.event.createMany({
        data: [
            // Match 1000
            // Events
            { id_event: 1000,time_happened: "5:24", id_match: 1000, id_event_type: 3, user_id_user: 1001},
            { id_event: 1001,time_happened: "7:31", id_match: 1000, id_event_type: 3, user_id_user: 1001},
            { id_event: 1002,time_happened: "11:10", id_match: 1000, id_event_type: 3, user_id_user: 1002},
            { id_event: 1003,time_happened: "14:51", id_match: 1000, id_event_type: 3, user_id_user: 1001},
            // Counter Events
            { id_event: 1004,time_happened: "5:24", id_match: 1000, id_event_type: 4, user_id_user: 1003, id_counter_event: 1000},
            { id_event: 1005,time_happened: "7:31", id_match: 1000, id_event_type: 4, user_id_user: 1003, id_counter_event: 1001},
            { id_event: 1006,time_happened: "11:10", id_match: 1000, id_event_type: 4, user_id_user: 1000, id_counter_event: 1002},
            { id_event: 1007,time_happened: "14:51", id_match: 1000, id_event_type: 4, user_id_user: 1003, id_counter_event: 1003},
            
            // Match 1001
            // Events
            { id_event: 1008,time_happened: "2:17", id_match: 1001, id_event_type: 3, user_id_user: 1001},
            { id_event: 1009,time_happened: "5:11", id_match: 1001, id_event_type: 1, user_id_user: 1001},
            { id_event: 1010,time_happened: "5:58", id_match: 1001, id_event_type: 3, user_id_user: 1003},
            { id_event: 1011,time_happened: "7:02", id_match: 1001, id_event_type: 1, user_id_user: 1003},
            { id_event: 1012,time_happened: "10:18", id_match: 1001, id_event_type: 3, user_id_user: 1001},
            { id_event: 1013,time_happened: "13:30", id_match: 1001, id_event_type: 3, user_id_user: 1003},
            { id_event: 1014,time_happened: "14:11", id_match: 1001, id_event_type: 3, user_id_user: 1003},
            // Counter events
            { id_event: 1015,time_happened: "2:17", id_match: 1001, id_event_type: 4, user_id_user: 1002, id_counter_event: 1008},
            { id_event: 1016,time_happened: "5:11", id_match: 1001, id_event_type: 2, user_id_user: 1003, id_counter_event: 1009},
            { id_event: 1017,time_happened: "5:58", id_match: 1001, id_event_type: 4, user_id_user: 1000, id_counter_event: 1010},
            { id_event: 1018,time_happened: "7:02", id_match: 1001, id_event_type: 2, user_id_user: 1003, id_counter_event: 1011},
            { id_event: 1019,time_happened: "10:18", id_match: 1001, id_event_type: 4, user_id_user: 1002, id_counter_event: 1012},
            { id_event: 1020,time_happened: "13:30", id_match: 1001, id_event_type: 4, user_id_user: 1000, id_counter_event: 1013},
            { id_event: 1021,time_happened: "14:11", id_match: 1001, id_event_type: 4, user_id_user: 1000, id_counter_event: 1014},
        ]
    });

    await prisma.event.update({ data: {id_counter_event: 1004}, where: {id_event: 1000}});
    await prisma.event.update({ data: {id_counter_event: 1005}, where: {id_event: 1001}});
    await prisma.event.update({ data: {id_counter_event: 1006}, where: {id_event: 1002}});
    await prisma.event.update({ data: {id_counter_event: 1007}, where: {id_event: 1003}});

    await prisma.event.update({ data: {id_counter_event: 1015}, where: {id_event: 1008}});
    await prisma.event.update({ data: {id_counter_event: 1016}, where: {id_event: 1009}});
    await prisma.event.update({ data: {id_counter_event: 1017}, where: {id_event: 1010}});
    await prisma.event.update({ data: {id_counter_event: 1018}, where: {id_event: 1011}});
    await prisma.event.update({ data: {id_counter_event: 1019}, where: {id_event: 1012}});
    await prisma.event.update({ data: {id_counter_event: 1020}, where: {id_event: 1013}});
    await prisma.event.update({ data: {id_counter_event: 1021}, where: {id_event: 1014}});

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