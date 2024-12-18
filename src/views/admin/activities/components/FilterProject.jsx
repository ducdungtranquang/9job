import { Box } from "@mui/material";
import InputSelect from "components/fields/InputSelect";
import {
  projectLocationLists,
  projectOranizationLists,
  projectRangeLists,
  projectTypeLists,
  projectWorkingTypeLists
} from "constants/SelectConstant";

const FilterProject = ({ data, inputCS, register }) => {
  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-3">
      <InputSelect
        value={data?.industry}
        data={projectRangeLists || []}
        variant="auth"
        extra="mb-3"
        label="Lĩnh vực"
        required={true}
        id="industry"
        inputCS={inputCS}
        name="industry"
        register={register("industry")}
        
      />
      <InputSelect
        value={data?.form}
        data={projectTypeLists || []}
        variant="auth"
        extra="mb-3"
        label="Hình thức"
        required={true}
        id="form"
        inputCS={inputCS}
        name="form"
        register={register("form")}
        
      />
      <InputSelect
        value={data?.work_type}
        data={projectWorkingTypeLists || []}
        variant="auth"
        extra="mb-3"
        label="Tính chất"
        required={true}
        id="work_type"
        inputCS={inputCS}
        name="work_type"
        register={register("work_type")}
        
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
      <InputSelect
        value={data?.oranization}
        data={projectOranizationLists || []}
        variant="auth"
        extra="mb-3"
        label="Loại hình tổ chức"
        required={true}
        id="oranization"
        inputCS={inputCS}
        name="oranization"
        register={register("oranization")}
        
      />
    </Box>
  );
};

export default FilterProject;
