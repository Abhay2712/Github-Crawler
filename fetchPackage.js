const axios = require('axios').default;

async function getJSON(str) {
  try {
    const response = await axios.get(str);
    return (response.data);
  } catch (error) {
    console.error(error);
  }
}


module.exports = { getJSON };

