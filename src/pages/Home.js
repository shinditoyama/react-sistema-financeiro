import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { categories } from "../data/categories";
import Header from "../components/Header";
import InfoArea from "../components/InfoArea";
import FormDialog from "../components/FormDialog";
import DataTable from "../components/DataTable";

const Home = () => {
    const list = useSelector((state) => state.data.list);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        let incomeCount = 0;
        let expenseCount = 0;

        for (let i in list) {
            if (categories[list[i].category].expense) {
                expenseCount += list[i].price;
            } else {
                incomeCount += list[i].price;
            }
        }

        setIncome(incomeCount);
        setExpense(expenseCount);
    }, [list]);

    const dialogHandler = () => {
        setOpenDialog(!openDialog);
    };

    return (
        <Box>
            <FormDialog open={openDialog} dialogHandler={dialogHandler} />
            <Header>
                <InfoArea income={income} expense={expense} />
            </Header>
            <Container sx={{ marginTop: -4 }}>
                <Fab color="error" aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </Fab>
                <DataTable />
            </Container>
        </Box>
    )
}

export default Home;