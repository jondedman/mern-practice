import { useEffect, useRef } from "react";

const UploadWidget = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dx9qta9a0", // your Cloudinary cloud name
        uploadPreset: "doombookuploadpreset", // your unsigned preset
        folder: "user-profiles", // optional: organize images into folders
        cropping: true, // optional: allow cropping
        multiple: false,
      },
      function (error, result) {
        if (!error && result?.event === "success") {
          console.log("Upload successful:", result.info);
          setImageUrl(result.info.secure_url); // Send URL back to parent
        }
      }
    );
  }, [setImageUrl]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <div className="mb-4">
      <button onClick={openWidget} type="button" className="btn">
        Upload Profile Image
      </button>
    </div>
  );
};

export default UploadWidget;
