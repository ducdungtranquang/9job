import { Box } from "@mui/material";
import InputSelect from "components/fields/InputSelect";
import {
  costLists,
  detailLevelList,
  languageList,
  projectLocationLists,
  resultList,
  toolList
} from "constants/SelectConstant";

const FilterEvaluationYourself = ({ data, inputCS, register }) => {
  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-2">
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
        value={data?.languages}
        data={languageList || []}
        variant="auth"
        extra="mb-3"
        label="Ngôn ngữ"
        required={true}
        id="languages"
        inputCS={inputCS}
        name="languages"
        register={register("languages")}
      />
      <InputSelect
        value={data?.cost}
        data={costLists || []}
        variant="auth"
        extra="mb-3"
        label="Chi phí"
        required={true}
        id="cost"
        inputCS={inputCS}
        name="cost"
        register={register("cost")}
      />
      <InputSelect
        value={data?.result || []}
        data={resultList || []}
        variant="auth"
        extra="mb-3"
        label="Kết quả trả về"
        required={true}
        id="result"
        inputCS={inputCS}
        name="result"
        register={register("result")}
        multiple={true}
      />
      <InputSelect
        value={data?.detail_level}
        data={detailLevelList || []}
        variant="auth"
        extra="mb-3"
        label="Độ chi tiết"
        required={true}
        id="detail_level"
        inputCS={inputCS}
        name="detail_level"
        register={register("detail_level")}
      />
      <InputSelect
        value={data?.tools}
        data={toolList || []}
        variant="auth"
        extra="mb-3"
        label="Công cụ"
        required={true}
        id="tools"
        inputCS={inputCS}
        name="tools"
        register={register("tools")}
      />
    </Box>
  );
};

export default FilterEvaluationYourself;
