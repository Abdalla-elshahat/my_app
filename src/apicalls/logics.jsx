export const getGridClass = (count) => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
      case 4:
        return "grid-cols-2 grid-rows-2";
      default:
        return "grid-cols-3 grid-rows-2";
    }
  };

  export const getImageClass = (count, index) => {
    if ((count === 3 && index === 0) || (count >= 5 && index === 0))
      return "col-span-2 row-span-2";
    return "";
  };
