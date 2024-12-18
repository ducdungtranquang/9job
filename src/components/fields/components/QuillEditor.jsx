import cn from "classnames";
import { useCallback } from "react";
import ReactQuill from "react-quill";
import { resizeImage, uploadImageToStorage } from "utils/helpers";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const QuillEditor = ({ props }) => {
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

  const handleImageUpload = useCallback(async (file, quillRef) => {
    const resizedImage = await resizeImage(file, 500, 500); // Resize to 800px width
    const filePath = await uploadImageToStorage(resizedImage);
    const range = quillRef.getEditor().getSelection();
    quillRef
      .getEditor()
      .insertEmbed(
        range.index,
        "image",
        `${process.env.REACT_APP_DOMAIN_BE}${filePath}`
      );
  }, []);
  return (
    <div className="mt-3">
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
      <ReactQuill
        theme="snow"
        modules={{ toolbar: toolbarOptions }}
        value={value}
        onChange={(data) => {
          handleChange(data, item.id, parentId);
        }}
        ref={(el) => {
          if (el) {
            el.getEditor()
              .getModule("toolbar")
              .addHandler("image", () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();
                input.onchange = () => {
                  const file = input.files[0];
                  handleImageUpload(file, el);
                };
              });
          }
        }}
      />
    </div>
  );
};

export default QuillEditor;
