import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loader() {
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "100px" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
