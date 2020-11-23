export const parseDataFromSSN = (packets) => {
  const temperature = packets.map((packet) => {
    return packet.temperature;
  });

  const humidity = packets.map((packet) => {
    return packet.humidity;
  });

  const temperatureNow = temperature.slice(-1)[0];
  const humidityNow = humidity.slice(-1)[0];

  const timeStamps = packets.map((packet) => {
    return Date.parse(packet.timestamp.slice(0, -1));
  });

  const timeStampStart = timeStamps[0];
  const timeStampEnd = timeStamps.slice(-1)[0];

  const loadCurrent = packets.map((packet) => {
    return packet.load_current;
  });

  const machineStateStr = packets.map((packet) => {
    return packet.status;
  });

  const machineState = machineStateStr.map((state) => {
    if (state === "OFF") {
      return 0;
    } else if (state === "IDLE") {
      return 1;
    } else if (state === "ON") {
      return 2;
    } else return 0;
  });

  let upCount = 0;
  let downCount = 0;
  let lastHour = 3600 / 5; // 60 min x 60 sec / 5 sec

  const statesInGivenInterval = machineState.slice(-lastHour);
  for (let i = 0; i < statesInGivenInterval.length; i++) {
    if (statesInGivenInterval[i] === 2) {
      upCount++;
    } else downCount++;
  }

  const utilization = (upCount / statesInGivenInterval.length) * 100;
  const uptime = upCount / 60;
  const downtime = downCount / 60;

  const dateTime = new Date(1606147452097);
  const date = dateTime.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = dateTime.toLocaleTimeString("en-US");

  return {
    timeStampStart,
    timeStampEnd,
    loadCurrent,
    machineState,
    timeStamps,
    temperatureNow,
    humidityNow,
    utilization,
    uptime,
    downtime,
    date,
    time,
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

const uptoNow = (dateStr) => {
  const target = new Date(dateStr);
  const now = new Date();
  const difference = now.getTime() - target.getTime();

  return difference;
};

const getZeros = (interval, timeDiff) => {
  if (timeDiff > interval) {
    const noOfValuesToAppend = Math.floor(timeDiff / interval);
    return new Array(noOfValuesToAppend).fill(0);
  }
};
