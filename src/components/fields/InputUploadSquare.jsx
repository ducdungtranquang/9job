import { Avatar } from "@mui/material";
import cn from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import styles from "./index.module.css";


const InputUploadSquare = ({
  setImg,
  label,
  required,
  fileUrl,
  disabled = false,
  helperText,
  height = '250px',
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(fileUrl);

  const handleSetImg = async (event) => {
    let file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setImage(preview);

    if (!file) {
      dispatch(setIsToastMessageShow());
      dispatch(
        setMessage({
          message: "Bạn chưa tải ảnh",
          severity: "info",
        })
      );
    }
    setImg(file);
    // xu ly de co the up 2 anh giong nhau
    event.target.value = null;
  };

  // useEffect(() => {
  //   if (fileUrl) {
  //     setImage(fileUrl);
  //   }
  // }, [fileUrl]);

  return (
    <div>
      <label>
        {label} {required && <span className="text-red-500">*</span>}
        <span className="text-[13px] text-red-500">{helperText}</span>
      </label>
      <div className={cn(styles.upload_container_square, "z-20")}>
        <div
          className={cn(
            `h-[${height}] w-full border border-solid border-blueSecondary  dark:!border-white/10`,
          )}
        >
          {image && (
            <Avatar
              src={image}
              alt="khoa hoc"
              variant="square"
              className="h-full w-full object-cover object-right-top"
            />
          )}
        </div>
        <label>{"Tải ảnh"}</label>
        <input
          disabled={disabled}
          type="file"
          onChange={handleSetImg}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </div>
  );
};

export default InputUploadSquare;
