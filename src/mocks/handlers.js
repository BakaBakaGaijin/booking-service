import {rest} from 'msw';

let roomsToAccept = [
    {
        title: '1211',
        person: 'Vova',
        startDate: '2001-11-26T10:00:00.417Z',
        endDate: '2001-11-26T16:00:00.417Z',
    },
    {
        title: '4219',
        person: 'Vova',
        startDate: '2001-11-23T10:00:00.417Z',
        endDate: '2001-11-23T16:00:00.417Z',
    },
];

let allRooms = [
    {
        title: '4442',
        chairs: '45',
        time: [
            {
                startDate: '2001-01-01T11:00:00.417Z',
                endDate: '2001-01-01T12:00:00.417Z',
                person: 'Иванов Иван'
            }
        ],
        isProjector: true,
        isBoard: true,
        description: 'Описание1',
    },
    {
        title: '4219',
        chairs: '0',
        time: [
            {
                startDate: '2001-01-01T10:00:00.417Z',
                endDate: '2001-01-01T12:00:00.417Z',
                person: 'Петров Пётр'
            },
            {
                startDate: '2002-01-02T14:00:00.417Z',
                endDate: '2002-01-02T15:00:00.417Z',
                time: '14:00-15:00',
                person: 'Углов Николай'
            }
        ],
        isProjector: true,
        isBoard: false,
        description: 'Описание2',
    },
    {
        title: '1211',
        chairs: '1',
        time: [],
        isProjector: false,
        isBoard: true,
        description: 'Описание3',
    },
];

export const handlers = [
    rest.post('/api/rooms', (req, res, ctx) => {
        const {title, chairs, isProjector, isBoard, description} = req.body;

        let newRoom = {
            title,
            chairs,
            time: [],
            isProjector,
            isBoard,
            description
        }

        allRooms.push(newRoom);

        return res(
            ctx.status(200),
            ctx.delay(1000),
            ctx.json(newRoom)
        )
    }),

    rest.post('/api/rooms-edit', (req, res, ctx) => {
        const {oldTitle, title, chairs, isProjector, isBoard, description} = req.body;
        let updatedRoom;

        allRooms.forEach(room => {
            if (room.title === oldTitle) {
                room.title = title;
                room.chairs = chairs;
                room.isProjector = isProjector;
                room.isBoard = isBoard;
                room.description = description;

                updatedRoom = room;
            }
        })

        roomsToAccept.forEach(room => {
            if (room.title === oldTitle) room.title = title;
        })

        return res(
            ctx.status(200),
            ctx.delay(1000),
            ctx.json({oldTitle, updatedRoom})
        )
    }),

    rest.post('/api/accept-rooms', (req, res, ctx) => {
        const {title, person, startDate, endDate} = req.body;

        let roomToAccept = {
            title,
            person,
            startDate,
            endDate,
        };

        roomsToAccept.push(roomToAccept)

        return res(
            ctx.status(200),
            ctx.delay(100),
            ctx.json(roomToAccept)
        )
    }),

    rest.post('/api/accept-rooms-decision', (req, res, ctx) => {
        const {title, person, startDate, endDate, decision} = req.body;

        let roomToAccept = {
            title,
            person,
            startDate,
            endDate,
        };

        roomsToAccept = roomsToAccept.filter(el => JSON.stringify(el) !== JSON.stringify(roomToAccept));

        if (decision === 'accept') {
            let updatedReservation = allRooms.find(room => room.title === title);
            const index = allRooms.findIndex(room => room.title === title);

            updatedReservation.time.push({startDate, endDate, person});

            allRooms[index] = updatedReservation;
        }

        return res(
            ctx.status(200),
            ctx.delay(100),
            ctx.json(roomToAccept)
        )
    }),

    rest.get('/api/accept-rooms', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(100),
            ctx.json(
                roomsToAccept
            )
        )
    }),

    rest.get('/api/rooms', (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.delay(100),
            ctx.json(
                allRooms
            ),
        )
    }),

    rest.get('/user', (req, res, ctx) => {
        const isAuthenticated = sessionStorage.getItem('is-authenticated')

        if (!isAuthenticated) {
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                }),
            )
        }

        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            }),
        )
    }),
];