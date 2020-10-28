import { FETCH_SSNDATA } from './types';

import io from 'socket.io-client';
import { keys_dev } from '../config/keys_dev';

const client = io(keys_dev.WEBSOCKET_SERVER, {
	transports: ['websocket', 'polling'],
});

export const connectToWebSocketServer = () => {
	client.emit('Start', 'Start sending the data');
};

export const fetchSSNData = () => (dispatch) => {
	client.on('message', (packets) => {
		console.log(packets);
		dispatch({
			type: FETCH_SSNDATA,
			payload: packets,
		});
	});
};
