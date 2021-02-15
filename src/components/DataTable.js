import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Loader from "react-loader-spinner";

import { useState, useEffect } from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  paddingRight: 4,
  paddingLeft: 5,
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    display: "flex",
    overflowX: "hide",
  },
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  },
});

export const DataTable = ({ label, fetchData }) => {
  useEffect(() => {
    (async () => {
      await processData();
    })();
  }, []);
  const classes = useStyles();

  //sortOrder initialized to newestFirst true
  const [sortOrder, setSortOrder] = useState(true);
  const [error, setError] = useState("");
  const [processedData, setProcessedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allDataRetrieved, setAllDataRetrieved] = useState(false);

  /**
   * handles fetching of Data, loading and error states
   */
  const processData = async () => {
    try {
      setLoading(true);
      const result = await fetchData();
      setProcessedData([...processedData, ...result.data]);
      setError("");
      if (result.offset + result.limit >= result.total) {
        //signifies all data has been retrieved
        setAllDataRetrieved(true);
      }
    } catch (e) {
      setError("We had problems fetching your data. Please try again");
    }
    setLoading(false);
  };

  /**
   *
   * @param data the data to be sorted
   * @param  newestFirst boolean to denote if the sortOrder is newestFirst or not
   */
  const sortedByDate = (data, newestFirst) => {
    let sortedData;
    if (newestFirst) {
      sortedData = [...data].sort((a, b) => b.timestamp - a.timestamp);
    } else {
      sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
    }

    return sortedData;
  };

  /**
   * toggles sort order
   */
  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };
  return (
    <Box>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        {label}
      </Typography>
      {/* Just a dummy fetcher to show how the api should be used, this should be removed */}
      <Paper>
        <Table stickyHeader aria-label={label} style={{ minWidth: 340 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={toggleSortOrder}>
                Date
                {sortOrder ? (
                  <ArrowDropDownIcon></ArrowDropDownIcon>
                ) : (
                  <ArrowDropUpIcon></ArrowDropUpIcon>
                )}
              </StyledTableCell>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell>Old value</StyledTableCell>
              <StyledTableCell>New value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedByDate(processedData, sortOrder).map((diffData) => (
              <StyledTableRow key={diffData.id}>
                <StyledTableCell>
                  {Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(diffData.timestamp)}
                </StyledTableCell>
                <StyledTableCell>{diffData.id}</StyledTableCell>
                <StyledTableCell>{diffData.diff[0].oldValue}</StyledTableCell>
                <StyledTableCell>{diffData.diff[0].newValue}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <div style={{ textAlign: "center", margin: "5px" }}>
        <div className={classes.errorMessage}>{error}</div>
        {loading === true ? (
          <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        ) : !allDataRetrieved ? (
          <Button variant="contained" color="primary" onClick={processData}>
            {error === "" ? "Load more" : "Retry"}
          </Button>
        ) : (
          <div className={classes.successMessage}>All Data Retrieved</div>
        )}
      </div>
    </Box>
  );
};
