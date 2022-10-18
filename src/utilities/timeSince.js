const timeObj = {
  sec: 1000,
  min: 60000,
  hr: 3600000,
  mon: 2629800000,
  yr: 31557600000
};

const timeSince = (time) => {
  const timeDiff = new Date() - new Date(time * 1000);
  let finalTime;
  Object.keys(timeObj).forEach((e) => {
    if (timeDiff / timeObj[e] >= 1) {
      finalTime = `${(timeDiff / timeObj[e]).toFixed(2)} ${e}`;
    } else return;
  });
  return finalTime;
};

export default timeSince;
