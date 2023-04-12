import {useState} from 'react';
import moment from 'moment';
import {getSteps, getPersonalMonth as getPersonalMonthApi} from '../../api/api';
import {useUser} from '../../hooks/useUser';

function formatDate(date) {
  const formattedDate = moment(date).format('ddd');
  return formattedDate;
}

export const useSteps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const {user} = useUser();

  const getPersonalMonth = async () => {
    setIsLoading(true);
    const steps = await getPersonalMonthApi();
    const newData = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };
    steps.forEach(stepMonthObject => {
      newData.labels.push(stepMonthObject?.month);
      newData.datasets[0].data.push(stepMonthObject?.steps);
    });
    //TODO:: and today's step count
    setData(newData);
    setIsLoading(false);
  };

  const getPersonalWeek = async () => {
    setIsLoading(true);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 7);

    const steps = await getSteps({
      startDate: sixDaysAgo,
      endDate: yesterday,
    });
    const newData = {
      labels: [formatDate(new Date())],
      datasets: [
        {
          data: [user?.todayStepCount],
        },
      ],
    };

    steps?.forEach(stepObject => {
      newData.labels.push(formatDate(stepObject?.date));
      newData.datasets[0].data.push(stepObject?.steps);
    });
    setData(newData);
    setIsLoading(false);
  };

  return {data, isLoading, getPersonalWeek, getPersonalMonth};
};
