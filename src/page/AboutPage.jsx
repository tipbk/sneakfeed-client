import { Typography } from "@mui/material";
import React from "react";

export default function AboutPage() {
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>About</Typography>
            <Typography>Sneakfeed is a social media website that I made to learn some technologies.</Typography>
            <br />
            <Typography>Hi, my name is Chanathip Nateprapai from Thailand.</Typography>
            <br />
            <Typography>I could say that I am passionate about technologies since I was a kid.</Typography>
            <Typography>Especially, I love to learn how things work.</Typography>
            <br />
            <Typography>Here is my resume.</Typography><a href="https://drive.google.com/drive/folders/1hWJDnZ5SCEHfuVMJ6q_YDpdGNunJd5Uf?usp=drive_link">https://drive.google.com/drive/folders/1hWJDnZ5SCEHfuVMJ6q_YDpdGNunJd5Uf?usp=drive_link</a>
            <br />
            <br />
            <Typography>If you would like to contact me. Please send me an email. I would love to hear.</Typography>
            <Typography>Name: Chanathip Nateprapai</Typography>
            <Typography>Contact: chanathip.nate@gmail.com</Typography>
            <Typography>Always available for job offer. Let's have some talk.</Typography>
        </React.Fragment>
    );
}