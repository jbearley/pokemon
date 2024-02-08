const getPokeId = (num,user,pass) => {
    const pokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    let id = document.getElementById("pokemon".concat(String(num))).value;
    console.log(id);
    if(id != null){
        fetch(pokemonURL(id))
        .then((data) => data.json(data))
        .then((data) => {
            let name = data.name
            let id = data.id
            let exp = data.base_experience
            let height = data.height
            let weight = data.weight
            document.getElementById("name".concat(String(num))).innerHTML = `${name}`
            document.getElementById("id".concat(String(num))).innerHTML = `${id}`
            document.getElementById("exp".concat(String(num))).innerHTML = `${exp}`
            document.getElementById("height".concat(String(num))).innerHTML = `${height}`
            document.getElementById("weight".concat(String(num))).innerHTML = `${weight}`
            })
    };
    
    
    //username, pasword, pokemonNum, pokemonName
    const userURL = (user) => `http://127.0.0.1:3002/users/${user}`; //http://127.0.0.1:3002/users/Kal-buir
    console.log(userURL(user))
    fetch(userURL(user), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user, pasword: pass, pokemonNum: num, pokemonName: id}) 
        });
    return false;
    };


const getPokeIdFromUSer = (user,num) => {
    const pokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonNum = (num) => `pokemon${num}`
    let id = user[pokemonNum(num)];
    fetch(pokemonURL(id))
    .then((data) => data.json(data))
    .then((data) => {
        let name = data.name
        let id = data.id
        let exp = data.base_experience
        let height = data.height
        let weight = data.weight
        document.getElementById("name".concat(String(num))).innerHTML = `${name}`
        document.getElementById("id".concat(String(num))).innerHTML = `${id}`
        document.getElementById("exp".concat(String(num))).innerHTML = `${exp}`
        document.getElementById("height".concat(String(num))).innerHTML = `${height}`
        document.getElementById("weight".concat(String(num))).innerHTML = `${weight}`
    })
    return false;
    };


const displayUserTeam = (user) => {
    for (let i = 0; i < 6; i++) {
        getPokeIdFromUSer(user,i+1);
      };
};
const getUserPoke = (user) => {
    const userURL = (user) => `http://127.0.0.1:3002/users/${user}`; //http://127.0.0.1:3002/users/Kal-buir
    fetch(userURL(user))
        .then((data) => data.json(data))
        .then((data) => {
            let user = data[0];
            displayUserTeam(user);
        })
    return false;
};

