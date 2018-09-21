export const distanceThisWeek = (activities) => {
  let today = new Date();
  let output = [];

  [7,6,5,4,3,2,1].forEach((num,i) => {
    let day = new Date(today - (1000*60*60*24*num));
    output.push({ date: day.getDay(), distance: 0, formattedDate: day, weekday: DAYS[day.getDay()], duration: 0, elevation: 0, });
  });

  activities.forEach((activity) => {
    let workoutDate = parseDate(activity.date);
    if (daysBetween(workoutDate, today) <= 7) {
      let i;
      output.forEach((obj, idx) => {
        if (obj.date === workoutDate.getDay()) {
          i = idx
        }
      })
      output[i].distance += activity.distance;
      output[i].duration += activity.duration;
      output[i].elevation += activity.elevation;
    }
  });

  return output.sort((a, b) => {
    if (a.formattedDate > b.formattedDate) return 1;
    if (a.formattedDate < b.formattedDate) return -1;
    return 0;
  });
}

export const totalField = (activities, field) => {
  let output = 0;
  activities.forEach((activity) => {
    output += activity[field];
  });
  return output.toFixed(1);
}

export const daysBetween = ( date1, date2 ) => {
  let one_day=1000*60*60*24;

  let date1_ms = date1.getTime();
  let date2_ms = date2.getTime();

  let difference_ms = date2_ms - date1_ms;

  return Math.round(difference_ms/one_day);
}

const parseDate = (date) => {
  date = date.split('-');
  let output = [parseInt(date[0]), (parseInt(date[1])), parseInt(date[2])]
  return new Date(output);
}

const DAYS = ['Su','M','T','W','Th','F','S'];

export const sort_by_activity = (activities, type) => {
  type === true ? type = "WALKING" : type = "BICYCLING";
  let output = [];
  activities.forEach((activity) => {
    if (activity.activity_type === type){
      output.push(activity);
    }
  });
  return output;
}

export const emptyDateData = () => {
  let today = new Date();
  let output = [];

  [7,6,5,4,3,2,1].forEach((num,i) => {
    let day = new Date(today - (1000*60*60*24*num));
    output.push({ date: day.getDay(), distance: 0, formattedDate: day, weekday: DAYS[day.getDay()], duration: 0, elevation: 0, });
  });

  return output;
}
