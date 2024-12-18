import { Box } from "@mui/material";
import InputSelect from "components/fields/InputSelect";
import {
  schoolarshipCountry,
  schoolarshipEducationLevel,
  schoolarshipMajor,
  schoolarshipTime,
  schoolarshipType
} from "constants/SelectConstant";

const FilterScholarship = ({ data, inputCS, register }) => {
  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-2">
      <InputSelect
        value={data?.type}
        data={schoolarshipType || []}
        variant="auth"
        extra="mb-3"
        label="Loại học bổng"
        required={true}
        id="type"
        inputCS={inputCS}
        name="type"
        register={register("type")}
       
      />
      <InputSelect
        value={data?.level}
        data={schoolarshipEducationLevel || []}
        variant="auth"
        extra="mb-3"
        label="Trình độ"
        required={true}
        id="level"
        inputCS={inputCS}
        name="level"
        register={register("level")}
       
      />
      <InputSelect
        value={data?.major}
        data={schoolarshipMajor || []}
        variant="auth"
        extra="mb-3"
        label="Ngành học"
        required={true}
        id="major"
        inputCS={inputCS}
        name="major"
        register={register("major")}
       
      />
      <InputSelect
        value={data?.country}
        data={schoolarshipCountry || []}
        variant="auth"
        extra="mb-3"
        label="Châu lục"
        required={true}
        id="country"
        inputCS={inputCS}
        name="country"
        register={register("country")}
       
      />
      <InputSelect
        value={data?.start_time}
        data={schoolarshipTime || []}
        variant="auth"
        extra="mb-3"
        label="Thời gian học bổng"
        required={true}
        id="start_time"
        inputCS={inputCS}
        name="start_time"
        register={register("start_time")}
       
      />
    </Box>
  );
};

export default FilterScholarship;
