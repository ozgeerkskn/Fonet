import { Box, Button, Divider, Grid, Modal, TextField } from "@mui/material";
import React from "react";
import CardItem from "./CardItem";
import AddressCard from "./AddressCard";
import cartReducer from "../State/Cart/reducer";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Card } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../Auth/Auth";
import { createKey } from "../State/Key/Action";
//import * as Yup from "yup";
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#0D0D0D",
  outline: "none",
  boxShadow: 24,
  p: 4,
};
const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

// const validationSchema = Yup.object.shape({
//   streetAddress: Yup.string().required("Street address is required"),
//   state: Yup.string().required("Stateis required"),
//   pincode: Yup.required("Pincode is required"),
//   city: Yup.string().required("City is required"),
// });
const items = [1, 1];
const Cart = () => {
  const createSelectedAddress = () => {};
  const handleOpenAddressModal = () => setOpen(true);
  const [open, setOpen] = React.useState(false);

  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        realEstateId: cart.cartItems[0].property?.realEstate.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "turkey",
        },
      },
    };
    dispatch(createKey(data));
    console.log("form value", values);
  };
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cart?.item.map((item) => (
            <CardItem item={item} />
          ))}

          <Divider />
          <div className="priceDetails px-5 text-sm">
            <p className="font-extralight py-5">Price Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Property Total</p>
                <p>₺{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Feature Total</p>
                <p>₺ 5780</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Real Estate Agent Fee</p>
                <p>₺ 30000</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>KDV</p>
                <p>₺ 390</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Payment</p>
              <p>₺{cart.cart?.total + 30000 + 390}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Select the address to which the property key will be delivered.
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((item) => (
                <AddressCard
                  handleSelectAddress={createSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}

              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Location
                  </h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModal}
                  >
                    Add New Location
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            //validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="pincode"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
