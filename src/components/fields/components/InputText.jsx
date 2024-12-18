import React from 'react'
import cn from "classnames";

const InputText = ({props}) => {
    const { id, variant, labelCS, label,parentId, disabled, type, placeholder, value,required, handleChange, item, inputCS } = props
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
      <input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleChange(event, item.id, parentId)}
        className={cn(
          `mt-2 flex h-12 w-full items-center justify-center rounded-md border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white`,
          inputCS
        )}
      />
    </div>
  );
}

export default InputText