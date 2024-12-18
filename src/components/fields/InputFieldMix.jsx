// Custom components
import cn from "classnames";
import InputSelect from "./InputSelect";
import InputCheckBox from "./components/InputCheckbox";
import InputFile from "./components/InputFile";
import InputRadio from "./components/InputRadio";
import InputText from "./components/InputText";
import InputTextarea from "./components/InputTextarea";
import QuillEditor from "./components/QuillEditor";

export default function InputFieldMix(props) {
  const { extra, type } = props;

  const textType = ["text", "password", "phone", "email", "number"];
  return (
    <div className={cn(`${extra} z-40`)}>
      {textType.indexOf(type) !== -1 ? (
        <InputText props={props} />
      ) : type === "select" ? (
        <InputSelect props={props} />
      ) : type === "textarea" ? (
        <InputTextarea props={props} />
      ) : type === "file" ? (
        <InputFile props={props} />
      ) : type === "radio" ? (
        <InputRadio props={props} />
      ) : type === "checkbox" ? (
        <InputCheckBox props={props} />
      ) : type === "ckEditor" ? (
        <QuillEditor props={props} />
      ) : null}
    </div>
  );
}
