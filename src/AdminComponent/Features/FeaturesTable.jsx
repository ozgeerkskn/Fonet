import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import CreateFeaturesForm from "./CreateFeaturesForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeaturesOfRealEstate,
  updateStockOfFeature,
} from "../../component/State/Features/Action";

const orders = [1, 1, 1, 1, 1, 1, 1, 1, 1];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const FeaturesTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { realEstate, features } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(
      getFeaturesOfRealEstate({ jwt, id: realEstate.usersRealEstate.id })
    );
  }, []);

  const handleUpdateStoke = (id) => {
    dispatch(updateStockOfFeature({ id, jwt }));
  };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Features"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>

                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.features.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>

                  <TableCell align="right">{item.category.name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleUpdateStoke(item.id)}>
                      {item.inStoke ? "in_stoke" : "out_of_stoke"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFeaturesForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default FeaturesTable;
