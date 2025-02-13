import React from 'react';
import { Select, FileInput, Label, TextInput, Button } from "flowbite-react";
import { NavLink } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import useSellLogic from "../../../../components/dashboard/giftcards/sellLogic";
import { ToastContainer } from 'react-toastify';

const SellCard = () => {
  const {
    cardType, setCardType, selectedImages, handleImageChange, removeImage, cards, loading,
    dropdownOpen, toggleDropdown, selectedCardDetails, handleCardSelect, availableCountries,
    selectedCountry, handleCountryChange, cardAmount, setCardAmount, nairaAmount, eCode, setECode, handleSubmit
  } = useSellLogic();
  

  return (
    <div>
      <ToastContainer className="text-sm" />
      <div>
        <span>
          <NavLink to="/user/giftcard/" className="flex items-center text-base">
            <MdArrowBackIos /> Back
          </NavLink>
        </span>
      </div>

      <form className="flex w-[70%] flex-col mt-5" onSubmit={handleSubmit}>
        <div className="relative">
          <div
            className="border border-primary-600/50 bg-slate-50 rounded-md items-center justify-start flex py-2 px-4 cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="text-sm flex">
              {selectedCardDetails ? (
                <>
                  <img
                    src={selectedCardDetails.avatar_url}
                    alt={selectedCardDetails.card_name}
                    className="w-5 h-5 rounded-full mr-3"
                  />
                  {selectedCardDetails.card_name}
                </>
              ) : (
                "Select a card"
              )}
            </span>
          </div>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 bg-white border rounded-md z-10 shadow-lg">
              {!loading ? (
                cards.length > 0 ? (
                  cards.map((card) => (
                    <div
                      key={card.card_id}
                      className="flex text-sm items-center py-2 px-4 cursor-pointer hover:bg-primary-600/20"
                      onClick={() => handleCardSelect(card)}
                    >
                      <img
                        src={card.avatar_url}
                        className="w-5 h-5 rounded-full mr-3"
                      />
                      <span className='text-sm'>{card.card_name}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-2 px-4">No cards available</div>
                )
              ) : (
                <div className="py-2 px-4">Loading...</div>
              )}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="cardCountry" value="Card Country" />
          <Select id="cardcountry" sizing="md" value={selectedCountry} onChange={handleCountryChange}>
            <option value="" disabled>Select a country</option>
            {availableCountries.map((country, index) => (
              <option key={index} value={country.country}>{country.country}</option>
            ))}
          </Select>
        </div>

        <div className="flex gap-5 mt-3">
          {["Physical Card", "E-Code Card"].map((type, index) => (
            <div
              key={index}
              className={`w-[70%] border rounded-md px-3 py-2 cursor-pointer transition-all ${cardType === type ? "border-emerald-600/50 border-2" : "border-primary-600/50"}`}
              onClick={() => setCardType(type)}
            >
              <h2 className="text-base font-semibold">{type}</h2>
              <p className="text-sm">{type === "Physical Card" ? "A store-bought card requiring clear photos for exchange." : "A digital code for quick cash exchange."}</p>
            </div>
          ))}
        </div>

        {cardType === "E-Code Card" && (
          <div className="mt-3">
            <Label htmlFor="ecodeInput" value="E-code" />
            <TextInput
              id="ecodeInput"
              sizing="md"
              placeholder="Enter E-Code"
              value={eCode}
              onChange={(e) => setECode(e.target.value)}
            />
          </div>
        )}

        <div>
          <Label htmlFor="cardAmount" value="Gift Card Amount" />
          <TextInput id="cardAmount" placeholder="Enter the card amount" sizing="md" value={cardAmount} onChange={(e) => setCardAmount(e.target.value)} />
        </div>

        <div>
          <span className="text-sm"><strong>Amount you get in Naira</strong></span>
          <div className="flex justify-center items-center border border-primary-600/50 py-10 px-10 mt-2 rounded-lg">
            <span className="text-xl">
              <strong>₦ {nairaAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-center mt-4">
          <Label htmlFor="dropzone-file" className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary-600/50 bg-paysparq">
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <IoCloudUploadOutline className="text-4xl text-secondary" />
              <p className="mb-2 text-sm text-secondary"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-secondary">You can upload multiple images</p>
            </div>
            <FileInput id="dropzone-file" className="hidden" multiple onChange={handleImageChange} accept="image/*" />
          </Label>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {selectedImages.map((image) => (
            <div key={image.id} className="relative">
              <img src={image.id} alt="Uploaded preview" className="w-10 h-10 object-cover rounded-md" />
              <button onClick={() => removeImage(image.id)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 text-xs">X</button>
            </div>
          ))}
        </div>

        <div className='mt-4 text-sm flex flex-col'>
          <h1><strong>Notice:</strong></h1>
          <span>1. Order processing takes approximately 30–60 minutes.</span>
          <span>2. Ensure the card value matches the amount you entered.</span>
          <span>3. Ensure the card matches the selected brand and type.</span>
          <span>4. If you encounter any issues with your transaction, please contact us.</span>
        </div>

        <Button type="submit" className="bg-secondary mt-5">Procced</Button>
      </form>
    </div>
  );
};

export default SellCard;