import { Box, CircularProgress, Link, Typography } from "@mui/material";

export function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://sneakfeed.vercel.app/">
          Sneakfeed
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export function GenericLoading() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4, mb: 4 }} alignItems='center' justifyContent='center'>
        <CircularProgress />
    </Box>
  );
}