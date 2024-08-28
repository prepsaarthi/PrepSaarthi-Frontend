import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewConnection, clearError, reset } from "../../action/userAction";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";


const ManageConnection = () => {
    const [mentorId, setMentorId] = useState("")
    const [StuPhn, setStuPhn] = useState("")
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState(1)
    const [price, setPrice] = useState('')
    const dispatch = useDispatch()
    const {loading,error,success,message} = useSelector(state => (state.newConnection))

    useEffect(() => {
     if(success){
        toast.success(message)
        dispatch(reset())
     }   
     if(error){
        toast.error(error.message)
        dispatch(clearError())
     }
    }, [success,message])
  return (
    <>
      <Box sx={{ width: "100vw", minHeight: "60vh" }}>
        <TextField
          name="mentor"
          required
          value={mentorId}
          onChange={(e) => {
            setMentorId(e.target.value);
          }}
          id="menId"
          label="Mentor's Id"
        />
        <TextField
          name="student"
          required
          value={StuPhn}
          onChange={(e) => {
            setStuPhn(e.target.value);
          }}
          
          id="stuPhn"
          label="Student's Phone"
        />
        <TextField
          name="price"
          required
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          
          id="Price"
          label="Mentorship Price"
        />
          <Select
          labelId="duration"
          id="duration"
          value={duration}
          label="Duration"
          onChange={(e) => {
            setDuration(e.target.value);
          }}        >
          <MenuItem value={1}>Weekly</MenuItem>
          <MenuItem value={3}>Monthly</MenuItem>
        </Select>
          <input type="datetime-local" id="birthdaytime" name="birthdaytime" value={time} onChange={(e) => setTime(e.target.value)}/>
          <LoadingButton loading={loading} onClick={() => {
            dispatch(addNewConnection({id:mentorId,phnNo:StuPhn,duration:duration,time:time, price:price}))
          }}>Add New Connection</LoadingButton>
      </Box>
    </>
  );
};

export default ManageConnection;
