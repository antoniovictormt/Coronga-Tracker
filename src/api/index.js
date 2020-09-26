import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fechData = async () => {
  try {
    const { data: { confirmed, deaths, recovered, lastUpdate } } = await axios.get(url);

    const modifiedData = { confirmed, deaths, lastUpdate, recovered }

    return modifiedData;
  } catch (error) {

  }
}