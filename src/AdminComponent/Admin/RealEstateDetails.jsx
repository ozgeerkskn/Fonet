import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch, useSelector } from "react-redux";
import { updateRealEstateStatus } from "../../component/State/RealEstate/Action";
const RealEstateDetails = () => {
  const { realEstate } = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log("Real Estate Details", realEstate);
  const handleRealEstatesStatus = () => {
    dispatch(
      updateRealEstateStatus({
        realEstateId: realEstate.userRealEstate.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };
  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {realEstate.usersRealEstate?.name}
        </h1>
        <div>
          <Button
            color={!realEstate.usersRealEstate?.open ? "primary" : "error"}
            className="py-[1rem] px-[2rem]"
            variant="contained"
            onClick={handleRealEstatesStatus}
            size="large"
          >
            {realEstate.usersRealEstate?.open ? "close" : "open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Real Estate</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Owner</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.owner.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Real Estate Name</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Property Type</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.propertyType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Opening Hours</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Status</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
                        Closed
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Address</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Country</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Özge Erkeskin
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">City</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Özge Erkeskin
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Postal Code</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Özge Erkeskin
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Street Address</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Özge Erkeskin
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Contact</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Email</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.contactInformation?.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>

                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {realEstate.usersRealEstate?.contactInformation?.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Social</p>
                  <div className="flex text-gray-400 items-center pb-3 gap-2">
                    <span className="pr-5">-</span>
                    <a
                      href={
                        realEstate.usersRealEstate?.contactInformation
                          ?.instagram
                      }
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        realEstate.usersRealEstate?.contactInformation?.twitter
                      }
                    >
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        realEstate.usersRealEstate?.contactInformation?.linkedin
                      }
                    >
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        realEstate.usersRealEstate?.contactInformation?.facebook
                      }
                    >
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RealEstateDetails;
