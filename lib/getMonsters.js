const fetch = require('node-fetch');
// const URL = 'https://www.dnd5eapi.co/api/monsters';

const getMonsters = async(URL) => {
    let data = await fetch(URL);
    return await data.json();
}

module.exports = getMonsters;