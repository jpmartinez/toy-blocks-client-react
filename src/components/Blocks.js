import { Box, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import Block from "./Block";

export default function Blocks({ blocks = {} }) {
  const classes = useStyles();
  const { loading, list, error } = blocks;
  if (loading) {
    return <span>LOADING</span>;
  }
  if (error) {
    return <span>ERROR</span>;
  }
  if (list && list.length) {
    return (
      <Box className={classes.container}>
        {list.map((block, ix) => (
          <Block key={ix} {...block}></Block>
        ))}
      </Box>
    );
  } else {
    return <span>NO BLOCKS</span>;
  }
}

Blocks.propTypes = {
  blocks: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    list: PropTypes.array,
  }),
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));
