import React, { useEffect, useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../../../constants";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";
import { useAppSelector } from "../../../../ReduxSetup/hooks";

interface DocumentUploadProps {
  label: string;
  docType: "passport" | "licence";
  side: "front" | "back";
  setBase64: (base64: string | null) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  docType,
  side,
  setBase64,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const userId = useAppSelector(selectUserSlice).clientId;

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const fetchDocs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/docs/${userId}`);

      let base64 = "";

      if (docType === "passport") {
        base64 =
          side === "front"
            ? data.passportDetails.frontSide
            : data.passportDetails.backSide;
      } else {
        base64 =
          side === "front"
            ? data.drivingLicence.frontSide
            : data.drivingLicence.backSide;
      }

      if (base64) {
        setBase64File(base64);
        setBase64(base64);
        setFile(null); // No new file selected
      }
    } catch (err) {
      console.log("No existing document found.");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [docType, side, userId]);

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.size > 1048576) {
      alert("File size should be ≤ 1MB.");
      return;
    }

    const base64 = await fileToBase64(selectedFile);
    setFile(selectedFile);
    setBase64File(null); // override existing
    setBase64(base64);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleClear = () => {
    setFile(null);
    setBase64File(null);
    setBase64(null);
    if (inputRef.current) inputRef.current.value = "";
    setShowConfirm(false);
  };

  const uploadedFileName = file?.name || `${docType}_${side}.file`;

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-[#666666] mb-1">
        {label}
      </label>

      {!file && !base64File ? (
        <div
          className="w-full md:w-1/2 p-6 border border-gray-300 rounded-md text-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-5 w-5 text-gray-600" />
            <p className="text-sm">Click to upload or drag and drop</p>
          </div>
          <input
            type="file"
            accept="image/*,.pdf"
            ref={inputRef}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="w-full p-4 flex items-center justify-between border border-gray-200 rounded-md">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5" />
            <div className="flex flex-col justify-center">
              <p className="text-sm">{uploadedFileName}</p>
              {file && (
                <p className="text-xs text-[#666666]">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="self-start mt-1"
          >
            <X className="w-4 h-4 hover:cursor-pointer" strokeWidth={3} />
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-[#0000006d] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FFFBF3] rounded-lg p-4 w-80 shadow-lg">
            <h2 className="text-2xl font-medium mb-2">Delete Document?</h2>
            <p className="text-sm text-[#666666] mb-4">
              You are about to delete the document.
              <br />
              Are you sure you want to proceed?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="hover:cursor-pointer px-12 py-2 border border-black rounded-3xl"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-[#CC1D1D] hover:cursor-pointer text-white px-12 py-2 rounded-3xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
