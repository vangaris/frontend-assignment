import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useAppSelector } from "../../../features/map/hooks";

type PropsType = {
  label: string;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomCheckbox = ({ label, handleChange }: PropsType) => {
  const showClusterer = useAppSelector((state) => state.animation.showClusterer);

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={<Checkbox color="primary" checked={showClusterer} onChange={handleChange} />}
        label={label}
      />
    </FormControl>
  );
};

export default CustomCheckbox;
