import Card from "components/card";
import PieChart from "components/charts/PieChart";
import { useEffect, useState } from "react";
import { pieChartOptions } from "variables/charts";

const PieChartCard = ({ data }) => {
  const [chartdata, setChartdata] = useState([]);
  const [chartOption, setChartOption] = useState({});
  const [total, setTotal] = useState(0)

  const colors = [
    "#4318FF",
    "#6AD2FF",
    "#9999ff",
    "#6499E9",
    "#A6F6FF",
    "#071952",
  ];

  useEffect(() => {
    if (data) {
      setChartdata(formattedChartData(data));
      setChartOption(formattedChartOption(data));
    }
  }, [data]);

  const formattedChartData = (paramData) => {
    const value = paramData?.map((item) => item.total);
    const sum = value?.reduce((a, b )=> a + b, 0)
    setTotal(sum)
    return value;
  };
  const formattedChartOption = (data) => {
    const value = data?.map((item) => item.name);
    const colorsArray = colors.slice(0, value.length);

    return {
      ...pieChartOptions,
      labels: value,
      colors: colorsArray,
      fill: {
        colors: colorsArray,
      },
    };
  };
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Số học viên đăng ký
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={chartOption} series={chartdata} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {data?.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center"
            key={index}
          >
            <div className="flex items-center justify-center">
              <div
                className={`h-2 w-2 rounded-full`}
                style={{ backgroundColor: colors[index] }}
              />

              <p className="ml-1 text-sm font-normal text-gray-600">
                {item?.name}
              </p>
            </div>
            <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
              {Math.round((item?.total / total) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PieChartCard;
