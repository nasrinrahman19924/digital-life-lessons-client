import { format } from "date-fns";

export const formatDate = (date) =>
  format(new Date(date), "dd MMM yyyy");