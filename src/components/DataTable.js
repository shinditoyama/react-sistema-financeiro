import { useDispatch, useSelector } from "react-redux";
import { Box, Chip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { categories } from "../data/categories";
import { deleteList } from "../store/slices/dataSlice";
import { formatCurrency } from "../utils/dataFormatter";
import moment from "moment";

const DataTable = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.data.list);

    // const sortedList = [...list];
    // sortedList.sort((a, b) => new Date(a.date) - new Date(b.date));

    const columns = [
        {
            name: "date",
            label: "DATA",
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return moment(value).format("DD/MM/yyyy")
                }
            }
        },
        { name: "title", label: "DESCRIÇÃO", options: { filter: false, sort: false } },
        {
            name: "category",
            label: "CATEGORIA",
            options: {
                sort: false,
                customBodyRender: (value) => {
                    return <Chip label={categories[value].title} sx={{ backgroundColor: `${categories[value].color}`, color: "white" }} />
                }
            }
        },
        {
            name: "price",
            label: "VALOR",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return <Box sx={{ color: `${categories[tableMeta.rowData[2]].expense ? 'red' : 'green'}` }}>{formatCurrency(value)}</Box>
                }
            }
        },
    ];

    const options = {
        search: true,
        download: false,
        print: true,
        viewColumns: false,
        filter: true,
        filterType: "dropdown",
        responsive: "simple",
        tableBodyHeight: "100%",
        tableBodyMaxHeight: "",
        onRowsDelete: (rowsDeleted) => {
            const idsToDelete = rowsDeleted.data.map((item) => item.dataIndex);
            dispatch(deleteList(idsToDelete));
        }
    };

    return (
        <Box sx={{ paddingY: 3 }}>
            <MUIDataTable
                title="Minha Finança"
                data={list}
                columns={columns}
                options={options}
            />
        </Box>
    );
}

export default DataTable;