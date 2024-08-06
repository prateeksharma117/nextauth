import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { toast } from "react-toastify";
import { genderOptions } from "../Constants";
import { updateExistingUser } from "../../app/api/actions/user.action";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";

const UserProfileDialog = ({ setOnEdit,sessionData }) => {
  const { data: session,update} = useSession();
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState<any>({});
  const [gender, setGender] = useState<any>({});
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);
  const options = useMemo(() => countryList().getData(), []);

  const onCountryChangeHandler = (value: any) => {
    setCountry(value);
  };

  const onGenderChangeHandler = (value: any) => {
    setGender(value);
  };

  const handleClose = () => {
    setOpen(false);
    setOnEdit(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email: sessionData?.email,
        address,
        bio,
        country: country?.label,
        gender: gender?.label,
      };
      await updateExistingUser(data);
      await update({
        ...session,
        user: {
          ...session.user,
          ...data,
        },
      });
      setOnEdit(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Unusual error occur!");
    }
  };
  
  useEffect(() => { 
    setName(sessionData?.name)
    setBio(sessionData?.bio)
    setAddress(sessionData?.address)
    setCountry({ label: sessionData?.country || "", value: sessionData?.country || "" })
    setGender({ label: sessionData?.gender || "", value: sessionData?.gender || "" })
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className=" w-full h-full">
            <Box onSubmit={handleSubmit} component="form" noValidate>
              <h1 className=" text-4xl font-bold">Edit Personal Information</h1>
              <p>
                This section is designed to update your Personal Information.
              </p>
              <Grid container component="main">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    value={name}
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    onChange={(e) => setBio(e.target.value)}
                    margin="normal"
                    required
                    value={bio}
                    fullWidth
                    id="bio"
                    label="Bio"
                    name="bio"
                    autoFocus
                  />

                  <TextField
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                    required
                    value={address}
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Select
                    options={options}
                    value={country}
                    placeholder="Country"
                    onChange={onCountryChangeHandler}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Select
                    options={genderOptions}
                    value={gender}
                    placeholder="Gender"
                    onChange={onGenderChangeHandler}
                  />
                </Grid>

                <Button
                  sx={{ mt: "2rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfileDialog;
