import moment from 'moment';
import {WEEKENDS_EN} from '~/constants';

export const capitalizeFirstLetter = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const formatTime = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

export const findIndexDay: any = (day: any) => {
  if (!WEEKENDS_EN.includes(day.toLowerCase().trim())) return;
  for (let i = 0; i < WEEKENDS_EN.length; i++) {
    if (WEEKENDS_EN[i] == day.toLowerCase().trim()) {
      return i;
    }
  }
};

export const groupDayOfWeek = (schedule: any) => {
  const result: any = [];
  for (let i = 0; i < schedule.length; i++) {
    if (result[findIndexDay(schedule[i].day)]?.length > 0) {
      result[findIndexDay(schedule[i].day)].push(schedule[i]);
    } else {
      result[findIndexDay(schedule[i].day)] = [schedule[i]];
    }
  }
  return result;
};
