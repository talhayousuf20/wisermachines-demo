export const parseDataFromSSN = (msg, index) => {
  const packets = !isEmpty(msg) ? msg : [];

  let timeStamps = [];
  let timeStampEnd = 0;
  let timeStampStart = 0;

  let temperature = [];
  let temperatureNow = 0;
  let humidity = [];
  let humidityNow = 0;

  let loadCurrent = [];
  let currentInGivenInterval = [];
  let instantPower = [];
  let unitsConsumed = 0;

  let machineState = [];
  let machineStateStr = [];
  let statesInGivenInterval = [];
  let upCount = 0;
  let downCount = 0;
  let operationCount = 0; // no of times state went from ON to OFF/IDLE
  let utilization = 0;
  let uptime = 0;
  let downtime = 0;

  // Time filter
  const interval = 5;
  const numOfHours =
    index === 1 ? 1 : index === 2 ? 24 : index === 3 ? 24 * 7 : 1;
  const lastHour = 60 * (60 / interval); // 60 min x 60 sec / 5 sec
  const timeFrame = numOfHours * lastHour;

  // Parse Packets
  try {
    temperature = packets.map((packet) => {
      return packet.temperature;
    });

    humidity = packets.map((packet) => {
      return packet.humidity;
    });

    timeStamps = packets.map((packet) => {
      return Date.parse(packet.timestamp.slice(0, -1));
    });

    loadCurrent = packets.map((packet) => {
      return packet.load_current;
    });

    machineStateStr = packets.map((packet) => {
      return packet.status;
    });
  } catch (error) {
    console.log(error);
  }

  // Calculate
  try {
    temperatureNow = Math.round(temperature.slice(-1)[0]);
    humidityNow = Math.round(humidity.slice(-1)[0]);

    timeStampStart = timeStamps[0];
    timeStampEnd = timeStamps.slice(-1)[0];

    currentInGivenInterval = loadCurrent.slice(-timeFrame);
    instantPower = currentInGivenInterval.map((current) => {
      return 1.732 * 0.95 * 400 * current;
    });

    const numOfHoursActual = (currentInGivenInterval.length * interval) / 3600;

    unitsConsumed = Math.round(
      (arrayAverage(instantPower) / 1000) * numOfHoursActual
    );

    machineState = machineStateStr.map((state) => {
      if (state === "OFF") {
        return 0;
      } else if (state === "IDLE") {
        return 1;
      } else if (state === "ON") {
        return 2;
      } else return 0;
    });

    statesInGivenInterval = machineState.slice(-timeFrame);
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

    utilization = Math.round((upCount / statesInGivenInterval.length) * 100);

    uptime = minutesToHours(Math.round(upCount / (60 / interval)));
    downtime = minutesToHours(Math.round(downCount / (60 / interval)));
  } catch (error) {
    console.log(error);
  }

  // Date and time
  const dateTime = new Date();
  const date = dateTime.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const time = dateTime.toLocaleTimeString("en-US");

  // Result
  let resultantObj = {};

  const updatedValues = [
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
  ];

  const defaultValues = [0, 0, [], [], [], 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const values = updatedValues.map((item, index) =>
    item === undefined || item === null ? defaultValues[index] : item
  );

  const keys = [
    "timeStampStart",
    "timeStampEnd",
    "loadCurrent",
    "machineState",
    "timeStamps",
    "temperatureNow",
    "humidityNow",
    "utilization",
    "uptime",
    "downtime",
    "date",
    "time",
    "unitsConsumed",
    "operationCount",
  ];

  values.map((value, index) => {
    resultantObj = { ...resultantObj, [keys[index]]: value };
    return index;
  });

  return resultantObj;
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
