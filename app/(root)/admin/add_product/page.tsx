"use client";

import * as React from 'react';
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  AddProductCategory,
  AddProductColor,
  AddProductSize,
  AddProductTags,
  AddProductSubCategory,
} from "../../../../components/Constants";
import { Detail, ImageObject, Option } from '../../../../type_interface/add_product';
import { addProduct } from "../../../api/actions/product.action";
import Select from "react-select";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";

const AdminAddProducts = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<Option | null>(null);
  const [color, setColor] = useState<Option | null>(null);
  const [details, setDetails] = useState<Detail[]>([]);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [subCategory, setSubCategory] = useState<Option | null>(null);
  const [size, setSize] = useState<Option | null>(null);
  const [selectedImages, setSelectedImages] = useState<ImageObject[]>([]);
  const [tags, setTags] = useState<Option | null>(null);

  const onCategoryChangeHandler = (value: any) => {
    setCategory(value);
  };

  const onTagsChangeHandler = (value: any) => {
    setTags(value);
  };

  const onSubCategoryChangeHandler = (value: any) => {
    setSubCategory(value);
  };

  const onSizeChangeHandler = (value: any) => {
    setSize(value);
  };

  const onColorChangeHandler = (value: any) => {
    setColor(value);
  };

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleDeleteImage = (index:any) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], text: value };
    setDetails(newDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { text: "" }]);
  };

  const handleDeleteDetail = (index:any) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !(
        name &&
        description &&
        price &&
        quantity &&
        brand &&
        category &&
        tags &&
        subCategory &&
        size &&
        color
      )
    ) {
      toast.error("All fields are necessary!");
      setIsLoading(false);
      return;
    }

    if (selectedImages.length < 1) {
      toast.error("Images are necessary!");
      setIsLoading(false);
      return;
    }

    if (details.length < 1) {
      toast.error("Details are necessary!");
      setIsLoading(false);
      return;
    }

    try {
      const formData = {
        productName: name,
        productDescription: description,
        basePrice: price,
        discountPercentage: discount,
        quantity: quantity,
        brand: brand,
        category: category?.label,
        tags: tags?.label,
        subCategory: subCategory?.label,
        size: size?.label,
        color: color?.label,
        productImages: selectedImages,
        details: details,
      };

      await addProduct(JSON.stringify(formData));
      setName("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setQuantity("");
      setBrand("");
      setCategory(null);
      setTags(null);
      setSubCategory(null);
      setColor(null);
      setSize(null);
      setSelectedImages([]);
      setDetails([]);
      toast.success("Product added successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred while adding the product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" h-screen">
      <Box component="form" noValidate onSubmit={onSubmitHandler}>
        <Grid sx={{ padding: "20px" }} spacing={5} container component="main">
          <Grid item xs={12} sm={12} md={7}>
            <Box>
              <p className=" font-semibold text-xl">General Information</p>

              <TextField
                fullWidth
                onChange={(e) => setName(e.target.value)}
                label="Product Name"
                id="outlined-size-small"
                size="small"
                name="productName"
                type="text"
                sx={{
                  my: "1rem",
                }}
              />

              <TextField
                fullWidth
                minRows={3}
                onChange={(e) => setDescription(e.target.value)}
                maxRows={Infinity}
                multiline
                type="text"
                label="Product Description"
                name="productDescription"
                id="outlined-size-small"
                sx={{
                  my: "1rem",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <TextField
                  fullWidth
                  label="Base Price"
                  onChange={(e) => setPrice(e.target.value)}
                  name="basePrice"
                  id="outlined-size-small"
                  size="small"
                  type="number"
                  sx={{
                    my: "1rem",
                  }}
                />

                <TextField
                  fullWidth
                  label="Discount Percentage (%)"
                  name="discountPercentage"
                  onChange={(e) => setDiscount(e.target.value)}
                  id="outlined-size-small"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  sx={{
                    my: "1rem",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <TextField
                  fullWidth
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  label="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  name="quantity"
                  id="outlined-size-small"
                  size="small"
                  type="number"
                  sx={{
                    my: "1rem",
                  }}
                />

                <TextField
                  fullWidth
                  label="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  name="brand"
                  id="outlined-size-small"
                  size="small"
                  type="text"
                  sx={{
                    my: "1rem",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  my: "1rem",
                }}
              >
                <Select
                  options={AddProductCategory}
                  value={category}
                  name="category"
                  placeholder="Category"
                  onChange={onCategoryChangeHandler}
                  className=" w-full"
                />
                <Select
                  options={AddProductTags}
                  value={tags}
                  name="tags"
                  placeholder="Tags"
                  onChange={onTagsChangeHandler}
                  className=" w-full"
                />
              </Box>

              <Select
                options={AddProductSubCategory}
                value={subCategory}
                name="subCategory"
                placeholder="SubCategory"
                onChange={onSubCategoryChangeHandler}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  my: "1rem",
                }}
              >
                <Select
                  options={AddProductSize}
                  value={size}
                  placeholder="Size"
                  name="size"
                  onChange={onSizeChangeHandler}
                  className=" w-full"
                />
                <Select
                  options={AddProductColor}
                  value={color}
                  placeholder="Color"
                  name="color"
                  onChange={onColorChangeHandler}
                  className=" w-full"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box>
              <p className=" font-semibold text-xl">Product Media</p>

              <div className="flex flex-col justify-between space-y-3 items-center p-2 w-full min-h-[10rem] h-auto border border-dashed border-gray-300">
                <div className="flex flex-wrap gap-2">
                  {selectedImages.map((image, index) => (
                    <>
                      <div key={index} className=" relative h-fit">
                        <Image
                          src={image?.url}
                          alt={`Product Image ${index + 1}`}
                          width={70}
                          height={70}
                          className="rounded-md h-28 w-28"
                        />
                        <div className=" absolute top-0 right-0">
                          <IconButton
                            aria-label="delete image"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <Close sx={{ color: "gray" }} />
                          </IconButton>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    Add Image
                  </Button>
                </label>
              </div>

              <div className=" my-5">
                <p className=" font-semibold text-xl mt-5">Product Details</p>

                {details.map((detail, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={`Product Detail ${index + 1}`}
                    id={`product-detail-${index}`}
                    size="small"
                    name="productDetail"
                    type="text"
                    value={detail?.text}
                    onChange={(e) => handleDetailChange(index, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleDeleteDetail(index)}
                          >
                            <Delete sx={{ color: "red" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      my: "1rem",
                    }}
                  />
                ))}
                <Button
                  variant="contained"
                  component="span"
                  onClick={handleAddDetail}
                >
                  Add Product Detail
                </Button>
              </div>

              {isLoading === false ? (
                <Button
                  type="submit"
                  sx={{ backgroundColor: "green" }}
                  fullWidth
                  variant="contained"
                >
                  Add Product
                </Button>
              ) : (
                <Button
                  sx={{ backgroundColor: "gray" }}
                  fullWidth
                  disabled
                  variant="contained"
                >
                  Loading...
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminAddProducts;
