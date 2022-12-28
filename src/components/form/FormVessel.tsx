import { Formik, Form, Field } from "formik";
import { Box, Divider, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../features/map/hooks";
import { fetchVessel } from "../../features/map/vesselSlice";
import { formValidationSchema } from "./validation";
import { options } from "./constants";

interface FormValuesType {
  mmsi: number;
  days: number;
  period: string;
}

const FormVessel = () => {
  const dispatch = useAppDispatch();
  return (
    <Box style={{ marginTop: "20px" }}>
      <Divider />
      <Typography variant="h6" align="center">
        Search vessel API
      </Typography>
      <Formik
        initialValues={{ mmsi: 241486000, days: 5, period: options[0].value }}
        validationSchema={formValidationSchema}
        onSubmit={(values: FormValuesType, { setSubmitting }) => {
          dispatch(fetchVessel(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, touched, errors, isValid, setFieldValue }) => (
          <Form>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                gap: "20px",
                marginRight: "20px",
              }}
            >
              <Field
                name="mmsi"
                label="mmsi"
                variant="outlined"
                component={TextField}
                margin="normal"
                size="small"
                value={values.mmsi}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("mmsi", event.target.value);
                }}
                error={touched.mmsi && !!errors.mmsi}
                helperText={touched.mmsi && errors.mmsi}
              />
              <Field
                name="days"
                label="days"
                variant="outlined"
                component={TextField}
                margin="normal"
                size="small"
                value={values.days}
                error={touched.days && !!errors.days}
                helperText={touched.days && errors.days}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("days", event.target.value);
                }}
              />
              <Select
                labelId="period"
                id="period"
                value={values.period}
                onChange={(event: ChangeEvent<{ value: string | undefined | unknown }>) => {
                  setFieldValue("period", event.target.value);
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
                size="small"
              >
                Search
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormVessel;
