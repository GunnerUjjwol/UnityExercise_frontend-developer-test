import React from "react";
import api from "../lib/api";

import Container from "@material-ui/core/Container";
import { DataTable } from "./DataTable";

export const App = () => {
  const fetchUserDiffData = () => {
    return api.getUsersDiff();
  };

  const fetchProjectDiffData = () => {
    return api.getProjectsDiff();
  };

  return (
    <Container className="app" fixed style={{ width: "100%" }}>
      <DataTable
        style={{ height: "50%", overflowY: "auto" }}
        label="User Diff Data Table"
        fetchData={() => fetchUserDiffData()}
      ></DataTable>
      <DataTable
        style={{ height: "50%", overflowY: "auto" }}
        label="Project Diff Data Table"
        fetchData={() => fetchProjectDiffData()}
      ></DataTable>
    </Container>
  );
};

export default App;
