export const distanceThisWeek = (activities) => {
  let today = new Date();
  let output = [];

  [6,5,4,3,2,1,0].forEach((num,i) => {
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
  let sortedOutput;

  sortedOutput = output.sort((a, b) => {
    if (a.formattedDate > b.formattedDate) return 1;
    if (a.formattedDate < b.formattedDate) return -1;
    return 0;
  });
  return sortedOutput;
}

export const distanceAllWeeks = (activities) => {
  const output = [];
  let oldestSunday = getNearestSunday(getOldestActivity(activities));
  const sundayArray = makeSundayArray(oldestSunday);

  sundayArray.forEach( sunday => {
    let week = [];
    [6,5,4,3,2,1,0].forEach((num,i) => {
      let day = new Date(sunday - (1000*60*60*24*num));
      week.push({ date: day.getDay(), distance: 0, formattedDate: day, weekday: DAYS[day.getDay()], duration: 0, elevation: 0, });
    });

    activities.forEach((activity) => {
      let workoutDate = parseDate(activity.date);
      if (daysBetween(workoutDate, sunday) <= 7) {

        week.forEach((obj, idx) => {
          if (obj.formattedDate.getDate() === workoutDate.getDate()) {
            week[idx].distance += activity.distance;
            week[idx].duration += activity.duration;
            week[idx].elevation += activity.elevation;
          }
        })

      }
    });

    output.push(week);

  });

  return output;
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

export const parseDate = (date) => {
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

export const getNearestSunday = (date) => {
  let millisecs = date.getTime();
  while (new Date(millisecs).getDay() !== 0) {
    millisecs = millisecs + (1000*60*60*24);
  }
  return new Date(millisecs);
}

export const getOldestActivity = (activities) => {
  const sorted = activities.sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) return 1;
    if (new Date(a.date) < new Date(b.date)) return -1;
    return 0;
  });
  let oldest = sorted[0];
  return new Date(oldest.date)
}

const makeSundayArray = (oldestSunday) => {
  const sundays = [oldestSunday];
  while (oldestSunday < getNearestSunday(new Date())) {
    oldestSunday = new Date(oldestSunday.getTime() + (1000*60*60*24*7))
    sundays.push(oldestSunday)
  }
  return sundays;
}
