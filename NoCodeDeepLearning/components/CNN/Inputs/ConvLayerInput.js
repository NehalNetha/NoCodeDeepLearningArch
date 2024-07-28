import React, { useState } from 'react';

const ConvLayerInput = ({ActivationParamApply, PoolingParamApply,  ConvParamApply, convNumber   }) => {
  
  const [convParams, setConvParams] = useState({
    filters: '',
    kernelSize: '',
    stride: '1',
    padding: '0',
    dilation: '1',
    groups: '1',
    bias: true
  });
  
  const [poolParams, setPoolParams] = useState({
    kernelSize: '',
    stride: '1',
    padding: '0'
  });
  
  const [activation, setActivation] = useState('relu');

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenActivation, setOpenActivation] = useState(false);
  const [isOpenPooling, setOpenPooling] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setOpenActivation(false);
    setOpenPooling(false);
  };

  const toggleActivationDown = () => {
    setOpenActivation(!isOpenActivation);
    setIsOpen(false);
    setOpenPooling(false);
  };

  const toggleOpenPooling = () => {
    setOpenPooling(!isOpenPooling);
    setIsOpen(false);
    setOpenActivation(false);
  };

  const handleConvParamChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConvParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePoolParamChange = (e) => {
    const { name, value } = e.target;
    setPoolParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConvParamApply = () => {
    ConvParamApply(
      {
        ...convParams,
        filters: parseInt(convParams.filters, 10),
        kernelSize: parseInt(convParams.kernelSize, 10),
        stride: parseInt(convParams.stride, 10),
        padding: parseInt(convParams.padding, 10),
        dilation: parseInt(convParams.dilation, 10),
        groups: parseInt(convParams.groups, 10)
      }
    );

  
  };

  const handleActivationApply = () => {
      ActivationParamApply(activation);
   
  };

  const hanndlePoolingLayerapply = () => {

    PoolingParamApply(
        {
        ...poolParams,
        kernelSize: parseInt(poolParams.kernelSize, 10),
        stride: parseInt(poolParams.stride, 10),
        padding: parseInt(poolParams.padding, 10)
        }
    );
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
        onClick={toggleDropdown}
      >
        Convolutional Layer Parameters for {convNumber}
        {isOpen   === true ? <ChevronUp /> : <ChevronDown />}
      </button>

      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={toggleActivationDown}
      >
        Activation Function
        {isOpenActivation ? <ChevronUp /> : <ChevronDown />}
      </button>

      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={toggleOpenPooling}
      >
        Pooling Layers
        {isOpenPooling ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen  &&(
        <form className="w-[18rem] px-5 mt-[1rem] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {Object.entries(convParams).map(([key, value]) => (
              key !== 'bias' ? (
                <div key={key} className="flex flex-col gap-2">
                  <label htmlFor={key} className="text-[10px] text-gray-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)} {key === 'filters' || key === 'kernelSize' ? '*' : ''}
                  </label>
                  <input
                    type="text"
                    name={key}
                    id={key}
                    className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
                    placeholder={key === 'filters' || key === 'kernelSize' ? 'Required' : value}
                    required={key === 'filters' || key === 'kernelSize'}
                    value={value}
                    onChange={handleConvParamChange}
                  />
                </div>
              ) : (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={key}
                    id={key}
                    checked={value}
                    onChange={handleConvParamChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={key} className="text-[10px] text-gray-300">
                    Bias (Default: True)
                  </label>
                </div>
              )
            ))}
          </div>

          <button 
            type="button" 
            className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleConvParamApply}
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
            <option value="relu">ReLU</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="tanh">Tanh</option>
            <option value="softmax">Softmax</option>
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

      {isOpenPooling && (
        <form className="w-[18rem] px-5 mt-[1rem] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {Object.entries(poolParams).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-2">
                <label htmlFor={`pool_${key}`} className="text-[10px] text-gray-300">
                  {key.charAt(0).toUpperCase() + key.slice(1)} {key === 'kernelSize' ? '*' : ''}
                </label>
                <input
                  type="text"
                  name={key}
                  id={`pool_${key}`}
                  className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
                  placeholder={key === 'kernelSize' ? 'Required' : value}
                  required={key === 'kernelSize'}
                  value={value}
                  onChange={handlePoolParamChange}
                />
              </div>
            ))}
          </div>

          <button 
            type="button" 
            className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={hanndlePoolingLayerapply}
          >
            Apply
          </button>
        </form>
      )}
    </div>
  );
};

export default ConvLayerInput;