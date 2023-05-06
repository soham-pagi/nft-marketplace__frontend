import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

// COMPONENT IMPORT
import { Loader } from "../../componentsindex";

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
  properties,
  uploadToIPFS,
  setImage,
}) {
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      console.log("Invalid file type.");
      return;
    }

    const imageFile = acceptedFiles[0];
    setImage(imageFile);
    setFileSize((imageFile.size / (1024 * 1024)).toFixed(2));
    console.log(imageFile);

    // setIsUploading(true);
    // const url = await uploadToIPFS(imageFile);
    // const url = "test";
    // setIsUploading(false);

    // setFileUrl(url);
    // setImage(url);
    // setFileSize()
    // console.log({ url });
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
          <p>JPG, JPEG, PNG, MAX 100MB</p>
          <div className={Style.DropZone_box_input_img}>
            <img
              src={images.upload}
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

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <img src={fileUrl} alt="nft image" width={200} height={200} />

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>
                  <span>NFT Name:</span>
                  {name || ""}
                </p>
                <p>
                  <span>Website:</span>
                  {website || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span>
                  {description || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties</span>
                  {royalties || ""}
                </p>
                <p>
                  <span>FileSize</span>
                  {fileSize + "MB" || ""}
                </p>
                <p>
                  <span>Category</span>
                  {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default DropZone;
