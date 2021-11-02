import { rest } from 'msw';

const ID = 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda';
// if (req.id === ID);
export const handlers = [
    rest.post('/api/login', (req, res, ctx) => {
        const { username } = req.body

        return res(
            ctx.status(200),
            ctx.json({
                id: ID,
                username,
                firstName: 'John',
                lastName: 'Maverick',
            })
        )
    }),

    rest.post('/api/rooms', (req, res, ctx) => {
        const data = req.body;
        console.log('data', data);
        return res(
            ctx.status(200),
            ctx.delay(1000)
        )
    }),

    rest.get('/api/accept-rooms', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.delay(10000),
            ctx.json(
                [
                    {
                        title: "1211",
                        person: "Vova",
                        startDate: "2001-11-26T10:00:00.417Z",
                        endDate: "2001-11-26T16:00:00.417Z",
                    },
                    {
                        title: "4219",
                        person: "Vova",
                        startDate: "2001-11-23T10:00:00.417Z",
                        endDate: "2001-11-23T16:00:00.417Z",
                    },
                ]
            )
        )
    }),

    rest.get('/api/rooms', (req, res, ctx) => {
        
        return res(
            ctx.status(200),
            ctx.delay(100),
            ctx.json(
                 [
                    {
                        title: "4442",
                        chairs: "45",
                        time: [
                            {
                                startDate: "2001-01-01T11:00:00.417Z",
                                endDate: "2001-01-01T12:00:00.417Z",
                                person: "Иванов Иван"
                            }
                        ],
                        isProjector: true,
                        isBoard: true,
                        description: "Описание1",
                    },
                    {
                        title: "4219",
                        chairs: "0",
                        time: [
                            {
                                startDate: "2001-01-01T10:00:00.417Z",
                                endDate: "2001-01-01T12:00:00.417Z",
                                person: "Петров Пётр"
                            },
                            {
                                startDate: "2002-01-02T14:00:00.417Z",
                                endDate: "2002-01-02T15:00:00.417Z",
                                time: "14:00-15:00",
                                person: "Углов Николай"
                            }
                        ],
                        isProjector: true,
                        isBoard: false,
                        description: "Описание2",
                    },
                    {
                        title: "1211",
                        chairs: "1",
                        time: [],
                        isProjector: false,
                        isBoard: true,
                        description: "Описание3",
                    },
                ],
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