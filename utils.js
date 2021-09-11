const isDevEnv = () => process.env.NODE_ENV != "production";

//  49152 to 65535 (inclusive)
const genRandPort = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// date format
const currentDateTime = () => {
  const date = new Date();
  const day = date.getDay().toString().padStart(2, 0);
  const month = date.getMonth().toString().padStart(2, 0);
  const year = date.getFullYear().toString().padStart(2, 0);
  const time = date.toTimeString().split(" ").splice(0, 2).join(" ");

  return `${day}-${month}-${year} ${time}`;
};

// log
const log = (data) => console.log(`[${currentDateTime()}]`, data);

module.exports = Object.freeze({
  genRandPort,
  isDevEnv,
  currentDateTime,
  log,
});
