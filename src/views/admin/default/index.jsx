import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import PieChartCard from "views/admin/default/components/PieChartCard";

import Widget from "components/widget/Widget";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCoinLimit,
  getUserCourseByMonth,
  getUserLoginPerDay,
  getUserRegisterPerDay,
} from "services/dashboard.service";
import { getdashboardData } from "store/dashboardReducer";
import ColumneChart from "./components/ColumneChart";
import UserHasCointMost from "./components/UserHasCointMost";

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const per_page = 20;
  const { total_jobs, total_users, total_courses, total_user_cvs } =
    useSelector((state) => state.dashboards);
  const [userLogin, setUserLogin] = useState([]);
  const [userRegister, setUserRegister] = useState([]);
  const [userCoin, setUserCoin] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserLogin();
    getUserRegister();
    getUserCoin();
    getUserCourseRegister();
    dispatch(
      getdashboardData({
        page: page + 1,
        per_page,
      })
    );
  }, [dispatch, page]);

  const getUserLogin = async () => {
    try {
      const response = await getUserLoginPerDay();
      setUserLogin(response.data);
    } catch (error) {}
  };
  const getUserRegister = async () => {
    try {
      const response = await getUserRegisterPerDay();
      setUserRegister(response.data);
    } catch (error) {}
  };

  const getUserCoin = async () => {
    try {
      const response = await getUserCoinLimit();
      setUserCoin(response.data);
    } catch (error) {}
  };

    const getUserCourseRegister = async () => {
      try {
        const response = await getUserCourseByMonth();
        setUserCourses(response.data);
      } catch (error) {}
    };
  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Công việc"}
          subtitle={total_jobs}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Người dùng"}
          subtitle={total_users}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Khóa học"}
          subtitle={total_courses}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Số lượng CV"}
          subtitle={total_user_cvs}
        />
      </div>
      {/* Charts */}
      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}
      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ColumneChart
          data={userLogin}
          name="Số lượng người dùng đăng nhập theo tuần"
        />
        <ColumneChart
          data={userRegister}
          name="Số lượng người dùng đăng ký theo tuần"
        />
        {/* Traffic chart & Pie Chart */}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <UserHasCointMost data={userCoin} />
        <PieChartCard data={userCourses} />
      </div>
    </div>
  );
};

export default Dashboard;
