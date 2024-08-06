"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AdminNavLinks } from "../Constants";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = () => {
    setShowPopup((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, zIndex: 50 }}>
        <AppBar sx={{ bgcolor: "#1e1e2b" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <Image
                src={"/icons/logo.png"}
                alt="logo"
                width={30}
                height={30}
              />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: "bold" }}
            >
              Shopy
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={() => handleChange()}
              >
                <Avatar sx={{ bgcolor: "purple" }} alt="Profile Image">
                  {session?.user?.name?.charAt(0)}
                </Avatar>
                <MenuItem onClick={() => signOut()}>
                  <Link className=" text-red-400" href={"/sign-up"}>
                    Logout
                  </Link>
                </MenuItem>
                {showPopup ? (
                  <div
                    style={{
                      position: "absolute", 
                      top: "70px",
                      right: "10px",
                      border: "1px solid #1e1e2a",
                    }}
                  >
                    <Box bgcolor="#4a88dd" padding="10px">
                      <p style={{ fontSize: "15px", color: "white" }}>
                        {session?.user?.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "white" }}>
                        {session?.user?.email}
                      </p>
                    </Box>
                    <Box>
                      <Link
                        href="/admin/admin_profile"
                        style={{ textDecoration: "none" }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            color: "white",
                            background: "#1e1e2a",
                            borderTop: "0.1px solid #292937",
                            padding: "20px",
                          }}
                        >
                          My Profile
                        </p>
                      </Link>
                    </Box>
                  </div>
                ) : null}
              </IconButton>

              <div onClick={toggleMobileMenu} className=" sm:hidden">
                <FilterListIcon sx={{ width: "2rem", height: "2rem" }} />
              </div>

              {isMobileMenuOpen && (
                <div>
                  <Drawer
                    anchor="right"
                    open={isMobileMenuOpen}
                    onClose={() => toggleMobileMenu()}
                  >
                    <div className=" bg-[#0074cd] h-screen">
                      <Box sx={{ width: 250 }} role="presentation">
                        <h1 className=" text-3xl font-bold mx-3 my-3 text-white">
                          Shopy
                        </h1>

                        <div className=" flex w-full flex-1 gap-6 px-3 flex-col mt-8">
                          <List>
                            {AdminNavLinks.map((links) => {
                              const isActive = pathname === links.route;

                              return (
                                <Link
                                  onClick={() => toggleMobileMenu()}
                                  href={links.route}
                                  key={links.label}
                                  className={`leftsidebar_link text-white ${
                                    isActive && "bg-[#528ae2]"
                                  }`}
                                >
                                  <Image
                                    src={links.icon}
                                    alt="nav icons"
                                    width={30}
                                    height={30}
                                  />
                                  <ListItemText primary={links.label} />
                                </Link>
                              );
                            })}
                          </List>
                        </div>
                      </Box>
                    </div>
                  </Drawer>
                </div>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
