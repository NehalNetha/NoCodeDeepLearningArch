import React, { useState } from 'react';

const RNNInputs = ({ InputParamApply }) => {
  const [inputSize, setInputSize] = useState('');
  const [sequenceLength, setSequenceLength] = useState('');
  const [batchSize, setBatchSize] = useState('');

  const handleApply = () => {
    InputParamApply(
      parseInt(inputSize),
      parseInt(sequenceLength),
      parseInt(batchSize)
    );
  };

  return (
    <form className="w-[18rem] px-5 mt-[5rem] flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="inputSize"
            className="text-md text-gray-300"
          >
            Input Size (Features)
          </label>
          <input
            type="text"
            name="inputSize"
            id="inputSize"
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder=" "
            required
            value={inputSize}
            onChange={(e) => setInputSize(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="sequenceLength"
            className="text-md text-gray-300"
          >
            Sequence Length
          </label>
          <input
            type="text"
            name="sequenceLength"
            id="sequenceLength"
            className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder=" "
            required
            value={sequenceLength}
            onChange={(e) => setSequenceLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="batchSize"
            className="text-md text-gray-300"
          >
            Batch Size
          </label>
          <input
            type="text"
            name="batchSize"
            id="batchSize"
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

export default RNNInputs;