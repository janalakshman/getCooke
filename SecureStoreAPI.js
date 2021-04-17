import * as SecureStore from 'expo-secure-store';

const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
};

const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
};

export default {
	setItem: setToken,
	getItem: getToken
}