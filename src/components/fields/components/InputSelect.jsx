import { FormControl, ListItemText, MenuItem, Select } from "@mui/material";
import cn from "classnames";

const InputSelect = ({ props }) => {
  const { labelCS, label, value, handleChange, item, inputCS, required } =
    props;
  return (
    <FormControl sx={{ width: "100%" }} className="mb-3 ">
      <label id="demo-multiple-name-label" className={labelCS}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        fullWidth
        value={value}
        className={cn(
          `text-black mt-2 h-12 rounded-md border border-gray-200 px-2 dark:!border-white/10 dark:text-white`,
          inputCS
        )}
        labelId={`${label}_labelId`}
        id={`${label}_inputCheckbox`}
        onChange={(event) => handleChange(event, item.id)}
      >
        {item?.option.map((item) => (
          <MenuItem key={item?.id} value={item?.id}>
            <ListItemText primary={item?.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
