import {useContext, useState} from 'react';
import {WeeklyDataContext} from '../../App';
import moment from 'moment';
import {useEffect} from 'react';
import {getSteps} from '../../api/api';

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
  const [isLoading, setIsLoading] = useState(true);
  const {weeklySteps, setWeeklySteps} = useContext(WeeklyDataContext);

  const getWeeklySteps = async () => {
    const steps = await getSteps();
    setWeeklySteps(steps);
    setIsLoading(false);
  };

  useEffect(() => {
    if (weeklySteps?.length) {
      setIsLoading(false);
    } else {
      getWeeklySteps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  return {data, isLoading};
};
