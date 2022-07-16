import { Card, CardContent, Grid } from "@mui/material";
import ResumeItem from "./ResumeItem";

const InfoArea = ({ income, expense }) => {
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={4} md={4}><ResumeItem title="Receitas" value={income} /></Grid>
                    <Grid item xs={4} md={4}><ResumeItem title="Despesas" value={expense} /></Grid>
                    <Grid item xs={4} md={4}><ResumeItem title="Balanço" value={income - expense} color={(income - expense) < 0 ? 'red' : 'green'} /></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default InfoArea;