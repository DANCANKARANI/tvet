"use client"
import { FC, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const TrackPaymentPage: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | ''>('');
  const [paymentCode, setPaymentCode] = useState('');

  const handlePaymentMethodChange = (method: 'mpesa' | 'bank') => {
    setPaymentMethod(method);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log(`Payment Method: ${paymentMethod}`);
    console.log(`Payment Code: ${paymentCode}`);
    
    // Clear the form fields
    setPaymentMethod('');
    setPaymentCode('');
  };

  return (
    <div>
      <Navbar name={''}/>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg flex-grow mt-40">
        <h1 className="text-2xl font-bold mb-6">Track Payment</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Select Payment Method</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('mpesa')}
                className={`py-2 px-4 rounded-md border ${paymentMethod === 'mpesa' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                MPESA
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange('bank')}
                className={`py-2 px-4 rounded-md border ${paymentMethod === 'bank' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Bank
              </button>
            </div>
          </div>
          {paymentMethod && (
            <div>
              <label className="block text-lg font-medium mb-2">Payment Code</label>
              <input
                type="text"
                value={paymentCode}
                onChange={(e) => setPaymentCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your payment code"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!paymentMethod}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default TrackPaymentPage;
