import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import LoadingSpinner from "../preload/ApiLoading";

const Exchange = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/exchange-rates");
        const data = await response.json();

        if (data && Array.isArray(data.rates)) {
          const expectedCurrencies = ["USD", "EUR", "GBP"];
          const rates = expectedCurrencies.map((currency) => {
            const rate = data.rates.find((r) => r.currency_name === currency);
            return rate
              ? {
                  currency: rate.currency_name,
                  buying: rate.buying_rate,
                  selling: rate.selling_rate,
                  lastUpdated: rate.updated_at,
                }
              : {
                  currency,
                  buying: null,
                  selling: null,
                  lastUpdated: data.date || "",
                };
          });

          setExchangeRates(rates);

          // Format last_updated date to Nigeria Time (WAT)
          const formattedDate =
            rates.length > 0 && rates[0].lastUpdated
              ? new Date(
                  new Date(rates[0].lastUpdated).getTime() + 60 * 60 * 1000
                ).toLocaleString("en-US", {
                  timeZone: "Africa/Lagos",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Invalid date";

          setDate(formattedDate);
        } else {
          setErrorMessage("Failed to fetch exchange rates.");
        }
      } catch (error) {
        setErrorMessage("Error fetching exchange rates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const formatCurrency = (currencyName, amount) => {
    if (typeof amount !== "number") return amount;
    return `₦${amount.toLocaleString("en-US")}`;
  };

  return (
    <div className="overflow-x-auto mt-6 shadow-md shadow-primary-600/50 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">Exchange Rate</h1>

      {/* Show loading state inside the table */}
      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell className="text-secondary bg-pay">
            Currency
          </Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">
            Buying
          </Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">
            Selling
          </Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">
            Last Update
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loading ? (
            <Table.Row className="h-[200px]">
              <Table.Cell colSpan="4" className="text-center text-secondary ">
                <LoadingSpinner />
              </Table.Cell>
            </Table.Row>
          ) : errorMessage ? (
            <Table.Row>
              <Table.Cell colSpan="4" className="text-center text-secondary">
                {errorMessage}
              </Table.Cell>
            </Table.Row>
          ) : exchangeRates.length > 0 ? ( // Use exchangeRates instead of rates
            exchangeRates.map((rate, index) => (
              <Table.Row key={index} className="text-secondary">
                <Table.Cell className="flex items-center">
                  <img
                    src={`/image/${rate.currency.toLowerCase()}.svg`}
                    alt={rate.currency}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  {rate.currency}
                </Table.Cell>
                <Table.Cell>
                ₦{formatCurrency(rate.currency, rate.buying)}
                </Table.Cell>
                <Table.Cell>
                ₦{formatCurrency(rate.currency, rate.selling)}
                </Table.Cell>
                <Table.Cell>
                  {rate.lastUpdated
                    ? new Intl.DateTimeFormat("en-US", {
                        timeZone: "Africa/Lagos",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(rate.lastUpdated))
                    : "N/A"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="4" className="text-center text-secondary">
                No exchange rates available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Exchange;
