import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

export default function InputCkeditor( { value, onChange}) {
  const [editorData, setEditorData] = useState("");

  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange && onChange(data);
  };

  if (value) {
    setEditorData(value);
  }
  
  return (
    <div className="w-full h-full flex flex-col">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleChange}
      />
      <button onClick={() => console.log(editorData)}>
        Log HTML content
      </button>
    </div>
  );
}