import cn from "classnames";

const InputCheckbox = (props) => {
  const {
    id,
    variant,
    labelCS,
    label,
    disabled,
    value,
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

      <input
        disabled={disabled}
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        value={value}
        {...register}
        className={cn(``, inputCS)}
      />
    </div>
  );
};


export default InputCheckbox;
