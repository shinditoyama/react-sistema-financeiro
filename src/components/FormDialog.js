import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import { nanoid } from "@reduxjs/toolkit"
import { categories } from "../data/categories";
import { addList } from "../store/slices/dataSlice";

const FormDialog = ({ open, dialogHandler }) => {
    const dispatch = useDispatch();
    const [titleField, setTitleField] = useState("");
    const [valueField, setValueField] = useState(0);
    const [dateField, setDateField] = useState("");
    const [categoryField, setCategoryField] = useState("");

    let categoryKeys = Object.keys(categories);

    const handleAddEvent = () => {
        let errors = [];

        if (isNaN(new Date(dateField).getTime())) {
            errors.push("Data inválida!");
        }
        if (!categoryKeys.includes(categoryField)) {
            errors.push("Categoria inválida!");
        }
        if (titleField === "") {
            errors.push("Título vazio!");
        }
        if (valueField <= 0) {
            errors.push("Valor inválido!");
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        const onAdd = {
            id: nanoid(),
            date: dateField,
            category: categoryField,
            title: titleField,
            price: parseFloat(valueField)
        }

        dispatch(addList(onAdd));
        clearFields();
    }

    const clearFields = () => {
        dialogHandler();
        setTitleField("");
        setValueField(0);
        setDateField("");
        setCategoryField("");
    }

    return (
        <Dialog
            open={open}
            onClose={dialogHandler}
            keepMounted
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Formulário</DialogTitle>
            <DialogContent sx={{ "& .MuiTextField-root": { width: "26ch" } }}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item>
                        <TextField
                            type="text"
                            label="Título"
                            variant="standard"
                            value={titleField}
                            onChange={(e) => setTitleField(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="number"
                            label="Valor"
                            variant="standard"
                            value={valueField}
                            inputProps={{ min: 0, max: 10000 }}
                            onChange={(e) => setValueField(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="date"
                            label="Data"
                            variant="standard"
                            value={dateField}
                            onChange={e => setDateField(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            select
                            label="Categoria"
                            variant="standard"
                            value={categoryField}
                            onChange={e => setCategoryField(e.target.value)}
                        >
                            {categoryKeys.map((key, index) => (
                                <MenuItem key={index} value={key}>
                                    {categories[key].title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type="button" onClick={dialogHandler}>Cancel</Button>
                <Button type="submit" onClick={handleAddEvent}>OK</Button>
            </DialogActions>
        </Dialog >
    );
}

export default FormDialog;