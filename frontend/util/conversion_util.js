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

export const hrs = (seconds) => {
  return parseInt(seconds/3600)
}

export const mins = (seconds) => {
  let hrsFl = seconds/3600;
  return parseInt((hrsFl - parseInt(hrsFl))*60);
}

export const secs = (seconds) => {
  let hrsFl = seconds/3600;
  let minsFl = (hrsFl - parseInt(hrsFl))*60;
  return parseInt((minsFl - parseInt(minsFl))*60);
}

export const displayDate = (createdAt) => {
  return createdAt.slice(0,10);
}

export const yyyyMmDdDefault = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd;
  }

  if(mm<10) {
    mm='0'+mm;
  }

  return yyyy+'-'+mm+'-'+dd;
}

export const allToSeconds = (unit, input) => {
  switch (unit) {
    case "s":
      return parseInt(input)
    case "min":
      return parseInt(input)*60
    case "hr":
      return parseInt(input)*3600
  }
}
