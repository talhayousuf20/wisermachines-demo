export const parsePacketsFromSSN = (packets) => {
  let temperature = packets.map((packet) => {
    return packet.data.temperature;
  });

  let humidity = packets.map((packet) => {
    return packet.data.humidity;
  });

  // console.log(temperature, humidity);

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

  let upCount = 0;
  let downCount = 0;
  let utilization;
  let lastHour = 3600; // 60 min x 60 sec
  let utilizationSince;
  let uptime, downtime;

  let statesInGivenInterval = machine1State.slice(-lastHour);
  for (let i = 0; i < statesInGivenInterval.length; i++) {
    if (statesInGivenInterval[i] === 2) {
      upCount++;
    } else downCount++;
  }

  // console.log(statesInGivenInterval);

  utilization = (upCount / statesInGivenInterval.length) * 100;
  utilizationSince = "For Last Hour";

  uptime = upCount / 60;
  downtime = downCount / 60;

  // console.log(utilization);

  let timeStampStart = String(timeStamps.slice(1)[0].slice(0, -1));
  let timeStampEnd = String(timeStamps.slice(-1)[0].slice(0, -1));

  let dateTime = new Date(timeStampEnd);
  let date = dateTime.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let time = dateTime.toLocaleTimeString("en-US");

  let newData;
  let currentDateTime = new Date();

  if (dateTime.getHours() === currentDateTime.getHours()) {
    newData = true;
  } else newData = false;

  return {
    machine1Current,
    timeStamp: {
      start: timeStampStart,
      end: timeStampEnd,
    },
    machine1State,
    utilization: {
      value: utilization.toFixed(0),
      since: utilizationSince,
    },
    uptime: uptime.toFixed(0),
    downtime: downtime.toFixed(0),
    temperature: temperature.slice(-1)[0].toFixed(1),
    humidity: humidity.slice(-1)[0].toFixed(0),
    date: date,
    time: time,
    newData: newData,
  };
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "array" && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const arrayAverage = (arr) => {
  const average = arr.reduce((sume, el) => sume + el, 0) / arr.length;
  return average;
};
