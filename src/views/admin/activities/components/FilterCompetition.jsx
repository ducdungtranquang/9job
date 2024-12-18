import { Box } from "@mui/material";
import InputSelect from "components/fields/InputSelect";
import {
  competitionRangeLists,
  competitionTypeLists,
  projectLocationLists,
  projectTypeLists
} from "constants/SelectConstant";

const FilterCompetition = ({ data, inputCS, register }) => {
  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-4">
      <InputSelect
        value={data?.industry}
        data={competitionRangeLists || []}
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
        value={data?.work_type}
        data={projectTypeLists || []}
        variant="auth"
        extra="mb-3"
        label="Hình thức"
        required={true}
        id="work_type"
        inputCS={inputCS}
        name="work_type"
        register={register("work_type")}
      />
      <InputSelect
        value={data?.type}
        data={competitionTypeLists || []}
        variant="auth"
        extra="mb-3"
        label="Thể loại cuộc thi"
        required={true}
        id="type"
        inputCS={inputCS}
        name="type"
        register={register("type")}
      />
    </Box>
  );
};

export default FilterCompetition;
