import React, { useState, useRef, useEffect } from "react";
import mergeImages from "merge-images";
import Style from "../styles/generator.module.css";

const useDynamicUrlState = () => {
  window.scrollTo(0, 0);
  const [urlStates, setUrlStates] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event, index) => {
    const imageFiles = event.target.files;
    const newUrls = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const imageUrl = e.target.result;

        setUrlStates((prevUrlStates) => {
          const updatedStates = [...prevUrlStates];
          updatedStates[index] = [...updatedStates[index], imageUrl];
          return updatedStates;
        });

        newUrls.push(imageUrl);

        if (newUrls.length === imageFiles.length) {
          setUrlStates((prevUrlStates) => {
            const updatedStates = [...prevUrlStates];
            updatedStates[index] = newUrls;
            return updatedStates;
          });
        }
      };

      fileReader.readAsDataURL(imageFiles[i]);
    }
  };

  return [urlStates, setUrlStates, fileInputRef, handleImageUpload];
};

const Generator = () => {
  const [mergedImageURL, setMergedImageURL] = useState([]);
  const [urlStates, setUrlStates, fileInputRef, handleImageUpload] =
    useDynamicUrlState();
  const [stateNames, setStateNames] = useState([""]);
  const [imagesMerged, setImagesMerged] = useState(false);

  useEffect(() => {
    if (mergedImageURL.length > 0) {
      setImagesMerged(true);
    } else {
      setImagesMerged(false);
    }
  }, [mergedImageURL]);

  const handleImageMerge = async () => {
    handleClearState();

    const mergeCombinations = cartesianProduct(urlStates);

    for (const combination of mergeCombinations) {
      const mergedImage = await mergeImages(combination);
      setMergedImageURL((current) => [...current, mergedImage]);
    }
  };

  const handleClearState = () => {
    setMergedImageURL([]);
    // setUrlStates([]);
  };

  const handleRemoveStates = (index) => {
    setUrlStates((prevUrlStates) => {
      const updatedStates = [...prevUrlStates];
      updatedStates.splice(index, 1);
      return updatedStates;
    });
    setStateNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  const handleAddStates = (event) => {
    event.preventDefault();
    setUrlStates((prevUrlStates) => [...prevUrlStates, []]);
    setStateNames((prevNames) => [...prevNames, ""]);
  };

  const handleDelete = (index, imageIndex) => {
    setUrlStates((prevUrlStates) => {
      const updatedStates = [...prevUrlStates];
      const images = [...updatedStates[index]];
      images.splice(imageIndex, 1);
      updatedStates[index] = images;
      return updatedStates;
    });
  };

  const handleInputChange = (index, value) => {
    console.log("in setname function");
    setStateNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const cartesianProduct = (arrays) => {
    return arrays.reduce(
      (acc, array) => acc.flatMap((x) => array.map((y) => [...x, y])),
      [[]]
    );
  };

  function handleDownloadImages() {
    mergedImageURL.forEach((imgUrl, index) => {
      const fileName = `merged images ${index}.jpg`; // Change the filename as needed

      const downloadLink = document.createElement('a');
      downloadLink.href = imgUrl;
      downloadLink.download = fileName;

      // Append the link to the DOM and trigger the click event to start download
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  return (
    <div>
        <h1 className={Style.title}>NFT Generator</h1>
        <div className={Style.container}>
            <div>
                <div className={Style.layer_input}>
                <form className="form" onSubmit={handleAddStates}>
                    <input
                        className={Style.layer_name_input}
                        type="text"
                        placeholder="Layer Name"
                        required
                        value={stateNames[stateNames.length - 1]}
                        onChange={(e) =>
                            handleInputChange(stateNames.length - 1, e.target.value)
                        }
                    />
                    <input className={Style.submitbtn} type="submit" value="Add" />
                </form>
                </div>
                <br />
                <br />

                {urlStates.map((urlState, index) => (
                    <div key={index}>
                        <div className={Style.layer}>
                            <p style={{ color: "#FFDF2B" }}>{stateNames[index]}</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(event) => handleImageUpload(event, index)}
                                multiple
                            />
                            <button onClick={() => handleRemoveStates(index)}>Remove</button>
                            <div className={Style.upload_image_container}>
                                {urlState.map((imgSrc, key) => (
                                <img
                                    className={Style.upload_image}
                                    onClick={() => handleDelete(index, key)}
                                    key={key}
                                    src={imgSrc}
                                    alt={`Image ${key}`}
                                />
                                ))}
                            </div>
                        </div>
                        <br />
                    </div>
                ))}

                <div className={Style.mergebtn}>
                    <button onClick={handleImageMerge}>Merge Images</button>
                    <button onClick={handleClearState}>Clear</button>
                    <button onClick={handleDownloadImages}>Download</button>
                </div>
            </div>

            <div className={Style.displayMergedImg}>
                {imagesMerged && <h1>Merged Images</h1>}
                {mergedImageURL.map((imgSrc, key) => (
                <img
                    className={Style.merged_images}
                    key={key}
                    src={imgSrc}
                    alt={`Merged Image ${key}`}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

export default Generator;
