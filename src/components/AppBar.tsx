import React from "react";

import { AppBar as MuiAppBar, Toolbar, Typography } from "@material-ui/core";

export default function AppBar() {
  return (
    <>
      <MuiAppBar color="primary" position="sticky">
        <Toolbar>
          <Typography variant="h6">Weather Display</Typography>
        </Toolbar>
      </MuiAppBar>
    </>
  );
}
