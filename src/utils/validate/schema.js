import * as yup from "yup";
import { passwordRegExp, regexEmail } from "../helpers";

export const userSignUpSchema = () => {
  return yup.object().shape({
    username: yup.string().nullable().trim().required("Bạn phải nhập Username"),
    companyName: yup.string().nullable().trim(),
    location: yup.string().nullable().trim(),
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Email")
      .email("Email không hợp lệ")
      .matches(regexEmail, "Email không hợp lệ")
      .max(200, "Email không hợp lệ"),
    password: yup
      .string()
      .nullable()
      .required("Bạn phải nhập Password")
      .min(8, "Password phải dài hơn 8 kí tự")
      .max(64, "Password phải ngắn hơn 64 kí tự")
      .matches(passwordRegExp, "Password phải bắt đầu bằng chữ IN HOA"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password nhập lại không khớp"),
    agree: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải đồng ý với chính sách bảo mật và điều khoản dịch vụ"),
  });
};

export const LoginSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Email")
      .email("Email không hợp lệ")
      .matches(regexEmail, "Email không hợp lệ")
      .max(200, "Email không hợp lệ"),
    password: yup.string().nullable().required("Bạn phải nhập Mật khẩu"),
  });
};

export const ContactSchema = () => {
  return yup.object().shape({
    fullName: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Họ và tên"),
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Email")
      .email("Email không hợp lệ")
      .matches(regexEmail, "Email không hợp lệ")
      .max(200, "Email không hợp lệ"),
    phoneNumber: yup
      .string()
      .nullable()
      .required("Bạn phải nhập số điện thoại")
      .min(10, "Số phải có 10 chữ số")
      .max(14, "Số điện thoại không đúng định dạng"),
    company: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Tên công ty"),
    purpose: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Mục đích liên hệ"),
  });
};

export const calculateGPASchema = () => {
  return yup.object().shape({
    studyCredit: yup
      .string()
      .nullable()
      .required("Bạn phải nhập số tín chỉ")
      .min(1, "Bạn phải nhập số tín chỉ"),
    creditStudied: yup
      .string()
      .nullable()
      .required("Bạn phải nhập số tín chỉ")
      .min(1, "Bạn phải nhập số tín chỉ"),
    currentGpa: yup
      .string()
      .nullable()
      .required("Bạn phải nhập số tín chỉ")
      .min(1, "Bạn phải nhập số tín chỉ"),
  });
};

export const ChangePasswordSchema = () => {
  return yup.object().shape({
    oldPassword: yup
      .string()
      .nullable()
      .required("Bạn phải nhập Password")
      .min(8, "Password phải dài hơn 8 kí tự")
      .max(64, "Password phải ngắn hơn 64 kí tự")
      .matches(passwordRegExp, "Password phải bắt đầu bằng chữ IN HOA"),
    newPassword: yup
      .string()
      .nullable()
      .required("Bạn phải nhập Password")
      .min(8, "Password phải dài hơn 8 kí tự")
      .max(64, "Password phải ngắn hơn 64 kí tự")
      .matches(passwordRegExp, "Password phải bắt đầu bằng chữ IN HOA"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password nhập lại không khớp"),
  });
};

export const CompanyInfoSchema = () => {
  return yup.object().shape({
    companyName: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Tên công ty"),
    taxCode: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Mã số thuế"),
    major: yup.string().nullable().trim().required("Bạn phải nhập Lĩnh vực"),
    scale: yup.string().nullable().trim().required("Bạn phải nhập Lĩnh vực"),
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Email")
      .email("Email không hợp lệ")
      .matches(regexEmail, "Email không hợp lệ")
      .max(200, "Email không hợp lệ"),
    website: yup.string().nullable().trim().required("Bạn phải nhập Website"),
    phoneNumber: yup
      .string()
      .nullable()
      .required("Bạn phải nhập số điện thoại")
      .min(10, "Số phải có 10 chữ số")
      .max(14, "Số điện thoại không đúng định dạng"),
    address: yup.string().nullable().trim().required("Bạn phải nhập Địa chỉ"),
    companyDescription: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Mô tả công ty"),
  });
};

export const candidateSchema = () => {
  return yup.object().shape({
    fullName: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Họ và tên"),
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Email")
      .email("Email không hợp lệ")
      .matches(regexEmail, "Email không hợp lệ")
      .max(200, "Email không hợp lệ"),
    phoneNumber: yup
      .string()
      .nullable()
      .required("Bạn phải nhập số điện thoại")
      .min(10, "Số phải có 10 chữ số")
      .max(14, "Số điện thoại không đúng định dạng"),
  });
};

export const candidateChangePasswordSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập Email")
      .email("Email không hợp lệ")
      .matches(regexEmail, "Email không hợp lệ")
      .max(200, "Email không hợp lệ"),
    oldPassword: yup
      .string()
      .nullable()
      .required("Bạn phải nhập Password")
      .min(8, "Password phải dài hơn 8 kí tự")
      .max(64, "Password phải ngắn hơn 64 kí tự")
      .matches(passwordRegExp, "Password phải bắt đầu bằng chữ IN HOA"),
    newPassword: yup
      .string()
      .nullable()
      .required("Bạn phải nhập Password")
      .min(8, "Password phải dài hơn 8 kí tự")
      .max(64, "Password phải ngắn hơn 64 kí tự")
      .matches(passwordRegExp, "Password phải bắt đầu bằng chữ IN HOA"),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password nhập lại không khớp"),
  });
};

export const InformationEst = () => {
  return yup.object().shape({
    firstName: yup.string().required("first_name_required"),
    lastName: yup.string().required("last_name_required"),
    email: yup
      .string()
      .nullable()
      .trim()
      .required("email_required")
      .email("valid_email")
      .matches(regexEmail, "valid_email")
      .max(200, "valid_email"),
    phoneNumber: yup
      .string()
      .nullable()
      .required("phone_required")
      .min(10, "phone_valid")
      .max(14, "phone_valid"),
    note: yup.string().required("remark_required"),
  });
};

export const extracurricularActivities = () => {
  return yup.object().shape({
    schoolName: yup.string().required("Bạn phải nhập tên trường"),
    major: yup.string().required("Bạn phải nhập ngành học"),
    award: yup
      .string()
      .required("Bạn phải nhập mô tả trải nghiệm / thành tích"),
    start: yup.string().required("Bạn phải chọn thời gian bắt đầu"),
    end: yup.string().required("Bạn phải chọn thời gian kết thúc"),
    schoolLogo: yup.string().required("Bạn phải chọn logo"),
  });
};

export const trainingProcess = () => {
  return yup.object().shape({
    schoolName: yup.string().required("Bạn phải nhập tên trường"),
    major: yup.string().required("Bạn phải nhập ngành học"),
    award: yup
      .string()
      .required("Bạn phải nhập mô tả trải nghiệm / thành tích"),
    start: yup.string().required("Bạn phải chọn thời gian bắt đầu"),
    end: yup.string().required("Bạn phải chọn thời gian kết thúc"),
    schoolLogo: yup.string().required("Bạn phải chọn logo"),
  });
};

export const workExperience = () => {
  return yup.object().shape({
    companyName: yup.string().required("Bạn phải nhập tên công ty"),
    companyPosition: yup.string().required("Bạn phải nhập vị trí công việc"),
    award: yup
      .string()
      .required("Bạn phải nhập mô tả trải nghiệm / thành tích"),
    start: yup.string().required("Bạn phải chọn thời gian bắt đầu"),
    end: yup.string().required("Bạn phải chọn thời gian kết thúc"),
    companyLogo: yup.string().required("Bạn phải chọn logo"),
  });
};

export const certificateOrSkill = () => {
  return yup.object().shape({
    title: yup.string().required("Bạn phải nhập tên trường"),
    description: yup.string().required("Bạn phải nhập ngành học"),
    type: yup.string().required("Bạn phải chọn loại"),
  });
};

export const StudenHandbookShema = () => {
  return yup.object().shape({
    school_id: yup
      .number()
      .nullable()
      .required("Bạn phải chọn trường"),
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập nội dung ")
      .min(10, "Tối thiểu phải có 10 ký tự"),
      description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả khoá học"),
      tags: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả khoá học"),


  });
};

export const CourseSchema = () => {
  return yup.object().shape({
    instructor_id: yup
      .number()
      .nullable()
      .required("Bạn phải nhập tên giảng viên"),
    // category_id: yup.number().nullable().required("Bạn phải chọn danh mục"),
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên khoá học")
      .min(10, "Tối thiểu phải có 10 ký tự"),
    description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả khoá học"),
    // point_coin: yup
    //   .number()
    //   .required("Bạn phải nhập số xu")
    //   .test(
    //     "not-zero",
    //     "Giá trị phải khác 0 và lớn hơn 0",
    //     (value) => value > 0
    //   ),
    student_numbers: yup
      .number()
      .nullable()
      .required("Bạn phải nhập số lượng học viên")
      .test(
        "not-zero",
        "Giá trị phải khác 0 và lớn hơn 0",
        (value) => value > 0
      ),
    origin_price: yup
      .number()
      .nullable()
      .required("Bạn phải nhập giá khoá học")
      .test(
        "not-zero",
        "Giá trị phải khác 0 và lớn hơn 0",
        (value) => value > 0
      ),
  });
};


export const handbookSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả"),
    school_id: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải chọn trường"),
  });
};

export const routemapSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    // process: yup
    //   .string()
    //   .nullable()
    //   .required("Bạn phải nhập quá trình"),
    description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả"),
  });
};

export const documentBookSchema = () => {
  return yup.object().shape({
    // thumbnail:  yup.mixed().required("Vui lòng tải ảnh"),
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả"),
    content: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập nội dung"),
    category: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải chọn danh mục"),
    industry: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải chọn lĩnh vực"),
    career: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải chọn ngành nghề"),
    // level: yup
    //   .string()
    //   .nullable()
    //   .trim()
    //   .required("Bạn phải chọn trình độ"),
  });
};

export const instructorSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    email: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập email"),
    phone: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập số điện thoại"),
    company_name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên Công ty"),
    company_position: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập vị trí làm việc"),
    year_of_experience: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập năm kinh nghiệm"),
    education_level: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập trình độ học vấn"),
    school_id: yup
      .number()
      .nullable()
      .required("Bạn phải chọn trường"),
  });
};

export const ActivitySchema = () => {
  return yup.object().shape({
    // thumbnail:  yup.mixed().required("Vui lòng tải ảnh"),
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả"),
    long_description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả chi tiết"),
    link: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập đường dẫn"),
  });
};


export const bannerSchema = () => {
  return yup.object().shape({
    // name: yup
    //   .string()
    //   .nullable()
    //   .trim()
    //   .required("Bạn phải nhập tên"),
    // description: yup
    //   .string()
    //   .nullable()
    //   .trim()
    //   .required("Bạn phải nhập mô tả"),
    page_id: yup
      .string()
      .nullable()
      .required("Bạn phải chọn trang"),
    position: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải chọn vị trí"),
    link: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập đường dẫn"),
    expired: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập thời gian hết hạn"),
  });
};


export const newsReviewSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    // description: yup
    //   .string()
    //   .nullable()
    //   .trim()
    //   .required("Bạn phải nhập mô tả"),
    company_name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải chọn tên công ty / tổ chức"),
    company_position: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập vị trí"),

  });
};

export const partnerSchema = () => {
  return yup.object().shape({
    company_name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên tổ chức"),


  });
};

export const universitySchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên tổ chức"),


  });
};

export const bannerWebSchema = () => {
  return yup.object().shape({
    description: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập mô tả"),
    page_id: yup
      .string()
      .nullable()
      .required("Bạn phải chọn trang"),
  });
};

export const fanpageSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .nullable()
      .trim()
      .required("Bạn phải nhập tên"),
    group: yup
      .string()
      .nullable()
      .required("Bạn phải nhập nhóm"),
    // link: yup
    //   .string()
    //   .nullable()
    //   .required("Bạn phải nhập liên kết"),
  });
};

