import network from '../../services/network';

export const loginApi = async (credentials) => {
    const params = new URLSearchParams(credentials).toString();
    // const response = await network.get('/login', credentials);
    const response = await network.get(`/login?${params}`);
    return response.data;
};
