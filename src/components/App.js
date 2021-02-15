import React from "react";
import api from "../lib/api";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

export const App = () => {
  const [userDiffData, setUserDiffData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      fetchData();
    })();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.getUsersDiff();
      console.log(result);
      setUserDiffData(result.data);
      setError("");
    } catch (e) {
      setError("We had problems fetching your data. Please try again");
    }
    setLoading(false);
  };

  const sortedByDate = (data, newestFirst) => {
    let sortedData;
    if(newestFirst){
      sortedData = [...data].sort((a, b) => b.timestamp - a.timestamp);
    } else{
      sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
    }
     
    return sortedData;
  };

  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
    console.log(`Sort Order Changed `)
  }
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Typography>User Diff Data Table</Typography>
        {/* Just a dummy fetcher to show how the api should be used, this should be removed */}

        <table >
          <thead>
            <tr>
              <th onClick={toggleSortOrder}>Date</th>
              <th>User ID</th>
              <th>Old value</th>
              <th>New value</th>
            </tr>
          </thead>
          <tbody >
            {sortedByDate(userDiffData, sortOrder).map((userDiff) =>(
                <tr key={userDiff.id}>
                  <td>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(userDiff.timestamp)}</td>
                  <td>{userDiff.id}</td>
                  <td>{userDiff.diff[0].oldValue}</td>
                  <td>{userDiff.diff[0].newValue}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>{error}</div>
        {loading === true ? <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        : <Button variant="contained" color="primary" onClick={fetchData}>
        {error === "" ? "Load more" : "Retry"}
      </Button>}
        
        
      </Box>
    </Container>
  );


};

export default App;
