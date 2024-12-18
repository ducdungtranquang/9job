import firstPlace from "assets/img/1st-place.png";
import thirdPlace from "assets/img/3rd-place.png";
import fifthPlace from "assets/img/5th_prize.png";
import fourthPlace from "assets/img/fourth-prize.webp";
import secondPlace from "assets/img/second-prize.png";
import Card from "components/card";

const UserHasCointMost = ({ data }) => {

  const images = [firstPlace, secondPlace, thirdPlace, fourthPlace, fifthPlace];
  

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-2">
        <h2 className="text-left text-lg font-bold text-navy-700 dark:text-white">
          Người dùng có coin nhiều nhất
        </h2>
        {/* <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button> */}
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full overflow-y-auto xl:h-[350px]">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-2 border-b p-2"
            >
              <img
                src={images[index]}
                className="h-10 w-10 rounded-full"
                alt=""
              />
              <div className="">{item.fullName}</div>
              <div className="font-medium">{item.total_coins}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UserHasCointMost;
