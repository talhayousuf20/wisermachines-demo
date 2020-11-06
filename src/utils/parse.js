export const parsePacketsFromSSN = (packets) => {
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
    if (machine1State[i] === "OFF") {
      machine1State[i] = 0;
    }
    if (machine1State[i] === "IDLE") {
      machine1State[i] = 1;
    }
    if (machine1State[i] === "ON") {
      machine1State[i] = 2;
    }
  }
  // console.log(machine1State);

  let onCount = 0;
  let utilization;
  let lastHour = 3600; // 60 min x 60 sec
  let utilizationSince;

  let statesInGivenInterval = machine1State.slice(-lastHour);
  for (let i = 0; i < statesInGivenInterval.length; i++) {
    if (statesInGivenInterval[i] === 2) {
      onCount++;
    }
  }

  // console.log(statesInGivenInterval);

  utilization = (onCount / statesInGivenInterval.length) * 100;
  utilizationSince = "Since Last Hour";

  // console.log(utilization);

  return {
    machine1Current,
    timeStamp: {
      start: String(timeStamps.slice(1)[0].slice(0, -1)),
      end: String(timeStamps.slice(-1)[0].slice(0, -1)),
    },
    machine1State,
    utilization: {
      value: utilization.toFixed(0),
      since: utilizationSince,
    },
  };
};
