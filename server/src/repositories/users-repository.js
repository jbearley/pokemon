// TODO: call a db or external api or whatever here
const { pool } = require(`../db-config`);

const get = async () => {
    const res = await pool.query(`SELECT * FROM users`);
    return res.rows;
};

const getById = async (id) => {
    const res = await pool.query(`SELECT * FROM users where id=$1`, [id]);
    return res.rows;
};

const getByUsername = async (username) => {
    const res = await pool.query(`SELECT * FROM users where username=$1`, [username]);
    return res.rows;
};


const create = async (username, pasword) => {
    return await pool.query(
        `INSERT INTO users (username, pasword) VALUES ($1, $2) RETURNING id`,
        [username, pasword],
    );
};

const updatePokemon = async (username, pokemonNum, pokemonName) => {
    if (pokemonName != null){
        funct = `UPDATE users SET `.concat(pokemonNum).concat(` = '`).concat(pokemonName).concat(`' WHERE username = '`).concat(username).concat(`';`);
    }else{
        funct = `UPDATE users SET `.concat(pokemonNum).concat(` = `).concat(pokemonName).concat(` WHERE username = '`).concat(username).concat(`';`);
    };
    
    return await pool.query(
        funct
    );
};


const deleteAll = async (whichIds) => {
    return await pool.query(
        `DELETE from users WHERE id = ANY($1::int[])`, [whichIds],
    );
};

module.exports = {
    get,
    create,
    getById,
    getByUsername,
    deleteAll,
    updatePokemon,
    pool,
};