// Custom components
import cn from "classnames";

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    labelCS,
    inputCS,
    register,
    helperText,
    required,
  } = props;

  return (
    <div className={cn(`${extra} z-40`)}>
      {label && (
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
          <span className="text-[13px] text-red-500">{helperText}</span>
        </label>
      )}
      <input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        className={cn(
          `mt-2 flex h-12 w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm outline-none ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`,
          inputCS
        )}
      />
    </div>
  );
}

export default InputField;
