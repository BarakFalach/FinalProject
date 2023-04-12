import {useState} from 'react';
import moment from 'moment';
import {
  getSteps,
  getPersonalMonth as getPersonalMonthApi,
  getGroupDay,
} from '../../api/api';
import {useUser} from '../../hooks/useUser';

function formatDate(date) {
  const formattedDate = moment(date).format('ddd');
  return formattedDate;
}

const dates = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  // yesterday.setHours(0, 0, 0, 0);
  const endDate = new Date(
    Date.UTC(
      yesterday.getUTCFullYear(),
      yesterday.getUTCMonth(),
      yesterday.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
  const sixDaysAgo = new Date();
  sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

  const startDate = new Date(
    Date.UTC(
      sixDaysAgo.getUTCFullYear(),
      sixDaysAgo.getUTCMonth(),
      sixDaysAgo.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
  return {startDate, endDate};
};

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
    const {startDate, endDate} = dates();

    const steps = await getSteps({
      startDate,
      endDate,
    });
    //move adding the current steps to server
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

  const getGroupWeek = async () => {
    setIsLoading(true);
    const {startDate, endDate} = dates();

    const steps = await getGroupDay({
      startDate,
      endDate,
    });
    const newData = {
      labels: [],
      datasets: [
        {
          data: [],
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

  return {data, isLoading, getPersonalWeek, getPersonalMonth, getGroupWeek};
};
