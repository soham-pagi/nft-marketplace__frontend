import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../../img";

function DropZone({
  name,
  website,
  description,
  royalties,
  fileSize,
  setFileSize,
  category,
  setImage,
}) {
  const [fileUrl, setFileUrl] = useState(images.upload);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      console.log("Invalid file type.");
      return;
    }

    const imageFile = acceptedFiles[0];
    setImage(imageFile);
    setFileSize((imageFile.size / (1024 * 1024)).toFixed(2));
    setFileUrl(URL.createObjectURL(imageFile));
    console.log(imageFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5000000,
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <div className={Style.DropZone_box_input_img}>
            <img
              src={fileUrl}
              alt="upload"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>Drag & drop file</p>
          <p>or Browse media on your device</p>
        </div>
      </div>
    </div>
  );
}

export default DropZone;
