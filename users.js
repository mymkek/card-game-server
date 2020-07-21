const usersModule = (() => {
    const users = [];
    const rooms = [];
    return {
        logRooms: () => console.log(rooms),
        addUser: ({ id, name, room }) => {
            name = name.trim().toLowerCase();
            room = room.trim().toLowerCase();
            rooms.includes(room) ? null : rooms.push(room);
            if (users.findIndex(user => user.id === id) > 0)
                return { error: "Username is taken" };
            const user = { id, name, room };
            users.push(user);
            return { user };
        },
        removeUser: id => {
            const index = users.findIndex(user => user.id === id);
            if (index > -1) return users.splice(index, 1)[0];
        },
        getUser: id => {
            return users.find(user => user.id === id);
        },
        getUsersInRoom: room => {
            return users.filter(user => user.room === room);
        },
        getRecentRooms: () => rooms.splice(-3),
    };
})();

module.exports = usersModule;