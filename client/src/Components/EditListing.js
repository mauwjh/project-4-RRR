import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field } from "formik";
import { UserContext } from "../UserContext";
import { Multiselect } from "multiselect-react-dropdown";
import "./CreateListing.css";
import axios from "axios";

const EditListing = ({authenticated, userId}) => {
  const [listing, setListing] = useState()
  const [storedImg, setStoredImg] = useState()
  const [displayedImg, setDisplayedImg] = useState()
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [multiselectData, setMultiselectData] = useState([]);
  const {user} = UserContext()
  const navigate = useNavigate();
  const {id} = useParams()
  
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get("/api/categories");
      setMultiselectData(data.rows);
    };
    getCategories();
    const getListing = async () => {
      const {data} = await axios.get(`/api/listings/${id}`)
      if(data.rows[0].creator_id !== userId) {
        navigate('/login')
      }
      setListing(data.rows[0])
      setStoredImg(data.rows[0].img)
      setDisplayedImg(data.rows[0].img)
    }
    getListing()
  }, [navigate, user, id, userId]);

  const uploadCloudinary = async () => {
    const responses = [];
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    for (const acceptedFile of uploadedFiles) {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      responses.push(await response.json());
    }
    return [...storedImg, ...responses.map((x) => x.secure_url)];
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setUploadedFiles([...uploadedFiles, acceptedFiles[0]]);
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
    maxFiles: 3,
  });

  const postForm = async (values) => {
    const cloudinary = await uploadCloudinary();
    const res = await axios.put(`/api/listings/edit/${listing.id}`, {
      title: values.title,
      description: values.description,
      category: values.category,
      saleOption: values.saleOption,
      lookingFor: values.lookingFor ? values.lookingFor : null,
      img: cloudinary,
      price: values.price ? values.price : null,
      creatorId: user.userId,
    });
    if (res.status === 200) {
      navigate(`/listings/${listing.id}`)
    }
  };

  //* Validations
  const validateTitle = (value) => {
    let error;
    if (!value) {
      error = "Please enter a valid title";
    }
    return error;
  };

  const validateDescription = (value) => {
    let error;
    if (!value) {
      error = "Please enter a valid description";
    }
    return error;
  };

  const validateCategory = (value) => {
    let error;
    if (value === "") {
      error = "Please select a valid category";
    }
    return error;
  };
  //* Validations

  if(!authenticated) {
    navigate('/login')
  }

  return (
    <div class="container mt-4 mb-5">
      <h2>Create a New Listing</h2>
      <h5 class="mt-4">Images</h5>
      <p style={{ fontSize: "15px" }}>(max 3 files)</p>
      {storedImg?.length + uploadedFiles?.length < 3 ? (
        <div
          {...getRootProps()}
          class="text-center mb-4"
          style={{
            height: "200px",
            border: "2px dashed #b1a7a6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          <span class="align-middle">Attach your images here</span>
        </div>
      ) : null}
      <div class="col-12">
        <div class="row">
          {storedImg?.map((image, index) => (
            <div class="col-sm-4 mb-4">
              <div
                class="position-absolute"
                onClick={() => {
                  setStoredImg(storedImg.filter(a => a !== image))
                }
                }
                style={{ top: "7px", left: "40px", zIndex: 1 }}
              >
                <i
                  class="fas fa-times"
                  style={{ fontSize: "25px", color: "#495057" }}
                ></i>
              </div>
              <img
                src={image}
                alt="120x140"
                class="col-12"
              />
            </div>
          ))}
          {uploadedFiles?.map((image, index) => (
            <div class="col-sm-4 mb-4">
              <div
                class="position-absolute"
                onClick={() =>
                  setUploadedFiles(uploadedFiles.filter((a, b) => b !== index))
                }
                style={{ top: "7px", left: "40px", zIndex: 1 }}
              >
                <i
                  class="fas fa-times"
                  style={{ fontSize: "25px", color: "#495057" }}
                ></i>
              </div>
              <img
                src={URL.createObjectURL(image)}
                alt="120x140"
                class="col-12"
              />
            </div>
          ))}
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          title: listing?.title,
          description: listing?.description,
          saleOption: listing?.sale_option,
          lookingFor: listing?.looking_for,
          category: listing?.categories_id,
          price: listing?.price,
        }}
        onSubmit={(values) => {
          // same shape as initial values
          postForm(values);
        }}
      >
        {({
          errors,
          touched,
          isValidating,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <Form>
            <label htmlFor="title" class="mt-3">
              Title
            </label>
            <span class="ml-2" style={{ fontSize: "14px", color: "#495057" }}>
              {values?.title?.length} / 35
            </span>
            <Field
              id="title"
              name="title"
              class="form-control"
              onChange={handleChange}
              value={values?.title}
              validate={validateTitle}
              maxLength="35"
            />
            {errors.title && touched.title && (
              <div style={{ fontSize: "15px", color: "red" }}>
                {errors.title}
              </div>
            )}

            <label htmlFor="description" class="mt-3">
              Description
            </label>
            <span class="ml-2" style={{ fontSize: "14px", color: "#495057" }}>
              {values?.description?.length} / 200
            </span>
            <Field
              component="textarea"
              id="description"
              name="description"
              class="form-control"
              onChange={handleChange}
              value={values?.description}
              validate={validateDescription}
              maxLength="200"
            />
            {errors.description && touched.description && (
              <div style={{ fontSize: "15px", color: "red" }}>
                {errors.description}
              </div>
            )}

            <label htmlFor="saleOption" class="mt-3">
              Sale Option
            </label>
            <Multiselect
              id="saleOption"
              avoidHighlightFirstOption={true}
              onSelect={(selectedList) => {
                setFieldValue("saleOption", selectedList[0].name);
              }}
              options={[{ name: "For Trade" }, { name: "For Free" }]}
              displayValue="name"
              style={{
                options: { color: "black" },
              }}
              singleSelect
              selectedValues={[{name: listing?.sale_option}]}
            />

            <label htmlFor="category" class="mt-3">
              Category
            </label>
            <Multiselect
              validate={validateCategory}
              id="category"
              avoidHighlightFirstOption={true}
              onSelect={(selectedList) => {
                setFieldValue("category", selectedList[0].id);
              }}
              options={multiselectData}
              displayValue="name"
              style={{
                options: { color: "black" },
              }}
              singleSelect
              selectedValues={[{id: listing?.categories_id, name: listing?.categories_name}]}
            />
            {errors.category && touched.category && (
              <div>{errors.category}</div>
            )}

            <label htmlFor="lookingFor" class="mt-3">
              Looking to Exchange With
            </label>
            <Multiselect
              id="lookingFor"
              avoidHighlightFirstOption={true}
              onSelect={(selectedList) => {
                setFieldValue(
                  "lookingFor",
                  selectedList.map((x) => x.id)
                  );
              }}
              onRemove={(selectedList) => {
                setFieldValue(
                  "lookingFor",
                  selectedList.map((x) => x.id)
                );
              }}
              options={multiselectData}
              displayValue="name"
              style={{
                chips: { background: "#43aa8b" },
                options: { color: "black" },
              }}
              selectedValues={listing?.looking_for.map(x => multiselectData?.filter(y => y.id === x)[0])}
            />
            <label htmlFor="price" class="mt-3">
              Estimated Price
            </label>
            <div class="input-group">
              <span
                class="input-group-text"
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 0,
                }}
              >
                $
              </span>
              <Field
                id="price"
                name="price"
                type="number"
                class="form-control"
                onChange={handleChange}
                value={values.price}
              />
            </div>
            <button class="btn btn-primary mt-5 mb-4" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
