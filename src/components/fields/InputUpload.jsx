import { Avatar } from '@mui/material';
import cn from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsToastMessageShow, setMessage } from 'store/globalReducer';
import styles from './index.module.css';

const InputUpload = ({
  setImg,
  label,
  required,
  fileUrl,
  disabled = false,
}) => {
  const [image, setImage] = useState(fileUrl);
  const dispatch = useDispatch()
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

  return (
    <div className={cn(styles.upload_container, "z-20")}>
      <Avatar sx={{ width: 100, height: 100 }} src={image} />
      <input
        type="file"
        onChange={handleSetImg}
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
};

export default InputUpload