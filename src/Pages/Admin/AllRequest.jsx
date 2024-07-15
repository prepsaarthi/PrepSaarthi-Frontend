import React from "react";
import { Box, Grid } from "@mui/material";
import RequestCard from "../../Components/RequestCard/RequestCard";
export const Pendingreq = ({ requests }) => {
  return (
    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {requests?.length === 0 ? (
        <h1>No Pending Requests</h1>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {requests?.map((item, i) => {
              return <RequestCard item={item} i={i + "p"} />;
            })}
          </Grid>
        </>
      )}
    </Box>
  );
};
export const UpdationReq = ({ requests }) => {
  return (
    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {requests?.length === 0 ? (
        <h1>No Pending Requests</h1>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            {requests?.map((item, i) => {
              return <RequestCard item={item} i={i + "pr"} />;
            })}
          </Grid>
        </>
      )}
    </Box>
  );
};

export const ApprovedReq = ({ requests }) => {
  return (
    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {requests?.length === 0 ? (
        <h1>No Approved Requests</h1>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {requests?.map((item, i) => {
            return <RequestCard item={item} i={i + "a"} />;
          })}
        </Grid>
      )}
    </Box>
  );
};

export const RejectedReq = ({ requests }) => {
  return (
    <Box minHeight={"70vh"} display={"flex"} justifyContent={"center"}>
      {requests?.length === 0 ? (
        <h1>No Approved Requests</h1>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {requests?.map((item, i) => {
            return <RequestCard item={item} i={i + "r"} />;
          })}
        </Grid>
      )}
    </Box>
  );
};
