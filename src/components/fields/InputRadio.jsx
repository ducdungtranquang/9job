import { Box } from "@mui/material";
import cn from "classnames";

const InputRadio = (props) => {
  const {
    id,
    variant,
    labelCS,
    label,
    disabled,
    item,
    inputCS,
    register,
    helperText,
    defaultValue,
    name,
    required,
  } = props;
  

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          `text-md text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`,
          labelCS
        )}
      >
        {label} {required && <span className="text-red-500">*</span>}
        {helperText && (
          <span className="text-[13px] text-red-500">{helperText}</span>
        )}
      </label>
      {item?.map((c, cI) => (
        <Box key={cI} className="flex items-center gap-2">
          <input
            disabled={disabled}
            type="radio"
            id={`input_${id}_${cI}`}
            name={name}
            defaultChecked={c.value === defaultValue}
            value={c.value}
            {...register}
            className={cn(``, inputCS)}
          />
          <label htmlFor={`input_${id}_${cI}`}>{c?.label}</label>
        </Box>
      ))}
    </div>
  );
};

// InputRadio.propTypes = {
//   id: PropTypes.any,
//   variant: PropTypes.any,
//   labelCS: PropTypes.any,
//   label: PropTypes.any,
//   disabled: PropTypes.bool,
//   item: PropTypes.shape({
//     label: PropTypes.string,
//     value: PropTypes.number,
//     name: PropTypes.string,
//   }),
//   inputCS: PropTypes.string,
//   register: PropTypes.any,
//   helperText: PropTypes.any,
//   defaultValue: PropTypes.any,
//   name: PropTypes.string,
//   required: PropTypes.bool,
// };
export default InputRadio;
