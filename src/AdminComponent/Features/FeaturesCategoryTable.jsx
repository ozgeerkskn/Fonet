import {
  Box,
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
import CreateFeaturesCategoryForm from "./CreateFeaturesCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getFeatureCategory } from "../../component/State/Features/Action";

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

const FeaturesCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { realEstate, features } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getFeatureCategory({ id: realEstate.usersRealEstate.id, jwt }));
  }, []);

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Feature Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {features.category.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
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
          <CreateFeaturesCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default FeaturesCategoryTable;
