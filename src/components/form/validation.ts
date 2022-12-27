import * as Yup from "yup";
import { options } from "../../constants/map";


export const formValidationSchema = Yup.object().shape({
  mmsi: Yup.number().required("MMSI is required").min(9, "MMSI must be at least 9 characters"),
  days: Yup.number().required("Days is required"),
  period: Yup.string()
    .required("period is required")
    .oneOf(options.map((option) => option.value)),
});