const { healthCheck } = require(`./controllers/health-controller`);
const { addUser, getUser, getUsers, getUserByUsername, updatePokemon1, deletePokemon, checkPasword  } = require(`./controllers/user-controller`);
const { pokemonDetails } = require(`./controllers/pokemon-controller`);
const initRoutes = (app) => {
    app
        .route(`/health`)
        .get(healthCheck);

    app
        .route(`/users`)
        .get(getUsers)
        .put(checkPasword)  
        .post(addUser);

    app
        .route(`/user/:id`)
        .get(getUser);
        

    app
        .route(`/users/:username`)
        .get(getUserByUsername)
        .put(updatePokemon1);
    //.put(deletePokemon);

    app
        .route(`/test2`)
        .get(function(req, res){
            res.sendfile(path.join(__dirname, `team_page2.html`));
        });
        
};

module.exports = { initRoutes };
