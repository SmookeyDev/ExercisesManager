import { Variables } from 'react-relay';
import axios from '../../utils/axiosInstance';

interface ISession {
  user: {
    name: string;
    email: string;
    picture: string;
  };
  accessToken: string;
  expires: string;
}

export const fetchGraphQL = async (
  query: string,
  variables: Variables,
) => {
  const body = JSON.stringify({
    query,
    variables,
  });

  const response = await axios.post('', body);
  return response?.data;
};
