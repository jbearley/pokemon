const usersRepository = require(`../repositories/users-repository`);

const validateUser = (username, pasword) => {
    if (typeof username === `string` && typeof pasword === `string`) {
        return (username.length <= 100 && pasword.length <= 100);
    }
    return false;
};

const getById = (id) => {
    if (isValidUserId(id)) {
        return usersRepository.getById(id);
    }
    else {
        throw `Id must be greater than 0`;
    }
};

const getByUsername = async (username) => {
    if (typeof username === `string` && username.length <= 100) {
        let oupt = await usersRepository.getByUsername(username);
        
        if (oupt[0] != undefined){
            return oupt;
        }
        else {
            throw (new Error(`Username not recognized`));
        };
    }
    else {
        console.log(username);
        throw (new Error(`Username not valid`));
    }
};

const checkPasword = async(username,pasword1) => {
    if (typeof username === `string` && username.length <= 100) {
        user = await getByUsername(username);
        const oupt = user[0][`pasword`]=== pasword1;
        //console.log(oupt);
        return(oupt);
    }
};

const isValidUserId = (id) => id > 0;

const getAll = () => {
    return usersRepository.get();
};

const create = async (username, pasword) => {
    if (validateUser(username, pasword)) {
        return (await usersRepository.create(username, pasword));
    }
    else {
        console.log(`in create`);
        console.log(username);
        console.log(pasword);
        throw(new Error(`Not a valid user`));
    }
};

const updatePokemon = async (username, pasword, pokemonNum, pokemonName) => {
    const validNumbers = [1,2,3,4,5,6];
    
    if (typeof pokemonNum != `number` || !(validNumbers.includes(pokemonNum))) {
        throw(new Error(`pokemonNum is not valid`));
    }
    //If the inputs are valid, update the pokemon
    pokemonnum = `pokemon`.concat(String(pokemonNum));
    return (await usersRepository.updatePokemon(username, pokemonnum, pokemonName));
};

const deletePokemon = async (username, pasword, pokemonNum) => {
    // Validate inputs
    // pokmeonNum is the number of the pokemon in the team
    const validNumbers = [1,2,3,4,5,6];
    if (typeof pokemonNum != `number` || !(validNumbers.includes(pokemonNum))) { 
        throw(new Error(`pokemonNum is not valid`));
    }
    // If the inputs are valid, delete the pokemon
    pokemonnum = `pokemon`.concat(String(pokemonNum));
    if (validateUser(username, pasword)) {
        return (await usersRepository.updatePokemon(username, pokemonnum, null));
    }
    else {
        console.log(`deleat`);
        console.log(username);
        throw(new Error(`Not a valid user`));
    }
};

const getPokeId = (num) => {
    const pokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    let id = document.getElementById(`pokemon`.concat(String(num))).value;
    fetch(pokemonURL(id))
        .then((data) => data.json(data))
        .then((data) => {
            let name = data.name;
            let id = data.id;
            let exp = data.base_experience;
            let height = data.height;
            let weight = data.weight;
            document.getElementById(`name`.concat(String(num))).innerHTML = `${name}`;
            document.getElementById(`id`.concat(String(num))).innerHTML = `${id}`;
            document.getElementById(`exp`.concat(String(num))).innerHTML = `${exp}`;
            document.getElementById(`height`.concat(String(num))).innerHTML = `${height}`;
            document.getElementById(`weight`.concat(String(num))).innerHTML = `${weight}`;
        }).catch((error) => {
            console.log(`API Warning:`, error);
            document.getElementById(`APIwarning`).style.visibility = `visible`;});
  
    return false;
};


module.exports = {
    validateUser,
    getById,
    getAll,
    create,
    getByUsername,
    updatePokemon,
    deletePokemon,
    checkPasword,
    getPokeId
};
