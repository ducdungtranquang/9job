import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import InputField from "components/fields/InputField";
import { ADMIN_ROLE } from "constants/RoleConstant";
import { adminDefault } from "constants/routeConstant";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "services/user.service";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import { loginUser } from "store/userReducer";
import { LoginSchema } from "utils/validate/schema";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: FormResolver(LoginSchema()),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (!response?.data?.roles.includes(ADMIN_ROLE)) {
        dispatch(setIsToastMessageShow());
        dispatch(
          setMessage({
            message: "Bạn không được quyền truy cập",
            severity: "error",
          })
        );
      } else {
        dispatch(loginUser(response?.data));

        navigate(adminDefault);

        dispatch(setIsToastMessageShow());
        dispatch(
          setMessage({
            message: "Đăng nhập thành công",
            severity: "success",
          })
        );
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      dispatch(setIsToastMessageShow());
      dispatch(
        setMessage({
          message: msg,
          severity: "error",
        })
      );
    }
  };
  return (
    <div className="lg:items mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10">
      {/* Sign in section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-4 lg:-translate-y-[20%] lg:px-[100px]"
      >
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Đăng nhập
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Nhập email và mật khẩu để đăng nhập
          </p>

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-6"
            label="Email"
            placeholder="Email"
            id="email"
            type="email"
            name="email"
            register={register("email")}
            required={true}
            helperText={errors.email ? errors.email.message : ""}
          />

          {/* Password */}
          <InputField
            required={true}
            variant="auth"
            extra="mb-6"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            id="password"
            type="password"
            name="password"
            register={register("password")}
            helperText={errors.password ? errors.password.message : ""}
          />
          {/* Checkbox */}
          {/* <div className="mb-4 flex items-center justify-end px-2">
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Quên mật khẩu?
            </a>
          </div> */}
          <button
            type="submit"
            className="linear mx-auto mt-2 flex w-full max-w-[189px] justify-center rounded-xl bg-[#0360D9] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Đăng nhập
          </button>
          {/* <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Chưa có tài khoản?
            </span>
            <Link
              // to="/auth/sign-up"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Tạo tài khoản
            </Link>
          </div> */}
        </div>
      </form>
    </div>
  );
}
