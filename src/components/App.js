import React from "react";
import api from "../lib/api";

import Grid from "@material-ui/core/Grid";
import { DataTable } from "./DataTable";

export const App = () => {
  /**
   * fetches User Diff Data
   */
  const fetchUserDiffData = () => {
    return api.getUsersDiff();
  };

  /**
   * fetches Project Diff Data
   */
  const fetchProjectDiffData = () => {
    return api.getProjectsDiff();
  };

  return (
    <Grid item xs={12} className="app">
      <DataTable
        label="User Diff Data Table"
        fetchData={() => fetchUserDiffData()}
      ></DataTable>
      <DataTable
        label="Project Diff Data Table"
        fetchData={() => fetchProjectDiffData()}
      ></DataTable>
    </Grid>
  );
};

export default App;
