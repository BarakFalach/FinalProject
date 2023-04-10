import {useContext} from 'react';
import {WeeklyDataContext} from '../../App';
import moment from 'moment';

function formatDate(date) {
  const formattedDate = moment(date).format('ddd');
  return formattedDate;
}

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const getFormattedDate = howManyDaysBefore => {
  const date = new Date();
  date.setDate(date.getDate() - howManyDaysBefore);
  return formatDate(date);
};

export const useWeeklySteps = () => {
  const {weeklySteps} = useContext(WeeklyDataContext);
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  weeklySteps?.forEach((steps, index) => {
    data.labels.push(getFormattedDate(index));
    data.datasets[0].data.push(steps);
  });
  return {data};
};
