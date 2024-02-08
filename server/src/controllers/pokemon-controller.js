const axios = require(`axios`);
const express = require(`express`);



const pokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const getPokeId = async (id) => {

    const response = await axios.get(pokemonURL(id));
    return response.data;
};
const pokemonDetails = async (request, response) => {
    getPokeId(request.params.id)
        .then((oupt) => response.status(200).json(oupt))
        .catch((err) => response.status(500).json(err));
    return response.status(200).json(data);};
module.exports = {pokemonDetails};