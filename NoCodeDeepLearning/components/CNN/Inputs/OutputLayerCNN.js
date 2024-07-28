import React, { useState } from 'react';

const OutputLayerCNN = ({ OutputParamsApply, OptimizerParamApply, LossFunctionParamApply,ModelConfParamsApply }) => {
  const [units, setUnits] = useState('');
  const [act, setAct] = useState('relu');
  const [opti, setOpti] = useState('sgd')
  const [lossFunc, setLossFunc] = useState('bce')

  const [learningRate, setLearningRate] = useState(0)
  const [epochs, setEpochs] = useState(0)




  const handleApply = () => {
    OutputParamsApply(
      parseInt(units),
      act
    );
  };



  const [dropdownStateConv, setDropdownStateConv] = useState({
    isOpenLayer: false,
    isOpenOptimizer: false,
    isOpenLossFunction: false,
    isOpenModel: false
  });
  
  const toggleDropdownConv = (type) => {
    setDropdownStateConv(prevState => ({
      isOpenLayer: type === 'outputlayer' ? !prevState.isOpenLayer : false,
      isOpenOptimizer: type === 'optimizer' ? !prevState.isOpenOptimizer : false,
      isOpenLossFunction: type === 'lossfunction' ? !prevState.isOpenLossFunction : false,
      isOpenModel: type == 'modelconf' ? !prevState.isOpenModel : false
    }));

    console.log(dropdownStateConv)
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
        onClick={() => toggleDropdownConv("outputlayer")}
      >
        Output Configurations
        {dropdownStateConv.isOpenLayer  === true ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* optimizer configuration */}

      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={() => toggleDropdownConv("optimizer")}
      >
        Optimizer Configuration
        {dropdownStateConv.isOpenOptimizer  === true ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* loss configuration */}

      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={() => toggleDropdownConv("lossfunction")}
      >
        Loss Function
        {dropdownStateConv.isOpenLossFunction  === true ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* model configuration */}

      <button
        type="button"
        className="mt-5 p-3 flex justify-between items-center w-full py-2 px-4 text-white rounded-lg"
        onClick={() => toggleDropdownConv("modelconf")}
      >
        Model Configuration
        {dropdownStateConv.isOpenModel  === true ? <ChevronUp /> : <ChevronDown />}
      </button>


      {
        dropdownStateConv.isOpenLayer &&
        <form className="w-[18rem] px-5 mt-[5rem] flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="width"
              className="text-md text-gray-300"
            >
              units 
            </label>
            <input
              type="text"
              name="units"
              id="units"
              className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder=" "
              required
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
          </div>

          <label htmlFor="activation" className="text-[10px] text-gray-300">
              Activation Function
            </label>
            <select
              name="activation"
              id="activation"
              value={act}
              onChange={(e) => setAct(e.target.value)}
              className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
            >
              <option value="relu">ReLU</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="tanh">Tanh</option>
              <option value="softmax">Softmax</option>
            </select>

        </div>

        <button 
          type="button" 
          className="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleApply}
        >
          Apply
        </button>
        </form>

      }

      {
      dropdownStateConv.isOpenOptimizer &&
      <form className="w-[18rem] px-5 mt-[5rem] flex flex-col  gap-11">

      <div className="flex flex-col gap-3">
          <label
              htmlFor="optimisers"
              className="text-lg text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
              Optimizer 
          </label>
          <select
              name="optimisers"
              id="optimisers"
              className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              value= {opti}
              onChange={(e) => setOpti(e.target.value)}
            
          >
              <option value="sgd">Stochastic Gradient Descent (SGD)</option>
              <option value="adam">Adam</option>
              <option value="rmsprop">RMSprop</option>
              <option value="adagrad">Adagrad</option>
              <option value="adadelta">Adadelta</option>
              <option value="nadam">NAdam</option>
              <option value="lbfgs">LBFGS</option>
          </select>
      </div>

      <button type="button" class="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick = {() => OptimizerParamApply(opti)}
      >
              
              Apply

      </button>

      </form>
      }

      {

      dropdownStateConv.isOpenLossFunction &&

      <form className="w-[18rem] px-5 mt-[5rem] flex flex-col  gap-11">

      <div className="flex flex-col gap-3">
          <label
              htmlFor="optimisers"
              className="text-lg text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
              Loss Function
          </label>
          <select
              name="lossFunctions"
              id="lossFunctions"
              className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              value={lossFunc}
              onChange={(e) => setLossFunc(e.target.value)}
            
          >
              <option value="bce">Binary Cross-Entropy Loss</option>
              <option value="bce_with_logits">Binary Cross-Entropy Loss (With Logits)</option>
              <option value="cross_entropy">Categorical Cross-Entropy Loss</option>
              <option value="kl_div">Kullback-Leibler Divergence Loss</option>
              <option value="mse">Mean Squared Error Loss</option>
              <option value="mae">Mean Absolute Error Loss</option>
              <option value="huber">Huber Loss</option>
              <option value="cosine_similarity">Cosine Similarity Loss</option>
              <option value="hinge">Hinge Loss</option>
              <option value="triplet">Triplet Loss</option>
          </select>
      </div>

      <button type="button" class="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick = {() => LossFunctionParamApply(lossFunc)}
      >
              
              Apply

      </button>

      </form>

      }

      {

        dropdownStateConv.isOpenModel && 
        
        <form className="w-[18rem] px-5 mt-[1.5rem] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="learningRate"
                className="text-md text-gray-300"
              >
                Learning rate 
              </label>
              <input
                type="text"
                name="learningRate"
                id="learningRate"
                className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder=" "
                required
                value = {learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
               
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="learningRate"
                className="text-md text-gray-300"
              >
                Epochs
              </label>
              <input
                type="text"
                name="epochs"
                id="epochs"
                className="block py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder=" "
                epochs={epochs}
                onChange={(e) => setEpochs(e.target.value)}

                required
               
              />
            </div>
          </div>

          <button type="button" class="text-white bg-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick = {() => ModelConfParamsApply(learningRate, epochs)}
          >
                  
                  Apply

          </button>
        </form>
      }

    </div>
  );
};

export default OutputLayerCNN;