export const parseDataFromSSN = (msg, index) => {
  const packets = !isEmpty(msg) ? msg : [];

  let upCount = 0;
  let downCount = 0;
  let operationCount = 0; // no of times state went from ON to OFF/IDLE

  const interval = 5;
  const numOfHours =
    index === 1 ? 1 : index === 2 ? 24 : index === 3 ? 24 * 7 : 1;
  const lastHour = 60 * (60 / interval); // 60 min x 60 sec / 5 sec
  const timeFrame = numOfHours * lastHour;

  const temperature = packets.map((packet) => {
    return packet.temperature;
  });

  const humidity = packets.map((packet) => {
    return packet.humidity;
  });

  const temperatureNow = Math.round(temperature.slice(-1)[0]);
  const humidityNow = Math.round(humidity.slice(-1)[0]);

  const timeStamps = packets.map((packet) => {
    return Date.parse(packet.timestamp.slice(0, -1));
  });

  const timeStampStart = timeStamps[0];
  const timeStampEnd = timeStamps.slice(-1)[0];

  const loadCurrent = packets.map((packet) => {
    return packet.load_current;
  });

  const currentInGivenInterval = loadCurrent.slice(-timeFrame);

  const instantPower = currentInGivenInterval.map((current) => {
    return 1.732 * 0.95 * 400 * current;
  });

  const numOfHoursActual = (currentInGivenInterval.length * interval) / 3600;
  const unitsConsumed = Math.round(
    (arrayAverage(instantPower) / 1000) * numOfHoursActual
  );

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

  const statesInGivenInterval = machineState.slice(-timeFrame);
  for (let i = 0; i < statesInGivenInterval.length; i++) {
    if (statesInGivenInterval[i] === 2) {
      upCount++;
    } else downCount++;

    if (statesInGivenInterval[i] === 2) {
      if (
        statesInGivenInterval[i + 1] === 1 ||
        statesInGivenInterval[i + 1] === 0
      )
        operationCount++;
    }
  }

  const utilization = Math.round(
    (upCount / statesInGivenInterval.length) * 100
  );
  const uptime = minutesToHours(Math.round(upCount / (60 / interval)));
  const downtime = minutesToHours(Math.round(downCount / (60 / interval)));

  const dateTime = new Date();
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
    unitsConsumed,
    operationCount,
  };
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value instanceof Array && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const arrayAverage = (arr) => {
  const average = arr.reduce((sume, el) => sume + el, 0) / arr.length;
  return average;
};

const minutesToHours = (minutes) => {
  if (minutes <= 60) {
    return `00:${pad(minutes, 2)}`;
  } else {
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return `${pad(hh, 2)}:${pad(mm, 2)}`;
  }
};

const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
