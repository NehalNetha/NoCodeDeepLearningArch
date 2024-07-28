import React, { useState } from 'react';

const InputLayerCNN = ({ InputParamApply }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [channels, setChannels] = useState('');
  const [batchSize, setBatchSize] = useState('');

  const handleApply = () => {
    InputParamApply(
      parseInt(width),
      parseInt(height),
      parseInt(channels),
      parseInt(batchSize)
    );
  };

  return (
    <form className="w-[18rem] px-5 mt-[5rem] flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="width"
            className="text-md text-gray-300"
          >
            Width 
          </label>
          <input
            type="text"
            name="width"
            id="width"
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder=" "
            required
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="height"
            className="text-md text-gray-300"
          >
            Height 
          </label>
          <input
            type="text"
            name="height"
            id="height"
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder=" "
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="channels"
            className="text-md text-gray-300"
          >
            Channels 
          </label>
          <input
            type="text"
            name="channels"
            id="channels"
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder=" "
            required
            value={channels}
            onChange={(e) => setChannels(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="batches"
            className="text-md text-gray-300"
          >
            Batches 
          </label>
          <input
            type="text"
            name="batches"
            id="batches"
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder=" "
            required
            value={batchSize}
            onChange={(e) => setBatchSize(e.target.value)}
          />
        </div>
      </div>

      <button 
        type="button" 
        className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleApply}
      >
        Apply
      </button>
    </form>
  );
};

export default InputLayerCNN;