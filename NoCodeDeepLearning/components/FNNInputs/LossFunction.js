
import React, { useState } from 'react'

const LossFunctionApply = ({LossFunctionParamApply}) => {
    const [lossFunc, setLossFunc] = useState('bce')


    return(

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
    )
}


export default LossFunctionApply