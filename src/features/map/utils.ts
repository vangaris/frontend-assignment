import { ship, dot, position } from "./constants/map";  
import { format } from "date-fns";
const formatString = "hh:mm aa, MMM d, yyyy"
  export const setIcon = (length: Number, index: Number) => {
    if (index === 0) {
      return position;
    }

    if (length === index) {
      return ship;
    }

    return dot;
  };

export const formattedDate = (date: string) => date && format(new Date(date), formatString)
