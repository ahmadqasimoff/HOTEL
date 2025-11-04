import React, { useState } from 'react';
import { Calendar, MapPin, Users, CreditCard, Search, Hotel, Car, FileText, Map, CheckCircle, Clock, DollarSign, Star } from 'lucide-react';

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface BaseItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface HotelItem extends BaseItem {
  type: 'hotel';
  location: string;
  rating: number;
  amenities: string[];
}

interface CarItem extends BaseItem {
  type: 'car';
  // some car listings may include a 'location' or a 'model' field
  location?: string;
  model?: string;
  rating: number;
  features: string[];
}

interface TourItem extends BaseItem {
  type: 'tour';
  location: string;
  rating: number;
  duration: string;
}

interface VisaItem extends BaseItem {
  type: 'visa';
  country: string;
  processing: string;
}

type Item = HotelItem | CarItem | TourItem | VisaItem;

type TabType = 'hotels' | 'cars' | 'tours' | 'visa';
type BookingStep = 'search' | 'results' | 'details' | 'payment' | 'confirmation';

export default function TravelBookingWebsite() {
  const [activeTab, setActiveTab] = useState<TabType>('hotels');
  const [bookingStep, setBookingStep] = useState<BookingStep>('search');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchData, setSearchData] = useState<SearchData>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const hotels = [
    { id: 1, type: 'hotel', name: 'Grand Plaza Hotel', location: 'New York, USA', price: 250, rating: 4.8, image: '🏨', amenities: ['WiFi', 'Pool', 'Spa'] },
    { id: 2, type: 'hotel', name: 'Ocean View Resort', location: 'Miami, USA', price: 320, rating: 4.9, image: '🏖️', amenities: ['Beach', 'Restaurant', 'Bar'] },
    { id: 3, type: 'hotel', name: 'Mountain Lodge', location: 'Colorado, USA', price: 180, rating: 4.6, image: '🏔️', amenities: ['Parking', 'Heating', 'WiFi'] },
    { id: 4, type: 'hotel', name: 'City Center Inn', location: 'Los Angeles, USA', price: 200, rating: 4.7, image: '🏙️', amenities: ['Gym', 'WiFi', 'Breakfast'] }
  ];

  const cars = [
    { id: 1, type: 'car', name: 'Toyota Camry', model: 'Sedan', price: 45, rating: 4.7, image: '🚗', features: ['Auto', 'AC', '5 Seats'] },
    { id: 2, type: 'car', name: 'Honda CR-V', model: 'SUV', price: 65, rating: 4.8, image: '🚙', features: ['Auto', 'AC', '7 Seats'] },
    { id: 3, type: 'car', name: 'Tesla Model 3', model: 'Electric', price: 85, rating: 4.9, image: '⚡', features: ['Auto', 'Electric', '5 Seats'] },
    { id: 4, type: 'car', name: 'Ford Mustang', model: 'Sports', price: 120, rating: 4.8, image: '🏎️', features: ['Manual', 'AC', '4 Seats'] }
  ];

  const tours = [
    { id: 1, type: 'tour', name: 'City Walking Tour', location: 'Paris, France', price: 50, duration: '4 hours', rating: 4.9, image: '🗼' },
    { id: 2, type: 'tour', name: 'Desert Safari', location: 'Dubai, UAE', price: 120, duration: '6 hours', rating: 4.8, image: '🏜️' },
    { id: 3, type: 'tour', name: 'Island Hopping', location: 'Maldives', price: 200, duration: '8 hours', rating: 4.9, image: '🏝️' },
    { id: 4, type: 'tour', name: 'Mountain Trek', location: 'Nepal', price: 150, duration: '2 days', rating: 4.7, image: '⛰️' }
  ];

  const visaTypes = [
    { id: 1, type: 'visa', name: 'Tourist Visa', country: 'USA', price: 160, processing: '7-10 days', image: '🇺🇸' },
    { id: 2, type: 'visa', name: 'Business Visa', country: 'UK', price: 140, processing: '5-7 days', image: '🇬🇧' },
    { id: 3, type: 'visa', name: 'Student Visa', country: 'Canada', price: 150, processing: '10-15 days', image: '🇨🇦' },
    { id: 4, type: 'visa', name: 'Tourist Visa', country: 'Australia', price: 145, processing: '7-14 days', image: '🇦🇺' }
  ];

  const handleSearch = () => {
    setBookingStep('results');
  };

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item);
    setBookingStep('details');
  };

  const handleProceedToPayment = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    setBookingStep('payment');
  };

  const handlePayment = () => {
    if (!bookingData.cardNumber || !bookingData.expiry || !bookingData.cvv) {
      alert('Please fill in all payment details');
      return;
    }
    if (!/^\d{16}$/.test(bookingData.cardNumber.replace(/\s/g, ''))) {
      alert('Please enter a valid 16-digit card number');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(bookingData.expiry)) {
      alert('Please enter expiry date in MM/YY format');
      return;
    }
    if (!/^\d{3}$/.test(bookingData.cvv)) {
      alert('Please enter a valid 3-digit CVV');
      return;
    }
    setBookingStep('confirmation');
  };

  const renderSearchForm = () => (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-soft mb-8 transform hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-2 text-primary-500" />
            {activeTab === 'hotels' ? 'Destination' : activeTab === 'cars' ? 'Pick-up Location' : activeTab === 'tours' ? 'Tour Location' : 'Country'}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter location"
            value={searchData.destination}
            onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            {activeTab === 'visa' ? 'Travel Date' : 'Check-in / Pick-up'}
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchData.checkIn}
            onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
          />
        </div>
        {activeTab !== 'visa' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Check-out / Drop-off
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            {activeTab === 'visa' ? 'Applicants' : 'Guests'}
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            value={searchData.guests}
            onChange={(e) => setSearchData({...searchData, guests: Number(e.target.value || 1)})}
          />
        </div>
      </div>
      <button onClick={handleSearch} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-2">
        <Search className="w-5 h-5" />
        Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </button>
    </div>
  );

  const renderResults = () => {
    let items;
    if (activeTab === 'hotels') items = hotels;
    else if (activeTab === 'cars') items = cars;
    else if (activeTab === 'tours') items = tours;
    else items = visaTypes;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {items.map(item => (
          <div key={item.id} className="card group p-6 hover:-translate-y-1">
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className="text-6xl transform transition-transform group-hover:scale-110 group-hover:rotate-3">{item.image}</div>
                <div className="text-right">
                  {/* rating is present for hotels, cars and tours */}
                  {'rating' in item ? (
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <div className="px-3 py-1 rounded-full bg-yellow-50 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                    </div>
                  ) : null}
                  <div className="text-2xl font-bold gradient-text">${item.price}</div>
                  {/* duration only for tours; cars might show model, otherwise show per night/day */}
                  {'duration' in item ? (
                    <div className="text-sm text-gray-500">{item.duration}</div>
                  ) : item.type === 'car' ? (
                    <div className="text-sm text-gray-500">{(item as any).model ?? 'per day'}</div>
                  ) : (
                    <div className="text-sm text-gray-500">per night</div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {item.type === 'visa' ? (item as VisaItem).country : 'location' in item ? (item as any).location : ((item as any).model ?? '')}
              </p>
              {/* amenities (hotels) */}
              {'amenities' in item && Array.isArray((item as any).amenities) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(item as any).amenities.map((amenity: string, i: number) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
              {/* features (cars) */}
              {'features' in item && Array.isArray((item as any).features) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(item as any).features.map((feature: string, i: number) => (
                    <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
              {/* processing (visa) */}
              {item.type === 'visa' && ((item as VisaItem).processing) && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Processing: {(item as VisaItem).processing}
                  </span>
                </div>
              )}
              <button
                onClick={() => handleSelectItem(item as Item)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBookingDetails = () => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-display font-bold gradient-text mb-8">Booking Details</h2>
          <div className="flex items-start gap-8 mb-8 pb-8 border-b border-gray-100">
            <div className="text-7xl transform transition-transform hover:scale-110 hover:rotate-3">{selectedItem?.image}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedItem?.name}</h3>
              <p className="text-gray-600 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                {selectedItem ? (selectedItem.type === 'visa' ? (selectedItem as VisaItem).country : 'location' in selectedItem ? (selectedItem as any).location : ((selectedItem as any).model ?? '')) : ''}
              </p>
              <div className="text-3xl font-bold gradient-text">${selectedItem?.price}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={bookingData.name}
              onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={bookingData.email}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={bookingData.phone}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
            />
          </div>
        </div>
        <button onClick={handleProceedToPayment} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft p-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-display font-bold gradient-text mb-6 flex items-center gap-3">
          <CreditCard className="w-6 h-6" />
          Payment Information
        </h2>
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-8 rounded-2xl mb-8 transform hover:scale-102 transition-all duration-300">
            <div className="text-primary-100 mb-2">Total Amount</div>
            <div className="text-5xl font-bold font-display">${selectedItem?.price}</div>
        </div>
        <div className="space-y-4">
          <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
                className="input-field"
              value={bookingData.cardNumber}
              onChange={(e) => setBookingData({...bookingData, cardNumber: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                  className="input-field"
                value={bookingData.expiry}
                onChange={(e) => setBookingData({...bookingData, expiry: e.target.value})}
              />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                  className="input-field"
                value={bookingData.cvv}
                onChange={(e) => setBookingData({...bookingData, cvv: e.target.value})}
              />
            </div>
          </div>
        </div>
          <button onClick={handlePayment} className="w-full mt-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
          <DollarSign className="w-5 h-5" />
          Complete Payment
        </button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft p-8 text-center hover:shadow-lg transition-all duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
            <CheckCircle className="w-12 h-12 text-primary-600" />
        </div>
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 text-lg mb-8">Your booking has been successfully confirmed. A confirmation email has been sent to {bookingData.email}</p>
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl mb-8 text-left">
            <h3 className="font-display font-bold text-xl text-gray-800 mb-6">Booking Summary</h3>
          <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Booking ID:</span>
                <span className="font-semibold text-primary-700">TH{Math.floor(Math.random() * 1000000)}</span>
            </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-500">Name:</span>
              <span className="font-semibold">{bookingData.name}</span>
            </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-500">Item:</span>
              <span className="font-semibold">{selectedItem?.name || bookingData.name}</span>
            </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-500">Amount Paid:</span>
                <span className="font-semibold gradient-text">${selectedItem?.price}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setBookingStep('search');
            setSelectedItem(null);
          }}
            className="btn-primary px-10 py-4 shadow-lg hover:shadow-xl transform hover:scale-102"
        >
          Make Another Booking
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center text-white text-2xl animate-float">
                ✈️
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">TravelHub</h1>
                <p className="text-sm text-gray-600">Your Complete Travel Solution</p>
              </div>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">Home</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">About</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition">Contact</a>
              <button className="btn-primary">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {bookingStep === 'search' && (
        <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/5 to-secondary-600/50"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-6xl font-display font-bold mb-6 leading-tight">
              Book Your Next
              <span className="block text-primary-200">Adventure</span>
            </h2>
            <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
              Your one-stop platform for Hotels, Cars, Tours & Visa services. Experience seamless booking with exclusive deals.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {bookingStep === 'search' && (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto px-2 py-1">
              <button
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'hotels'
                    ? 'bg-white text-primary-600 shadow-soft scale-105'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-102'
                }`}
              >
                <Hotel className="w-5 h-5" />
                Hotels
              </button>
              <button
                onClick={() => setActiveTab('cars')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'cars'
                    ? 'bg-white text-primary-600 shadow-soft scale-105'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-102'
                }`}
              >
                <Car className="w-5 h-5" />
                Cars
              </button>
              <button
                onClick={() => setActiveTab('tours')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'tours'
                    ? 'bg-white text-primary-600 shadow-soft scale-105'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-102'
                }`}
              >
                <Map className="w-5 h-5" />
                Tours
              </button>
              <button
                onClick={() => setActiveTab('visa')}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'visa'
                    ? 'bg-white text-primary-600 shadow-soft scale-105'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-102'
                }`}
              >
                <FileText className="w-5 h-5" />
                Visa
              </button>
            </div>

            {renderSearchForm()}
          </>
        )}

        {bookingStep === 'results' && (
          <>
            <button
              onClick={() => setBookingStep('search')}
              className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Back to Search
            </button>
            {renderResults()}
          </>
        )}

        {bookingStep === 'details' && (
          <>
            <button
              onClick={() => setBookingStep('results')}
              className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Back to Results
            </button>
            {renderBookingDetails()}
          </>
        )}

        {bookingStep === 'payment' && renderPayment()}

        {bookingStep === 'confirmation' && renderConfirmation()}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/50"></div>
            <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-2xl font-display font-bold gradient-text mb-4">TravelHub</h3>
                <p className="text-gray-400 leading-relaxed">Your trusted partner for all travel needs. Experience the world with confidence and style.</p>
            </div>
            <div>
                <h4 className="text-lg font-display font-semibold text-primary-100 mb-6">Services</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="hover:text-white transition-colors duration-200">
                    <a href="#" className="flex items-center gap-2">
                      <Hotel className="w-4 h-4" />Hotel Booking
                    </a>
                  </li>
                  <li className="hover:text-white transition-colors duration-200">
                    <a href="#" className="flex items-center gap-2">
                      <Car className="w-4 h-4" />Car Rental
                    </a>
                  </li>
                  <li className="hover:text-white transition-colors duration-200">
                    <a href="#" className="flex items-center gap-2">
                      <Map className="w-4 h-4" />Tour Packages
                    </a>
                  </li>
                  <li className="hover:text-white transition-colors duration-200">
                    <a href="#" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />Visa Assistance
                    </a>
                  </li>
              </ul>
            </div>
            <div>
                <h4 className="text-lg font-display font-semibold text-primary-100 mb-6">Support</h4>
                <ul className="space-y-3 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
                <h4 className="text-lg font-display font-semibold text-primary-100 mb-6">Contact</h4>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      📧
                    </div>
                    <span className="hover:text-white transition-colors duration-200">info@travelhub.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      📞
                    </div>
                    <span className="hover:text-white transition-colors duration-200">+1 234 567 8900</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      📍
                    </div>
                    <span className="hover:text-white transition-colors duration-200">123 Travel Street, USA</span>
                  </li>
              </ul>
            </div>
          </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TravelHub. All rights reserved.</p>
          </div>
            </div>
        </div>
      </footer>
    </div>
  );
}