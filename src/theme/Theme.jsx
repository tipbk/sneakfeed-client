import { Button } from "@mui/material";
import { ThemeProvider, createTheme  } from '@mui/material/styles'
import { teal } from '@mui/material/colors'

const redTheme = createTheme({ palette: { primary: teal } })

export default function CustomButton({ text, action }) {
    return (
        <ThemeProvider theme={redTheme}>
            <Button variant="contained" onClick={action}>{text}</Button>
        </ThemeProvider>
    );
}

export const theme = createTheme({
    typography: {
      fontFamily: [
        'helvetica','Arial','sans-serif'
      ].join(','),
    }
  });
  