import React, { useState } from 'react';

export default function PinInput(props) {

    /*
        Required Properties
        - OnSubmit (function)
        - autoSubmit (bool)
        - pinCount (int)
        - submitBtn
    */

    const [allowOnChange, setAllowOnChange] = useState(true);

    // Events
    const onKeyPressed = (e)=>{
        if (e.keyCode === 8 || e.keyCode === 46) {
            // Do not allow onChange event
            setAllowOnChange(false);
            // Do something when the delete or backspace key is pressed
            console.log('Delete or Backspace key pressed');
            // Focus on previous sibling if available
            if(e.target.previousSibling){
                // Disable curremt pin input
                e.target.disabled = true;
                let previousElement = e.target.previousSibling;
                previousElement.focus();
                previousElement.select();
            }
        }else if(e.keyCode === 13){
            if(e.target.value !== "" && e.target.nextSibling){
                let nextElement = e.target.nextSibling;
                nextElement.disabled = false;
                nextElement.focus();
            }
        }
    };
    const onChange = (e)=>{
        // If input on target is greater than 1 character in length, then remove the last character
        if(e.target.value.toString().length > 1){
            e.target.value = parseInt(e.target.value.toString().slice(1));
        }

            // Check if the target has any next siblings
            if(e.target.nextSibling){
                setAllowOnChange(true);
                if(allowOnChange){
                    let nextElement = e.target.nextSibling;
                    nextElement.disabled = false;
                    nextElement.focus();
                }
            }else{
                // Handle auto-submit logic
                if(props.autoSubmit && e.target.value !== ""){
                    onSubmit(e.target);
                }
            }
        
    }
    const onSubmit = (e)=>{
        // Handle submit code here
        let userInput = [e.value];

        while(e.previousSibling){
            userInput.push(e.previousSibling.value);
            e = e.previousSibling;
        }

        userInput = userInput.reverse().join('');
        console.log("userInput: "+userInput);

        // Call the pre-defined onsubmit property after any necessary expressions
        props.OnSubmit(userInput);
    };

  return (
    <div className='PinInput-Container' style={{ flexDirection: props.flexDirection === "row" ? "row" : "column" }}>

        <div className='Pins-Row'>
            {Array.from({ length: props.pinCount }, (_, i) => (
                <input key={`pin-${i}`} type="number" min="0" max="9" onKeyUp={onKeyPressed} onChange={onChange} className='PinInput-Pin' id={`pin-${i}`} disabled={i !== 0} placeholder='&#x25CF;' />
            ))}
        </div>
        <div className='PinInput-SubmitBtn-Container'>
            {props.submitBtn}
        </div>
    </div>
  );
}