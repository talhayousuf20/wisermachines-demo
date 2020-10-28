export const parse = (packets) => {
	// console.log(packets);

	let machine1Current = packets.map((packet) => {
		return packet.data.machines[0].machine_load_current;
	});
	// console.log(machine1Current);

	let timeStamps = packets.map((packet) => {
		return packet.timeStamp;
	});
	// console.log(timeStamps);

	let nodeID = packets.map((packet) => {
		return packet.MAC;
	});
	// console.log(nodeID);

	let machine1State = packets.map((packet) => {
		return packet.data.machines[0].machine_status;
	});
	// console.log(machine1State);

	// machine1State = ['OFF', 'IDLE', 'ON', 'OFF', 'IDLE', 'ON', 'OFF', 'IDLE', 'ON'];

	for (let i = 0; i < machine1State.length; i++) {
		if (machine1State[i] === 'OFF') {
			machine1State[i] = 0;
		}
		if (machine1State[i] === 'IDLE') {
			machine1State[i] = 1;
		}
		if (machine1State[i] === 'ON') {
			machine1State[i] = 2;
		}
	}
	// console.log(machine1State);

	let onCount = 0;
	for (let i = 0; i < machine1State.length; i++) {
		if (machine1State[i] === 1) {
			onCount++;
		}
	}
	let utilization = (onCount / machine1State.length) * 100;
	// console.log(utilization);

	return {
		machine1Current,
		timeStamp: String(timeStamps.slice(1).slice(-1)),
		nodeID: nodeID[0],
		utilization: utilization.toFixed(2),
		machine1State,
	};
};