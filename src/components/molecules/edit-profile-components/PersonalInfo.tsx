import React, { useEffect, useState } from "react";
import InputField from "./basicComponent";
import ProfilePic from "../CarSelection/store/Rectangle2.jpg";
import SaveProfileInfoBtn from "./SaveProfileInfoBtn";
import axios from "axios";
import { useAppSelector } from "../../../../ReduxSetup/hooks";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";
import { BASE_URL } from "../../../../constants";

type FormDataState = {
  firstName: string;
  lastName: string;
  phone: string;
  imageFile: string | null;
  country: string;
  city: string;
  postalCode: string;
  street: string;
};

const PersonalInfo = () => {
  const userInfo = useAppSelector(selectUserSlice);
  const id = userInfo?.clientId;

  const [imageChange, setImageChange] = useState(false);
  const [formDataState, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    phone: "",
    imageFile: "",
    country: "Ukraine",
    city: "",
    postalCode: "",
    street: "",
  });
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormDataState> & { server?: string }>({});

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${id}/personal-info`);
        const data = response.data;
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phoneNumber || "",
          imageFile: data.imageUrl || "",
          country: data.country || "Ukraine",
          city: data.city || "",
          postalCode: data.postalCode || "",
          street: data.street || "",
        });
        setImageFile(data.imageUrl || null);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    if (id) {
      fetchPersonalInfo();
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageFile(base64String);
        setFormData((prev) => ({ ...prev, imageFile: base64String }));
        setImageChange(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const url = `${BASE_URL}/users/${id}/update/personal-info`;

      const payload = {
        firstName: formDataState.firstName,
        lastName: formDataState.lastName,
        phoneNumber: formDataState.phone,
        imageUrl: imageFile,
        country: formDataState.country,
        city: formDataState.city,
        postalCode: formDataState.postalCode,
        street: formDataState.street,
      };

      await axios.put(url, payload);
      alert(`Profile updated successfully`);
      setErrors({});
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setErrors((prev) => ({
        ...prev,
        server: "Failed to update profile.",
      }));
    }
  };

  return (
    <div className="w-full overflow-visible">
      <h1 className="text-3xl font-semibold mb-6">Personal Info</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 border-black mb-6">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
            {imageChange ? (
              <input type="file" accept="image/*" onChange={handleImageChange} />
            ) : (
              <img
                src={imageFile || ProfilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="px-3">
            <p className="text-lg">
              {formDataState.firstName} {formDataState.lastName}
            </p>
            <p className="text-xs text-[#666666]">{userInfo.email}</p>
            <div className="block md:hidden mt-1">
              <a className="hover:underline text-sm" href="#" onClick={() => setImageChange(true)}>
                Change
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:block self-start">
          <a className="hover:underline text-sm" href="#" onClick={() => setImageChange(true)}>
            Change
          </a>
        </div>
      </div>

      <h2 className="text-xl font-medium my-2">Personal Info</h2>
      <div className="border rounded-lg p-4 border-black mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <InputField
              label="Name"
              name="firstName"
              type="text"
              value={formDataState.firstName}
              onChange={handleChange}
              placeholder="Enter your name"
              error={errors.firstName}
              labelClassName="text-xs"
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputField
              label="Surname"
              name="lastName"
              type="text"
              value={formDataState.lastName}
              onChange={handleChange}
              placeholder="Enter your surname"
              error={errors.lastName}
              labelClassName="text-xs"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formDataState.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            error={errors.phone}
            labelClassName="text-xs"
          />
        </div>
      </div>

      <h2 className="text-xl font-medium my-2">Address</h2>
      <div className="border rounded-lg p-4 border-black mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <InputField
              label="Country"
              name="country"
              type="text"
              value={formDataState.country}
              onChange={handleChange}
              placeholder="Enter your country"
              error={errors.country}
              labelClassName="text-xs"
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputField
              label="City"
              name="city"
              type="text"
              value={formDataState.city}
              onChange={handleChange}
              placeholder="Enter your city"
              error={errors.city}
              labelClassName="text-xs"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <InputField
              label="Postal Code"
              name="postalCode"
              type="text"
              value={formDataState.postalCode}
              onChange={handleChange}
              placeholder="Enter your postal code"
              error={errors.postalCode}
              labelClassName="text-xs"
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputField
              label="Street"
              name="street"
              type="text"
              value={formDataState.street}
              onChange={handleChange}
              placeholder="Enter your street"
              error={errors.street}
              labelClassName="text-xs"
            />
          </div>
        </div>
      </div>

      {errors.server && <p className="text-red-600 text-sm mb-4">{errors.server}</p>}

      <div className="flex justify-center md:justify-end pt-4">
        <SaveProfileInfoBtn label="Save Changes" onClick={handleSaveChanges} />
      </div>
    </div>
  );
};

export default PersonalInfo;
