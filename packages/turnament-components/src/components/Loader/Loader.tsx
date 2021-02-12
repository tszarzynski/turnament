import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={1}
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
