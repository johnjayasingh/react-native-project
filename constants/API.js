import Bitcoin from "react-native-bitcoinjs-lib";

export const SKIP_LOGIN_LOADING = false;
export const API_TIMEOUT = 30000;
export const BALANCE_SYNC_ON = false;

// export const HOST = "192.168.10.90";
// export const PORT = "8080";

// export const HOST = "34.193.72.60";
// export const PORT = "8080";

// export const HOST = '0.0.0.0';
// export const PORT = '8080';

// const SOCKET_PORT = "3000";

// export const API = `http://${HOST}:${PORT}`;
// export const SOCKET = `http://${HOST}:${SOCKET_PORT}`;

export const API = `https://api.orichalcum.co/`;
export const SOCKET = `https://api.orichalcum.co/`;
export const BITCOIN_NETWORK = Bitcoin.networks.testnet;
