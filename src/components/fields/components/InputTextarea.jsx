import cn from "classnames";

const InputTextarea = ({ props }) => {
  const {
    id,
    variant,
    labelCS,
    label,
    cols,
    rows,
    placeholder,
    value,
    handleChange,
    required,
    item,
    disabled = false,
    inputCS,
  } = props;
  return (
    <div>
      {" "}
      <label
        htmlFor={id}
        className={cn(
          `text-md text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
          }`,
          labelCS
        )}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        disabled={disabled}
        cols={cols}
        rows={rows || 5}
        placeholder={placeholder}
        className={cn(
          `mt-2 flex w-full items-center justify-center rounded-md border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white`,
          inputCS
        )}
        name={id}
        id={id}
        value={value}
        onChange={(event) => handleChange(event, item.id)}
      />
    </div>
  );
};

export default InputTextarea;
