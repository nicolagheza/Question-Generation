import { Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
           {"Made with ❤️ "}
            <Link color="inherit" href="https://www.twitter.com/nicode_it">
                by NiCode
            </Link>{" "}
        </Typography>
    )
}