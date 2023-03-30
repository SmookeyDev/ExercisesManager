import { Variables } from 'react-relay';
import axios from '../utils/axiosInstance';

export const fetchGraphQL = async (
  query: string,
  variables: Variables,
) => {
  const body = JSON.stringify({
    query,
    variables,
  });
  
  try {
    const response = await axios.post('', body);
    return response?.data;
  }
  catch (err) {
    return err.response?.data;
  }
};
