import React, { useState } from 'react';

export default function PinInput(props) {

    /*
        Required Properties
        - OnSubmit (function)
        - autoSubmit (bool)
        - pinCount (int)
    */

    const [allowOnChange, setAllowOnChange] = useState(true);

    // Events
    const onKeyPressed = (e)=>{
        if (e.keyCode === 8 || e.keyCode === 46) {
            // Do not allow onChange event
            setAllowOnChange(false);
            // Do something when the delete or backspace key is pressed
            console.log('Delete or Backspace key pressed');
            // Disable curremt pin input
            e.target.disabled = true;
            // Focus on previous sibling if available
            if(e.target.previousSibling){
                let previousElement = e.target.previousSibling;
                previousElement.focus();
            }
        }
    };
    const onChange = (e)=>{
        if(allowOnChange){
            // If input on target is greater than 1 character in length, then remove the last character
            if(e.target.value.toString().length > 1){
                e.target.value = parseInt(e.target.value.toString().slice(0, -1));
            }
            // Check if the target has any next siblings
            if(e.target.nextSibling){
                let nextElement = e.target.nextSibling;
                nextElement.disabled = false;
                nextElement.focus();
            }else{
                // Handle auto-submit logic
                if(props.autoSubmit){
                    onSubmit();
                }
            }
        }
    }
    const onSubmit = ()=>{
        // Handle submit code here
        // ##############################

        // Call the pre-defined onsubmit property after any necessary expressions
        props.OnSubmit();
    };

  return (
    <div className='PinInput-Container'>
        {Array.from({ length: props.pinCount }, (_, i) => (
            <input key={`pin-${i}`} type="number" min="0" max="9" onKeyUp={onKeyPressed} onChange={onChange} className='PinInput-Pin' id={`pin-${i}`} disabled={i !== 0} />
        ))}
    </div>
  );
}