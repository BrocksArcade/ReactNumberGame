export function DateInputComponent(){
    return (<>
        <div className="d-flex flex-row  container-fluid align-items-center justify-content-center gap-3">
            {/* {title && <label className="InputLabel text-center align-self-center">{title}</label>} */}
            <div className="d-flex col flex-row justify-content-center align-items-center text-center InputFrame my-3 py-2">
                {/* <button type="button" className="btn-ripple  but_inputchanger col text-center align-self-center m-2 py-2" onClick={() => decrementValue()}>-</button> */}
                {/* allow only Day and Month Date */}
          
                <input type="date" placeholder="DD/MM" onChange={(value) => {
                    console.log(value);
                    // validateAndSubmitInput(n);
                }}

                />
                {/* <button type="button" className="btn-ripple  but_inputchanger  col mtext-center align-self-center m-2 py-2" onClick={() => IncrementValue()}>+</button> */}

            </div>
        </div></>)
}