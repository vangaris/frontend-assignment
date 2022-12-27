import { Box, Paper } from "@material-ui/core";
import React, { ReactNode } from "react";

type PropsTypes = {
  children: ReactNode | ReactNode[];
};

export const SliderWrapper = ({ children }: PropsTypes) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "11px",
        }}
      >
        <Paper
          style={{
            height: 320,
            width: "65%",
            backgroundColor: "white",
            opacity: 0.9,
          }}
          elevation={24}
        >
          {children}
        </Paper>
      </Box>
    </>
  );
};
