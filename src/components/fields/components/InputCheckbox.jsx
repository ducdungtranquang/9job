import React from 'react'
import cn from "classnames";
import { Box } from '@mui/material';

const InputCheckBox = ({props}) => {
    const { id, variant, labelCS, label, disabled, handleChange, item, inputCS, required } = props
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
      </label>
      {item?.option.map((c, cI) => (
        <Box>
          <input
            disabled={disabled}
            type="checkbox"
            id={c.name}
            value={c.value}
            onChange={(event) => handleChange(event, item.id)}
            className={cn(``, inputCS)}
          />
          <label>{c?.label}</label>
        </Box>
      ))}
    </div>
  );
}

export default InputCheckBox