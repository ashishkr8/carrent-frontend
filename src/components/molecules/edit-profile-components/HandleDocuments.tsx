import React, { useState} from "react";
import DocumentUpload from "./DocumentUpload";
import SaveProfileInfoBtn from "./SaveProfileInfoBtn";
import axios from "axios";
import { BASE_URL } from "../../../../constants";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";
import { useAppSelector } from "../../../../ReduxSetup/hooks";

const HandleDocuments: React.FC = () => {
  const userId = useAppSelector(selectUserSlice).clientId;

  const [documents, setDocuments] = useState<{
    passportFront: string | null;
    passportBack: string | null;
    licenseFront: string | null;
    licenseBack: string | null;
  }>({
    passportFront: null,
    passportBack: null,
    licenseFront: null,
    licenseBack: null,
  });

  const handleSetBase64 = (key: string, base64: string | null) => {
    setDocuments((prev) => ({ ...prev, [key]: base64 }));
  };

  const handleSave = async () => {
    const payload = {
      userId,
      passportDetails: {
        frontSide: documents.passportFront,
        backSide: documents.passportBack,
      },
      drivingLicence: {
        frontSide: documents.licenseFront,
        backSide: documents.licenseBack,
      },
    };

    try {
      await axios.post(`${BASE_URL}/users/docs/${userId}/upload-docs`, payload);
      alert("Documents saved successfully.");
    } catch (err) {
      console.error("Failed to save documents", err);
      alert("Failed to save documents.");
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl font-semibold mb-6">Documents</h1>
      </div>

      <h2 className="text-xl font-medium mb-4">Passport Details</h2>
      <div className="border rounded-lg p-4 border-black mb-4">
        <DocumentUpload
          label="Front side"
          docType="passport"
          side="front"
          setBase64={(b64) => handleSetBase64("passportFront", b64)}
        />
        <DocumentUpload
          label="Back side"
          docType="passport"
          side="back"
          setBase64={(b64) => handleSetBase64("passportBack", b64)}
        />
      </div>

      <h2 className="text-xl font-medium mb-4">Driving License</h2>
      <div className="border rounded-lg p-4 border-black mb-4">
        <DocumentUpload
          label="Front side"
          docType="licence"
          side="front"
          setBase64={(b64) => handleSetBase64("licenseFront", b64)}
        />
        <DocumentUpload
          label="Back side"
          docType="licence"
          side="back"
          setBase64={(b64) => handleSetBase64("licenseBack", b64)}
        />
      </div>

      <div className="flex justify-center md:justify-end pt-4">
        <SaveProfileInfoBtn label="Save Changes" onClick={handleSave} />
      </div>
    </>
  );
};

export default HandleDocuments;
