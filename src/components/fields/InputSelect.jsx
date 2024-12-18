import { ListItemText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import cn from "classnames";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function InputSelect(props) {
  const {
    value,
    label,
    data,
    disabled = false,
    multiple = false,
    labelCS,
    inputCS,
    register,
    helperText,
    required,
  } = props;

  const [itemName, setItemName] = useState(value || props.multiple ? [] : "");

  useEffect(() => {
    setItemName(value);
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setItemName(value);
  };
  const findItem = (id) => {
    return data.find((item) => item.id === id);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }} className="mb-3 ">
        <label id="demo-multiple-name-label" className={labelCS}>
          {label} {required && <span className="text-red-500">*</span>}
          <span className="text-[13px] text-red-500">{helperText}</span>
        </label>
        <Select
          {...register}
          className={cn(
            `text-black mt-2 h-12 rounded-md border border-gray-200 dark:!border-white/10 dark:text-white`,
            inputCS
          )}
          defaultValue={value}
          disabled={disabled}
          labelId={`${label}_labelId`}
          id={`${label}_inputCheckbox`}
          multiple={multiple}
          value={itemName}
          onChange={handleChange}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (multiple) {
              return selected.map((item) => findItem(item)?.name).join(", ");
            } else {
              return findItem(selected)?.name || "";
            }
          }}
        >
          {data.map((item) => (
            <MenuItem key={item?.id} value={item?.id}>
              {multiple ? (
                <>
                  <Checkbox checked={itemName?.indexOf(item.id) > -1} />
                  <ListItemText primary={item?.name} />
                </>
              ) : (
                <ListItemText primary={item?.name} />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
