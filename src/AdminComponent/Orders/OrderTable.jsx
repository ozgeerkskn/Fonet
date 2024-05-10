import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRealEstatesOrder,
  updateOrderStatus,
} from "../../component/State/Real Estate Order/Action";

const orderStatus = [
  { label: "Pending", value: "PANDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" },
];

const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { realEstate, realEstateOrder, features, property } = useSelector(
    (store) => store
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(
      fetchRealEstatesOrder({
        jwt,
        realEstateId: realEstate.usersRealEstate?.id,
      })
    );
  }, []);

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose();
  };

  return (
    <Box>
      <Card className="">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Features</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {realEstateOrder.orders.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar src={orderItem.property?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>

                  <TableCell align="right">{item.totalAmount}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p>{orderItem.property?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <div>
                        {orderItem.features.map((feature) => (
                          <Chip label={feature} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          onClick={() =>
                            handleUpdateOrder(item.id, status.value)
                          }
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
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

export default OrderTable;
