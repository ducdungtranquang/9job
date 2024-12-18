import { Box } from "@mui/material";
import InputSelect from "components/fields/InputSelect";
import {
  costLists,
  detailLevelList,
  industryLists,
  languageList,
  projectLocationLists,
  resultList
} from "constants/SelectConstant";

const FilterEvaluationJob = ({ data, inputCS, register }) => {

  return (
    <Box className="grid-col-1 grid gap-2 md:grid-cols-2">
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
        value={data?.careers}
        data={industryLists || []}
        variant="auth"
        extra="mb-3"
        label="Ngành nghề"
        required={true}
        id="careers"
        inputCS={inputCS}
        name="careers"
        register={register("careers")}
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
    </Box>
  );
};

export default FilterEvaluationJob;
