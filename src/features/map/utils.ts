import { format } from "date-fns";

const formatString = "hh:mm aa, MMM d, yyyy"

export const formattedDate = (date: string) => date && format(new Date(date), formatString)
