import { Box, Container } from "@mui/material";

const Header = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "purple",
                height: "30vh",
            }}
        >
            <Container>
                {children}
            </Container>
        </Box>
    );
};

export default Header;
