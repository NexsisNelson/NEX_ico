import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";

const UploadLogo = ({
  imageURL,
  setimageURL,
  setLoader,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
}) => {
  const notifySucess = (msg) => toast.success(msg, {duration: 1000});
  const notifyError = (msg) => toast.error(msg, {duration: 1000});

  const uploadToIPFS = async(file)=> {
    console.log("File");
    if (file) {
      try{
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          header: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_key: PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },  
        }); 

        const url = `https://gateway.pinata.cloud/ipfs${response.data.IpfsHash}`;

        setimageURL(url);
        setLoader(false);
        notifySucess("Logo uploaded Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Checkyour Pinata Keys");
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile)=> {
    await uploadToIPFS(acceptedFile[0]);
  });

  const { getInputProps, getRootProps} = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });
  return (
    <>
        { imageURL ? (
              <div>
                <img 
                  src={imageURL} 
                  style={{width: "200px", height: "auto"}} 
                  alt="" 
               />
              </div>
            ) : ( 
              <div {...getRootProps()}>
                <label for="file" className="custum-file-upload">
                  <div className="icon">
                    <UploadICON/>
                  </div>
                  <div className="text">
                    <span>Click to Upload Logo</span>
                  </div>
                  <input type="file" id="file" {...getInputProps} />
                </label>
              </div>
          )}
    </>
  ); 
};

export default UploadLogo;
