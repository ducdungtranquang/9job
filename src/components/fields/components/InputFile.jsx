import { Button } from "@mui/material";
import cn from "classnames";
import { useEffect, useState } from "react";
import { uploadImageToStorage } from "utils/helpers";
import styles from "../index.module.css";

const InputFile = ({ props }) => {
  const { handleChange, item, required } = props;
  const [image, setImage] = useState(props?.fileUrl);
  const [fileImg, setFileImg] = useState(null);
  const [url, setUrl] = useState(null);
  const [changeImg, setChangeImg] = useState(false);

  const handleSetImg = async (event) => {
    let file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setImage(preview);
    setFileImg(file);
    setChangeImg(true);
    // xu ly de co the up 2 anh giong nhau
    event.target.value = null;
  };

  // change image when click button
  useEffect(() => {
    const isFile = true;
    if (url !== null) {
      handleChange(url, item.id, isFile);
      // setUrl(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);



  const handleSaveImg = async () => {
    if (fileImg !== null) {
      const fileUrl = await uploadImageToStorage(
        fileImg,
        item?.fileName,
        item?.folderName
      );
      setUrl(fileUrl);
      setFileImg(null);
      setChangeImg(false);
    }
  };

  // useEffect(() => {
  //   props?.fileUrl && setImage(props?.fileUrl);
  // }, [props?.fileUrl]);

  return (
    <div>
      <label className="mb-2 flex gap-2">
        {props?.label} {required && <span className="text-red-500">*</span>}
        {image && changeImg && (
          <Button
            className="bg-brand-500 normal-case text-white hover:bg-navy-900 dark:bg-white dark:text-brand-500"
            onClick={handleSaveImg}
          >
            Lưu
          </Button>
        )}
      </label>
      <div className={cn(styles.upload_container_square, "z-20")}>
        <div className="h-[150px] w-full border border-solid border-blueSecondary  dark:!border-white/10">
          {image && (
            <img
              src={image}
              alt="khoa hoc"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <label>{"Tải ảnh"}</label>
        <input
          disabled={props?.disabled || false}
          type="file"
          onChange={handleSetImg}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </div>
  );
};

export default InputFile;
