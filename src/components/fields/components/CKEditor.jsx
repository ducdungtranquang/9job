import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import cn from "classnames";

const CKEditorInput = ({ props }) => {
  const {
    id,
    variant,
    labelCS,
    label,
    parentId,
    value,
    required,
    handleChange,
    item,
    helperText,
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
      </label>
      <span className="text-[13px] text-red-500">{helperText}</span>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          handleChange(data, item.id, parentId);
          // setValue("description", data);
        }}
      />
    </div>
  );
};

export default CKEditorInput;
