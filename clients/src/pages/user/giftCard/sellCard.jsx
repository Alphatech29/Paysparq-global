import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";
import { FileInput, Label, Select, TextInput, Button } from "flowbite-react";
import { IoCloudUploadOutline } from "react-icons/io5";

const SellCard = () => {
  const [selectedCard, setSelectedCard] = useState("Physical Card"); 
  const [selectedImages, setSelectedImages] = useState([]); 

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file: file,
    }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setSelectedImages(selectedImages.filter((image) => image.id !== id));
  };

  return (
    <div>
      <div>
        <span>
          <NavLink to="/user/giftcard/" className="flex items-center text-base">
            <MdArrowBackIos /> Back
          </NavLink>
        </span>
      </div>

      <form className="flex w-[70%] flex-col">
        {/* Select Card */}
        <div>
          <div className="block">
            <Label htmlFor="selectcard" value="Select Card" />
          </div>
          <Select id="selectcard" sizing="sm">
            <option value="" disabled>Select a card</option>
            <option value="amazon">Amazon</option>
            <option value="itunes">iTunes</option>
            <option value="google_play">Google Play</option>
            <option value="steam">Steam</option>
            <option value="ebay">eBay</option>
          </Select>
        </div>

        {/* Card Category */}
        <div>
          <div className="block">
            <Label htmlFor="cardCategory" value="Card Category" />
          </div>
          <Select id="cardCategory" sizing="md">
            <option value="" disabled>Select a category</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="europe">Europe</option>
          </Select>
        </div>

        {/* Card Type Selection */}
        <div className="flex gap-5 mt-3">
          {["Physical Card", "E-Code Card"].map((card, index) => (
            <div
              key={index}
              className={`w-[70%] border rounded-md px-3 py-2 cursor-pointer transition-all ${
                selectedCard === card ? "border-emerald-600 border-2" : "border-primary-600/50"
              }`}
              onClick={() => setSelectedCard(card)}
            >
              <h2 className="text-base font-semibold">{card}</h2>
              <p className="text-sm">
                {card === "Physical Card"
                  ? "A store-bought card requiring clear photos for exchange."
                  : "A digital code for quick cash exchange."}
              </p>
            </div>
          ))}
        </div>

        {/* E-Code Input (Conditionally Rendered) */}
        {selectedCard === "E-Code Card" && (
          <div className="mt-3">
            <div className="block">
              <Label htmlFor="ecodeInput" value="E-code" />
            </div>
            <TextInput id="ecodeInput" sizing="md" placeholder="Enter E-Code" />
          </div>
        )}

        {/* Gift Card Amount */}
        <div>
          <div className="block">
            <Label htmlFor="cardAmount" value="Gift Card Amount" />
          </div>
          <TextInput id="cardAmount" placeholder="Enter the card amount" sizing="md" />
        </div>

        {/* Amount to Receive */}
        <div>
          <span className="text-sm"><strong>Amount you get in Naira</strong></span>
          <div className="flex justify-center items-center border border-primary-600/50 py-10 px-10 mt-2 rounded-lg">
            <span className="text-xl">₦ 0.00</span>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="flex w-full items-center justify-center mt-4">
          <Label
            htmlFor="dropzone-file"
            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-600/50 bg-paysparq"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <IoCloudUploadOutline className="text-4xl text-secondary" />
              <p className="mb-2 text-sm text-secondary">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-secondary">You can upload multiple images</p>
            </div>
            <FileInput 
              id="dropzone-file" 
              className="hidden" 
              multiple 
              onChange={handleImageChange} 
              accept="image/*"
            />
          </Label>
        </div>

        {/* Image Preview Section */}
        {selectedImages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {selectedImages.map((image) => (
              <div key={image.id} className="relative">
                <img 
                  src={image.id} 
                  alt="Selected" 
                  className="w-14 h-14 rounded-md object-cover cursor-pointer" 
                  onClick={() => removeImage(image.id)}
                />
                <span 
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer"
                  onClick={() => removeImage(image.id)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        )}

           <div className='mt-4'>
            <p className='text-sm flex flex-col'>
           <h1><strong>Notice:</strong></h1>
            <span>1. Order processing takes approximately 30–60 minutes.</span>
           <span> 2. Ensure the card value matches the amount you entered.</span>
            <span>3. Ensure the card matches the selected brand and type.</span>
            <span>4. If you encounter any issues with your transaction, please contact us.</span>
            </p>
          </div>
        {/* Submit Button */}
        <Button type="submit" className="bg-secondary mt-5">Continue</Button>
      </form>
    </div>
  );
};

export default SellCard;
