export function fetchAuth({login, password}) {
    console.log('login: ', login, ' password: ', password);

    if (login == 'admin' && password == 'admin') {
        return new Promise((resolve) =>
            setTimeout(() => resolve({ data: {
                name: 'Легостаев Дмитрий',
                    role: 'officeManager',
                } }), 1000)
        );
    }

    if (login == 'user' && password == 'user') {
        return new Promise((resolve) =>
            setTimeout(() => resolve({ data: {
                    name: 'Тургунова Алсу',
                    role: 'employee',
                } }), 1000)
        );
    }

    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: 'такого пользователя нет' }), 1000)
    );
}