import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Pendingreq, ApprovedReq, RejectedReq } from "./AllRequest";
import { useSelector, useDispatch } from "react-redux";
import { getMentorRequest } from "../../action/metorListAction";
import Loader from "../../Components/Loader/Loader";
const requests = [
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor1.png",
    mentorshipStatus: "rejected",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor2.png",
    mentorshipStatus: "approved",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor1.png",
    mentorshipStatus: "pending",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor2.png",
    mentorshipStatus: "rejected",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor2.png",
    mentorshipStatus: "approved",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor1.png",
    mentorshipStatus: "pending",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor2.png",
    mentorshipStatus: "rejected",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor1.png",
    mentorshipStatus: "approved",
  },
  {
    name: "Dinesh Raj",
    college: "IIT BHU",
    exam: {
      name: "JEE ADV",
      rank: 5003,
    },
    branch: "CSE",
    rating: 0,
    mentee: 0,
    gradYr: 3,
    about: "",
    reviews: [],
    img: "/images/mentor1.png",
    mentorshipStatus: "pending",
  },
];

const Requests = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.requestList);
  // eslint-disable-next-line
  let approved = 0;
  // eslint-disable-next-line
  let pending = 0;
  // eslint-disable-next-line
  let rejected = 0;
  requests.forEach((item) => {
    if (item.mentorshipStatus === "approved") {
      approved++;
    }
    if (item.mentorshipStatus === "pending") {
      pending++;
    }
    if (item.mentorshipStatus === "rejected") {
      rejected++; 
    }
  });
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getMentorRequest());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ width: "28vw" }}
                label={`Pending(${user?.usersPending?.length})`}
                {...a11yProps(0)}
              />
              <Tab
                sx={{ width: "28vw" }}
                label={`Approved(${user?.userApproved?.length})`}
                {...a11yProps(1)}
              />
              <Tab
                sx={{ width: "28vw" }}
                label={`Rejected(${user?.userRejected?.length})`}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Pendingreq requests={user?.usersPending} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ApprovedReq requests={user?.userApproved} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RejectedReq requests={user?.userRejected} />
          </CustomTabPanel>
        </Box>
      )}
    </>
  );
};

export default Requests;
