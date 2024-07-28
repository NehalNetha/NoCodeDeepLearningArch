import React, { useState } from 'react'

const OutputLayer = ({ OutputParamApply }) => {
    const [outputSize, setOutputSize] = useState('')
    const [outputAct, setOutputAct] = useState('relu')
    
    const handleSubmit = (e) => {
      e.preventDefault();
      OutputParamApply(outputSize, outputAct);
    }
    
    return (
        <form className="w-[18rem] px-5 mt-[5rem] flex flex-col gap-11" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <label
                    htmlFor="floating_output_size"
                    className="text-lg text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Output Layer Size
                </label>
                <input
                    type="text"
                    name="floating_output_size"
                    id="floating_output_size"
                    className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    placeholder=" "
                    required
                    value={outputSize}
                    onChange={(e) => setOutputSize(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <label
                    htmlFor="floating_activation"
                    className="text-lg text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Activation Function
                </label>
                <select
                    name="floating_activation"
                    id="floating_activation"
                    className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                    value={outputAct}
                    onChange={(e) => setOutputAct(e.target.value)}
                >
                    <option value="relu">ReLU</option>
                    <option value="sigmoid">Sigmoid</option>
                    <option value="softmax">Softmax</option>
                    <option value="tanh">Tanh</option>
                </select>
            </div>
            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick = {() => OutputParamApply(outputSize, outputAct)}
            >
                Apply
            </button>
        </form>
    )
}

export default OutputLayer