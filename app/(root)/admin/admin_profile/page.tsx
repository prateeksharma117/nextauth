"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadUserImage } from "../../../api/actions/user.action";
import UserProfileDialog from "../../../../components/shared/UserProfileDialog";
import { toast } from "react-toastify";
import { Avatar, Box, Button, Grid } from "@mui/material";

const UserAccount = () => {
  const { data: session, status } = useSession();
  const [avatarPreview, setAvatarPreview] = useState("/images/person.png");
  const [onEdit, setOnEdit] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [sessionData, setSessionData] = useState<any>({});

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setAvatarPreview(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const uploadNewImage = async () => {
    try {
      const data = {
        email: session?.user?.email,
        filename: profileImage?.name,
      };
      await uploadUserImage(data);
      toast.success("Profile image is successfully uploaded");
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    setSessionData(session?.user);
  }, [session]);

  if (status === "loading") {
    return <div className=" flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className=" min-h-screen">
      <Grid container component="main">
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <label htmlFor="avatar">
                <Avatar
                  alt="Profile Picture"
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    marginBottom: "1rem",
                    cursor: "pointer",
                    fontSize:"2rem",
                    bgcolor:"purple"
                  }}
                >
                  {session?.user?.name?.charAt(0)}
                </Avatar>
              </label>

              {profileImage && (
                <Button
                  onClick={uploadNewImage}
                  sx={{ my: "5px", bgcolor: "green" }}
                  variant="contained"
                >
                  Save
                </Button>
              )}
            </Grid>
            <p className=" font-bold mt-1 text-xl">{session?.user?.name}</p>
            <div>
              <p className=" font-bold mt-1 text-lg text-center">10</p>
              <p className=" text-gray-400 text-sm text-center">Total orders</p>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} sx={{ p: 2 }}>
          <Box>
            <h1 className=" text-4xl font-bold text-center">
              Personal Information
            </h1>
            <p className="text-center">
              This section is designed to keep all your personal details
              organized and easily accessible. Here, you can view and update
              your Personal Information.
            </p>
            <Button
              onClick={() => setOnEdit(true)}
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "green", color: "white" }}
            >
              Edit
            </Button>
            <div className=" space-y-3">
              <div className=" flex flex-row items-center gap-2">
                <h1 className=" text-xl bg-[#efeefa] text-[#372193] rounded-md font-semibold p-1">
                  Full Name:{" "}
                </h1>
                <p className=" text-gray-600">{sessionData?.name}</p>
              </div>

              <div className=" flex flex-row items-center gap-2">
                <h1 className=" text-xl bg-[#efeefa] text-[#372193] rounded-md font-semibold p-1">
                  Email:{" "}
                </h1>
                <p className=" text-gray-600">{sessionData?.email}</p>
              </div>

              <div className=" flex flex-row items-center gap-2">
                <h1 className=" text-xl bg-[#efeefa] text-[#372193] rounded-md font-semibold p-1">
                  Bio:{" "}
                </h1>
                <p className=" text-gray-600">{sessionData?.bio}</p>
              </div>

              <div className=" flex flex-row items-center gap-2">
                <h1 className=" text-xl bg-[#efeefa] text-[#372193] rounded-md font-semibold p-1">
                  Address:{" "}
                </h1>
                <p className=" text-gray-600">{sessionData?.address}</p>
              </div>

              <div className=" flex flex-row items-center gap-2">
                <h1 className=" text-xl bg-[#efeefa] text-[#372193] rounded-md font-semibold p-1">
                  Country:{" "}
                </h1>
                <p className=" text-gray-600">{sessionData?.country}</p>
              </div>

              <div className=" flex flex-row items-center gap-2">
                <h1 className=" text-xl bg-[#efeefa] text-[#372193] rounded-md font-semibold p-1">
                  Gender:{" "}
                </h1>
                <p className=" text-gray-600">{sessionData?.gender}</p>
              </div>
            </div>

            <p className=" mt-5">
              Save your changes after updating your details !
            </p>
            {onEdit === true && (
              <>
                <UserProfileDialog
                  setOnEdit={setOnEdit}
                  sessionData={sessionData}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserAccount;
