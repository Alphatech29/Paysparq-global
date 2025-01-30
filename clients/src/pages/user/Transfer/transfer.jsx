import React, { useState, useEffect } from "react";
import { Button, Select, Label, TextInput, Textarea } from "flowbite-react";


function Withdrawal() {

  return (
    <div className="flex flex-col justify-center items-center w-full bg-pay p-5 h-full shadow-md shadow-primary-600/50 rounded-lg">
      <form className="flex max-w-md flex-col gap-4 w-[50%] border border-primary-600 rounded-lg p-4">
        {/* Account Number Input */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="AccountNumber" value="Account Number" />
          </div>
          <TextInput id="AccountNumber" type="text" placeholder="9129079450" required />
        </div>

        {/* Bank Selection */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="banks" value="Choose Bank" />
          </div>
          <Select id="banks" required>
            <option value="" disabled defaultValue>
              Choose Bank
            </option>
            <option value="Uba">
              Uba
            </option>
            <option value="gtbank">
              Gtbank
            </option>
          </Select>
        </div>

        {/* Amount Input */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Amount" value="Amount" />
          </div>
          <TextInput id="Amount" type="text" placeholder="$10,000" className="focus:ring-2 focus:ring-primary-600" required />
        </div>

        {/* Narration */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="narration" value="Narration" />
          </div>
          <Textarea id="narration" placeholder="Narration" rows={3} className="focus:ring-2 focus:ring-primary-600" required />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="bg-primary-600">
          Withdraw
        </Button>
      </form>
    </div>
  );
}

export default Withdrawal;