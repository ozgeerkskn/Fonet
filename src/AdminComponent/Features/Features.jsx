import { Grid } from "@mui/material";
import React from "react";
import FeaturesTable from "./FeaturesTable";
import FeaturesCategoryTable from "./FeaturesCategoryTable";

const Features = () => {
  return (
    <div className="px-2">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <FeaturesTable />
        </Grid>
        <Grid item xs={12} lg={4}>
          <FeaturesCategoryTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
