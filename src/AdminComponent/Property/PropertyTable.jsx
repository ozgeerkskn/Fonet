import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePropertyAction,
  getPropertyItemsByRealEstateId,
} from "../../component/State/Property/Action";

const PropertyTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { realEstate, features, property } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getPropertyItemsByRealEstateId({
        jwt,
        realEstateId: realEstate.usersRealEstate.id,
        rent: false,
        nonrent: false,
        sale: false,
        propertyCategory: "",
      })
    );
  }, []);
  const handleDeleteProperty = (propertyId) => {
    dispatch(deletePropertyAction({ propertyId, jwt }));
  };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/realEstate/add-property")}
              aria-label="settings"
            >
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
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Features</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {property.propertyItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.features.map((feature) => (
                      <Chip label={feature.name} />
                    ))}
                  </TableCell>

                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    {item.available ? "in_stoke" : "out_of_stoke"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteProperty(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default PropertyTable;
