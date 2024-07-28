import React, { useState } from 'react';

const RnnLayerInputs = ({ RnnParamApply, ActivationParamApply }) => {
  const [rnnParams, setRnnParams] = useState({
    hiddenSize: '',
    numLayers: '1',
    dropout: '0',
    bidirectional: false,
    batchFirst: true,
  });

  const [activation, setActivation] = useState('tanh');

  const [isOpenRnn, setIsOpenRnn] = useState(false);
  const [isOpenActivation, setIsOpenActivation] = useState(false);

  const toggleRnnDropdown = () => {
    setIsOpenRnn(!isOpenRnn);
    setIsOpenActivation(false);
  };

  const toggleActivationDropdown = () => {
    setIsOpenActivation(!isOpenActivation);
    setIsOpenRnn(false);
  };

  const handleRnnParamChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRnnParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRnnParamApply = () => {
    RnnParamApply({
      ...rnnParams,
      hiddenSize: parseInt(rnnParams.hiddenSize, 10),
      numLayers: parseInt(rnnParams.numLayers, 10),
      dropout: parseFloat(rnnParams.dropout),
    });
  };

  const handleActivationApply = () => {
    ActivationParamApply(activation);
  };

  const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-[1rem] h-[1rem]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
    </svg>
  );

  const ChevronUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-[1rem] h-[1rem]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
    </svg>
  );

  return (
    <div>
      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={toggleRnnDropdown}
      >
        RNN Layer Parameters
        {isOpenRnn ? <ChevronUp /> : <ChevronDown />}
      </button>

      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={toggleActivationDropdown}
      >
        Activation Function
        {isOpenActivation ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpenRnn && (
        <form className="w-[18rem] px-5 mt-[1rem] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {Object.entries(rnnParams).map(([key, value]) => (
              key !== 'bidirectional' && key !== 'batchFirst' ? (
                <div key={key} className="flex flex-col gap-2">
                  <label htmlFor={key} className="text-[10px] text-gray-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)} {key === 'hiddenSize' ? '*' : ''}
                  </label>
                  <input
                    type="text"
                    name={key}
                    id={key}
                    className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder={key === 'hiddenSize' ? 'Required' : value}
                    required={key === 'hiddenSize'}
                    value={value}
                    onChange={handleRnnParamChange}
                  />
                </div>
              ) : (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={key}
                    id={key}
                    checked={value}
                    onChange={handleRnnParamChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={key} className="text-[10px] text-gray-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              )
            ))}
          </div>

          <button 
            type="button" 
            className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleRnnParamApply}
          >
            Apply
          </button>
        </form>
      )}

      {isOpenActivation && (
        <form className="flex flex-col gap-8 px-4 mt-8">
          <label htmlFor="activation" className="text-[10px] text-gray-300">
            Activation Function
          </label>
          <select
            name="activation"
            id="activation"
            value={activation}
            onChange={(e) => setActivation(e.target.value)}
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
          >
            <option value="tanh">Tanh</option>
            <option value="relu">ReLU</option>
            <option value="sigmoid">Sigmoid</option>
          </select>
          <button 
            type="button" 
            className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleActivationApply}
          >
            Apply
          </button>
        </form>
      )}
    </div>
  );
};

export default RnnLayerInputs;