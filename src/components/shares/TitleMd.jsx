import React from "react";
import cn from 'classnames';

const TitleMd = ({title, className, textColor}) => {
  return (
    <div>
      <h3
        className={cn(
          `text-md mb-2 font-bold  ${
            textColor || "text-gray-700"
          } text-lg underline dark:text-white`,
          className
        )}
      >
        {title}
      </h3>
    </div>
  );
};

export default TitleMd;
