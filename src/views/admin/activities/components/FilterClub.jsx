import { Box } from "@mui/material";
import InputSelect from "components/fields/InputSelect";
import { clubRangeLists, clubTagLists, clubTypeLists, projectLocationLists } from "constants/SelectConstant";

const FilterClub = ({ data, inputCS, register, }) => {
  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-4">
      <InputSelect
        value={data?.type}
        data={clubTypeLists || []}
        variant="auth"
        extra="mb-3"
        label="Loại hình"
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
      <InputSelect
        value={data?.tags}
        data={clubTagLists || []}
        variant="auth"
        extra="mb-3"
        label="Tags"
        required={true}
        id="tags"
        inputCS={inputCS}
        name="tags"
        register={register("tags")}
      />
      <InputSelect
        value={data?.range}
        data={clubRangeLists || []}
        variant="auth"
        extra="mb-3"
        label="Phạm vi"
        required={true}
        id="range"
        inputCS={inputCS}
        name="range"
        register={register("range")}
      />
    </Box>
  );
};

export default FilterClub;
