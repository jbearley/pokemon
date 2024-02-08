const usersRepository = require(`../repositories/users-repository`);
const usersService = require(`../services/users-service`);

const getUsers = (request, response) => {
    usersRepository.get()
        .then((rows) => response.status(200).json(rows))
        .catch((err) => response.status(500).json(err));
};

const getUser = (request, response) => {
    const id = request.params.id;
    usersService.getById(id)
        .then((rows) => response.status(200).json(rows))
        .catch((err) => response.status(500).json(err));
};

const getUserByUsername = (request, response) => {
    const username = request.params.username;
    usersService.getByUsername(username)
        .then((rows) => response.status(200).json(rows))
        .catch((err) => response.status(500).json(err));
};

const addUser = (request, response) => {
    console.log(`is running code in `);
    const { username, pasword} = request.body;
    console.log(username);
    usersService.create(username, pasword).then(() => {
        response.status(201).json({ status: `success`, message: `User added.` });
    });
};



const  updatePokemon1 = (request, response) => {
    const { username, pasword,pokemonNum, pokemonName} = request.body;
    usersService.updatePokemon(username, pasword,pokemonNum, pokemonName).then(() => {
        response.status(201).json({ status: `success`, message: `User added.` });
    });
};

const deletePokemon = (request, response) => {
    const { username, pasword, pokemonNum} = request.body;
    usersService.deletePokemon(username, pasword ,pokemonNum).then(() => {
        response.status(201).json({ status: `success`, message: `Pokemon added to team` });
    });
};


const checkPasword = (request, response) => {
    const { username, pasword } = request.body;
    usersService.checkPasword(username, pasword).then(() => {
        response.status(201).json({ status: `success`, message: `Password Checked` });
    });
};

module.exports = { 
    getUsers, 
    getUser, 
    addUser,
    updatePokemon1,
    deletePokemon,
    checkPasword,
    getUserByUsername
};