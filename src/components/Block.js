import { Box, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import colors from "../constants/colors";

export default function Block({ data, index }) {
  const classes = useStyles();
  return (
    <Box className={classes.block}>
      <Typography variant="h5" className={classes.index}>
        {index || "Unknown"}
      </Typography>
      <Typography variant="h5" className={classes.data}>
        {data || "Unknown"}
      </Typography>
    </Box>
  );
}
Block.propTypes = {
  data: PropTypes.string,
  index: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  block: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    marginBottom: "4px",
    padding: "8px",
  },
  index: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 700,
    color: colors.blue,
    lineHeight: theme.typography.pxToRem(16),
  },
  data: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    color: colors.text,
    lineHeight: theme.typography.pxToRem(20),
  },
}));
