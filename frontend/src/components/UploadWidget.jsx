import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dx9qta9a0",
        uploadPreset: "doombookuploadpreset",
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return <button onClick={openWidget}>Upload</button>;
};

export default UploadWidget;
