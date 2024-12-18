/* eslint-disable eqeqeq */
import moment from "moment";
import { uploadImage } from "services/upload.service";

export const checkEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{1,3})+$/;

export const phoneRegExp = /^\(\d{3}\)\s\d{3}\s-\s\d{4}/g;

export const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[0-9])/;

export const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const formatPrice = (number) => {
  if (!number) return 0;
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
    number
  );
};

export const convertNameFromUserData = (user) => {
  if (!user) return "";
  return `${user?.firstName || ""} ${user?.lastName || ""}`;
};

export const getExtFile = (stringPath) => {
  return /[.]/.exec(stringPath) ? /[^.]+$/.exec(stringPath) : "";
};

export const getFileName = (stringPath) => {
  return stringPath.replace(/^.*[\\/]/, "");
};

export const removeObjectKeyNull = (ObjectData) => {
  const object = {};
  for (const [key, value] of Object.entries(ObjectData)) {
    if (value) {
      object[key] = value;
    }
  }

  return object;
};

// result 1 => date > targetDate, 0 date = targetDate, -1, date < targetDate
export const equalDate = (targetDate, date) => {
  const convertTargetDate = new Date(targetDate).getTime();
  const convertDate = new Date(date).getTime();
  const oneDate = 86400000; // 1day = 86400000 milisecon
  const eq = convertDate - convertTargetDate;
  return eq === 0 ? 0 : eq / oneDate;
};

/**
 * compare date for function sort by result
 *
 * @param {string} currentDate // date item current
 * @param {string} preDate  // date item pre
 * @return 0 or 1 => not swap item, -1 => swap item
 */
export const compareDate = (currentDate, preDate) => {
  // result= -1 => swap current date vs pre date item message 0 or 1 => not change
  let result = 0;
  if (preDate && currentDate) {
    // equal pre date create Date  vs current date create Date
    const eq = equalDate(currentDate, preDate);
    result = eq >= 0 ? 1 : -1;
  }
  // current date = null => not change
  if (!currentDate && preDate) {
    result = 1;
  }
  // pre date = null => swap item
  if (currentDate && !preDate) {
    result = -1;
  }
  return result;
};

export const formatDate = (date = new Date(), type = "DD/MM/YYYY") => {
  return moment(date).format(type);
};

// remove vietnamese special character
export const removeSpecialCharacter = (value) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();
};
// convert number to roman number
export function convertToRoman(num) {
  var roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  var result = "";
  for (var key in roman) {
    if (num == roman[key]) {
      return (result += key);
    }
    var check = num > roman[key];
    if (check) {
      result = result + key.repeat(parseInt(num / roman[key]));
      num = num % roman[key];
    }
  }
  return result;
}
// use in calendar
export const formatDateString = (date) => {
  return date.slice(0, 16);
};
export const checkValidTime = (start, end, dateArray) => {
  const newStartDate = new Date(start);
  const newEndDate = new Date(end);
  for (let i = 0; i < dateArray.length; i++) {
    const existingStartDate = new Date(dateArray[i].start);
    const existingEndDate = new Date(dateArray[i].end);

    // Check if the new range overlaps with any existing range
    if (newStartDate < existingEndDate && newEndDate > existingStartDate) {
      return false; // Overlapping ranges, not valid
    }
  }

  return true; // No overlapping ranges, valid
};

export const uploadImageToStorage = async (file, fileName, folderName) => {
  try {
    const fileUrl = await uploadImage(true, file, fileName, folderName);
    return fileUrl;
  } catch (error) {
    return null;
  }
};

export const mappingData = (array) => {
  // Initialize an empty array to hold the grouped data
  const groupedDataArray = [];

  // Create a map to store groups based on groupId
  const groupMap = new Map();

  // Iterate over the array and group items by groupId
  array.forEach((item) => {
    const { oldId, groupId, key, value } = item;

    // Check if the group already exists in the map
    if (!groupMap.has(groupId)) {
      // If it doesn't exist, create a new group with an empty object
      groupMap.set(groupId, { id: oldId || null });
      // Push the newly created group object into the groupedDataArray
      groupedDataArray.push(groupMap.get(groupId));
    }

    // Add key-value pair to the group object in the map
    groupMap.get(groupId)[key] = value;
  });
  return groupedDataArray;
};
export const mapCourseLesson = (lesson) => {
  // Group course_chapters by their group ID
  const groupedChapters = lesson.course_chapters.reduce(
    (groups, course_chapters) => {
      const groupId = course_chapters.groupId;
      if (!groups[groupId]) {
        groups[groupId] = [];
      }
      groups[groupId].push(course_chapters);
      return groups;
    },
    {}
  );

  // Map grouped course_chapters to course_chapters array
  const course_chapters = Object.values(groupedChapters).map((group) => {
    return group.reduce((result, course_chapters) => {
      result["id"] = course_chapters.oldId ? course_chapters.oldId : null;
      result[course_chapters.key] = course_chapters.value;
      return result;
    }, {}); // Initialize with an empty name
  });
  const lessonProps = {};
  lessonProps["id"] = lesson.oldId ? lesson.oldId : null;
  lessonProps[lesson.key] = lesson.value;

  return {
    ...lessonProps, // Dynamically set property
    course_chapters: course_chapters,
  };
};


export function takeSomeWords(inputString, length = 20) {
  // Split the input string into words
  const words = inputString.trim().split(/\s+/);

  // Take the first 20 words or less if the string has less than 20 words
  const first10Words = words.slice(0, length);

  // Join the words back into a string
  let result = first10Words.join(' ');

  // Add ellipsis if the input string has more words than the specified length
  if (words.length > length) {
    result += '...';
  }

  return result;
}
// convert from html to single string
export const extractTextFromHtml = (htmlString, length) => {
  const regex = /<[^>]*>|&nbsp;/g;
  let string = htmlString.replace(regex, '');
  return takeSomeWords(string, length);
};

export const mappingDataInArray = (id, array) => {
  return (array.find(item =>item.id == id))?.name || ''
}

export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((maxWidth / width) * height);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((maxHeight / height) * width);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(resolve, file.type, 0.9);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const mapPriorityToLabel = (value, object) => object[value] || value;