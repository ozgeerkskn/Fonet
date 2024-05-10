import { Grid } from "@mui/material";
import React from "react";
import PropertyTable from "../Property/PropertyTable";
import OrderTable from "../Orders/OrderTable";

const RealEstateDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item items xs={12} lg={6}>
          <PropertyTable />
        </Grid>
        <Grid item items xs={12} lg={6}>
          <OrderTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default RealEstateDashboard;
