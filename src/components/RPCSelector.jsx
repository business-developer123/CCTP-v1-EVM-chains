import { useState } from 'react';

export const RPCSelector = ({ onRPCChange, config }) => {
  const [selectedOption, setSelectedOption] = useState('Ethereum');
  const [customRPC, setCustomRPC] = useState('https://mainnet.helius-rpc.com/?api-key=a16e5eed-e371-4d3d-ace0-169df4d3dfde');
  const [isEditMode, setIsEditMode] = useState(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option !== 'solana') {
      onRPCChange(config.rpcs[option]);
    }
    if (option === 'solana') {
      setIsEditMode(true);
    }
  };

  const handleCustomRPCChange = (value) => {
    setCustomRPC(value);
  };

  const handleSaveEditToggle = () => {
    if (isEditMode && customRPC && selectedOption === 'solana') {
      onRPCChange(customRPC);
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };

  return (
    <div className="bg-[#1C2333] p-4 rounded-lg">
      <h2 className="text-white text-lg mb-4">RPC Endpoint</h2>
      <div className="space-y-3">
        {Object.entries(config.rpcs)
          .filter(([chain]) => !chain.includes("Solana"))
          .map(([chain, url]) => (
            <label key={chain} className="flex items-center space-x-3 text-white cursor-pointer">
              <input
                type="radio"
                name="rpc"
                checked={selectedOption === chain}
                onChange={() => handleOptionChange(chain)}
                className="form-radio text-blue-600"
              />
              <span className="flex items-center justify-between w-full">
                <span>{chain} RPC</span>
              </span>
            </label>
          ))}

        <label className="flex items-center space-x-3 text-white cursor-pointer">
          <input
            type="radio"
            name="rpc"
            checked={selectedOption === 'solana'}
            onChange={() => handleOptionChange('solana')}
            className="form-radio text-blue-600"
          />
          <span>Solana RPC</span>
        </label>

        {selectedOption === 'solana' && (
          <div className="flex space-x-2">
            <input
              type="text"
              value={customRPC}
              onChange={(e) => handleCustomRPCChange(e.target.value)}
              placeholder="Enter Solana RPC URL"
              disabled={!isEditMode}
              className={`flex-1 bg-[#2C3444] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <button
              onClick={handleSaveEditToggle}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditMode ? 'Save' : 'Edit'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 