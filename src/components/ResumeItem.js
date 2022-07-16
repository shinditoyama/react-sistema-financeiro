import { Box } from "@mui/material";
import { formatCurrency } from "../utils/dataFormatter";

const ResumeItem = ({ title, value, color }) => {
    return (
        <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
            <Box sx={{ color: "#888" }}>{title}</Box>
            <Box sx={{ color: color }}>{formatCurrency(value)}</Box>
        </Box>
    );
}

export default ResumeItem;