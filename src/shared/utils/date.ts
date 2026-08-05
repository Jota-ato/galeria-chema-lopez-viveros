import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: Date | string) =>
  format(new Date(date), "dd/MM/yyyy", { locale: es });
