import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { useEffect, useState } from "react";
import { barchartOptions } from "variables/charts";


const ColumneChart = ({ data, name }) => {
  const [chartdata, setChartdata] = useState([]);
  const [chartOption, setChartOption] = useState({});

   useEffect(() => {
     if (data) {
       setChartdata(formattedChartData(data));
       setChartOption(formattedChartOption(data));
     }
   }, [data]);
  
  const formattedChartData = (paramData) => {
    const value = paramData?.map((item) => item.total);
    return [{
      name: name,
      data: value,
    }];
  };
   const formattedChartOption = (data) => {
     const value = data?.map((item) => item.date);
     return {
       ...barchartOptions,
       xaxis: {
         type: "datetime",
         categories: value,
       },
     };
   };
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          {name}
        </h2>
        {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button> */}
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart chartData={chartdata} chartOptions={chartOption} />
        </div>
      </div>
    </Card>
  );
};

export default ColumneChart;
