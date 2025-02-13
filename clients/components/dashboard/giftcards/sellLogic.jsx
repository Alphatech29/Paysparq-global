import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../control/AuthContext';
import Swal from 'sweetalert2'; 

const useSellLogic = () => {
  const { userUid } = useContext(AuthContext);
  const [cardType, setCardType] = useState("Physical Card");
  const [selectedImages, setSelectedImages] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [cardAmount, setCardAmount] = useState('');
  const [nairaAmount, setNairaAmount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedExchangeRate, setSelectedExchangeRate] = useState(0);
  const [eCode, setECode] = useState('');

  useEffect(() => {
    fetch('/api/card-details')
      .then((response) => response.json())
      .then((data) => {
        const cardMap = new Map();

        data.allData.forEach(item => {
          const countryInfo = {
            country: item.country,
            exchangeRate: item.exchange_rate
          };

          if (!cardMap.has(item.card_id)) {
            cardMap.set(item.card_id, {
              ...item,
              countries: [countryInfo]
            });
          } else {
            const existingCard = cardMap.get(item.card_id);
            if (!existingCard.countries.some(c => c.country === item.country)) {
              existingCard.countries.push(countryInfo);
            }
          }
        });

        const uniqueCards = Array.from(cardMap.values());
        setCards(uniqueCards);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching card details:', error);
        setLoading(false);
      });
  }, []);

  // Calculate nairaAmount whenever cardAmount or selectedExchangeRate changes
  useEffect(() => {
    const amount = parseFloat(cardAmount.trim()) || 0;
    const rate = parseFloat(selectedExchangeRate) || 0;
    setNairaAmount(amount * rate);
  }, [cardAmount, selectedExchangeRate]);

  // Handle image selection and convert to base64 buffer
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file) => {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve({
            id: URL.createObjectURL(file),
            file: file,
            buffer: reader.result, // This is the base64 encoded image
          });
        };

        reader.onerror = reject;

        reader.readAsDataURL(file); // Convert the file to base64 string
      });
    });

    // Use Promise.all to wait for all images to be converted
    Promise.all(newImages)
      .then((convertedImages) => {
        setSelectedImages(prev => [...prev, ...convertedImages]);
      })
      .catch((error) => {
        console.error("Error reading image file:", error);
        toast.error("Error reading image file.");
      });
  };

  const removeImage = (id) => {
    URL.revokeObjectURL(id);
    setSelectedImages(prev => prev.filter((image) => image.id !== id));
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleCardSelect = (card) => {
    setSelectedCardDetails(card);
    setAvailableCountries(card.countries);

    if (card.countries.length > 0) {
      setSelectedCountry(card.countries[0].country);
      setSelectedExchangeRate(card.countries[0].exchangeRate);
    }

    setDropdownOpen(false);
  };

  // Handle country selection
  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    const country = availableCountries.find(c => c.country === countryName);

    if (country) {
      setSelectedCountry(countryName);
      setSelectedExchangeRate(country.exchangeRate);
    }
  };

  // Handle E-Code input
  const handleECodeChange = (e) => {
    setECode(e.target.value);
  };

  const navigate = useNavigate(); // Initialize navigate for routing

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If cardType is "Physical Card", ignore E-Code input
    if (cardType === "E-Code Card" && !eCode.trim()) {
      toast.error("E-Code cannot be empty for E-Code Card!");
      return;
    }

    // Validate card amount
    if (!cardAmount || isNaN(cardAmount) || parseFloat(cardAmount) <= 0) {
      toast.error("Please enter a valid card amount.");
      return;
    }

    // Validate if a country is selected
    if (!selectedCountry) {
      toast.error("Please select a country.");
      return;
    }

    // Validate if at least one image is selected (if necessary)
    if (selectedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    // Prepare form data including the base64-encoded images
    const formData = {
      user_id: userUid,
      selectedCard: cardType,  
      selectedCardDetails,
      selectedImages: selectedImages.map(image => ({
        id: image.id,
        buffer: image.buffer, // Send the base64-encoded image
      })),
      selectedCountry,
      cardAmount,
      nairaAmount,
      eCode: cardType === "Physical Card" ? '' : eCode,  
      exchangeRate: selectedExchangeRate, 
    };

    // Send data to API
    fetch('/api/submit_card_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Trade successfully Submitted!',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-primary-600 text-pay px-6 py-2 rounded-lg hover:bg-primary-600 transition duration-300',
          },
        }).then(() => {
          navigate('/user/giftcard/');
        });
        resetForm();
      }
    })
    .catch((error) => {
      console.error('Error submitting form data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error submitting form data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  // Define resetForm function to reset all the form states
  const resetForm = () => {
    setCardType("Physical Card");
    setSelectedImages([]); 
    setSelectedCardDetails(null);
    setAvailableCountries([]); 
    setCardAmount(''); 
    setNairaAmount(0); 
    setSelectedCountry(''); 
    setECode(''); 
  };

  return {
    cardType,  
    setCardType,
    selectedImages,
    setSelectedImages,
    cards,
    loading,
    dropdownOpen,
    selectedCardDetails,
    availableCountries,
    cardAmount,
    setCardAmount,
    setECode,
    nairaAmount,
    selectedCountry,
    selectedExchangeRate,
    eCode,
    handleImageChange,
    removeImage,
    toggleDropdown,
    handleCardSelect,
    handleCountryChange,
    handleECodeChange,
    handleSubmit
  };
};

export default useSellLogic;
