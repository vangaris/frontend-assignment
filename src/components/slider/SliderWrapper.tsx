import { Box, Paper } from "@material-ui/core";
import { ReactNode } from "react";

type PropsTypes = {
  children: ReactNode | ReactNode[];
};

export const SliderWrapper = ({ children }: PropsTypes) => {
  return (
    <>
      <Box
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          marginTop: "11px",
          top: "65vh",
          width: "100%",
          minWidth: "1200px",
        }}
      >
        <Paper
          style={{
            height: "300px",
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
