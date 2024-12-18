import { Box } from "@mui/material";
import InputCheckBox from "components/fields/InputCheckbox";
import InputSelect from "components/fields/InputSelect";
import {
  industryLists,
  projectLocationLists
} from "constants/SelectConstant";

const FilterEvent = ({ data, inputCS, register }) => {
  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-2">
      <InputSelect
        value={data?.type}
        data={industryLists || []}
        variant="auth"
        extra="mb-3"
        label="Lĩnh vực"
        required={true}
        id="type"
        inputCS={inputCS}
        name="type"
        register={register("type")}
      
      />
      <InputSelect
        value={data?.location}
        data={projectLocationLists || []}
        variant="auth"
        extra="mb-3"
        label="Địa điểm"
        required={true}
        id="location"
        inputCS={inputCS}
        name="location"
        register={register("location")}
      
      />
      <InputCheckBox
        variant="auth"
        extra="mb-3"
        label="Điểm đoàn"
        required={false}
        id="union_point"
        name="union_point"
        register={register("union_point")}
        defaultValue={data?.union_point}
      
      />
    </Box>
  );
};

export default FilterEvent;
