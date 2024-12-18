import React from 'react'
import cn from "classnames";
import { Box } from '@mui/material';

const InputRadio = ({props}) => {
    const { id, parentId, variant, labelCS, label, disabled, handleChange, item,required, inputCS, name } = props
    
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
        <Box key={cI} className="flex items-center gap-2">
          <input
            disabled={disabled}
            type="radio"
            id={c.name}
            name={`${name}-${item.id}`}
            value={c.value}
            // eslint-disable-next-line eqeqeq
            checked={c.value == item.value}
            onChange={(event) => handleChange(event, item.id, parentId)}
            className={cn(``, inputCS)}
          />
          <label
            className={cn(
              `text-md text-navy-700 dark:text-white ${
                variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
              }`
            )}
          >
            {c?.label}
          </label>
        </Box>
      ))}
    </div>
  );
}

export default InputRadio