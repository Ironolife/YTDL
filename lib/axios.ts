import _axios from 'axios';

export const axios = _axios.create({});

axios.interceptors.response.use(undefined, (err) => {
	if (err) throw err.response.data;
});
