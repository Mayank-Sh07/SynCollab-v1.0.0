import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
  GridColDef,
} from "@material-ui/data-grid";
import { TableProps } from "@/types/local";
import {
  createStyles,
  makeStyles,
  Theme,
  fade,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import TuneIcon from "@material-ui/icons/Tune";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      height: 430,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    styles: {
      flexGrow: 1,
      "& .table--header": {
        backgroundColor: fade(theme.palette.secondary.dark, 0.5),
        overflow: "clip",
        borderLeft: "1px solid black",
      },
    },
    toolbarContainer: {
      backgroundColor: theme.palette.common.black,
      borderTopRightRadius: "8px",
      borderTopLeftRadius: "8px",
    },
    toolbarButton: {
      color: theme.palette.secondary.main,
      backgroundColor: "inherit",
      border: `1px solid ${theme.palette.secondary.main}`,
      maxHeight: 32,
      padding: "8px",
      margin: theme.spacing(1),
    },
    dataGrid: {
      border: `2px solid ${theme.palette.primary.light}`,
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
        borderRight: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
    },
  })
);

export default function Table(props: TableProps) {
  const classes = useStyles();
  const { rows, columns, containerProps } = props;
  const CustomToolbar = () => (
    <GridToolbarContainer className={classes.toolbarContainer}>
      <GridFilterToolbarButton className={classes.toolbarButton} />
      <GridColumnsToolbarButton className={classes.toolbarButton} />
    </GridToolbarContainer>
  );
  const FilterIcon = () => <TuneIcon style={{ fontSize: 20 }} />;

  const columnsWithStyles = columns.map((col: GridColDef) => ({
    ...col,
    headerClassName: "table--header",
  }));

  return (
    <Container maxWidth={containerProps.maxWidth} className={classes.container}>
      <div className={classes.styles}>
        <DataGrid
          rows={rows}
          columns={columnsWithStyles}
          className={classes.dataGrid}
          disableColumnMenu={true}
          components={{
            Toolbar: CustomToolbar,
            OpenFilterButtonIcon: FilterIcon,
          }}
        />
      </div>
    </Container>
  );
}
