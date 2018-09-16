export const hrsMinsSecs = (seconds) => {
  let hrsFl = seconds/3600;
  let minsFl = (hrsFl - parseInt(hrsFl))*60;
  let secsFl = (minsFl - parseInt(minsFl))*60;
  let hrs = "";
  let mins = "";
  let secs = "";
  hrsFl < 10 ? hrs += `0${parseInt(hrsFl).toString()}` : hrs = `${parseInt(hrsFl).toString()}`;
  minsFl < 10 ? mins += `0${parseInt(minsFl).toString()}` : mins = `${parseInt(minsFl).toString()}`;
  secsFl < 10 ? secs += `0${parseInt(secsFl).toString()}` : secs = `${parseInt(secsFl).toString()}`;
  return hrs+":"+mins+":"+secs;
}

export const displayDate = (createdAt) => {
  return createdAt.slice(0,10);
}
