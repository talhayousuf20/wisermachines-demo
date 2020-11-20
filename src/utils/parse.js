export const parseDataFromSSN = (packets) => {
  const interval = 1000;

  const timeStamps = packets.map((packet) => {
    return Date.parse(packet.timestamp.slice(0, -1));
  });

  const timeStampStart = timeStamps[0];
  const timeStampEnd = timeStamps.slice(-1)[0];

  // console.log(timeStampStart, timeStampEnd);

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

  // const upCount = 0;
  // const downCount = 0;
  // const utilization;
  // const lastHour = 3600; // 60 min x 60 sec
  // const utilizationSince;
  // const uptime, downtime;

  // const statesInGivenInterval = machine1State.slice(-lastHour);
  // for (const i = 0; i < statesInGivenInterval.length; i++) {
  //   if (statesInGivenInterval[i] === 2) {
  //     upCount++;
  //   } else downCount++;
  // }

  // // console.log(statesInGivenInterval);

  // utilization = (upCount / statesInGivenInterval.length) * 100;
  // utilizationSince = "For Last Hour";

  // uptime = upCount / 60;
  // downtime = downCount / 60;

  // // console.log(utilization);

  // const dateTime = new Date(timeStampEnd);
  // const date = dateTime.toLocaleDateString(undefined, {
  //   weekday: "short",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // const time = dateTime.toLocaleTimeString("en-US");

  // const newData;
  // const currentDateTime = new Date();

  // if (dateTime.getHours() === currentDateTime.getHours()) {
  //   newData = true;
  // } else newData = false;

  // const temperature = packets.map((packet) => {
  //   return packet.temperature;
  // });

  // const humidity = packets.map((packet) => {
  //   return packet.humidity;
  // });

  return {
    timeStampStart,
    timeStampEnd,
    loadCurrent,
    machineState,
    interval,
    timeStamps,
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
