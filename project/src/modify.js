import React, { useState } from 'react';

function ModifyPage() {
    // Initialize a single state object to store all input values
    const [inputs, setInputs] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: ''
    });

    // Function to handle changes in any input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent the default form submission behavior
        const timestamp = new Date().getTime();
        const apiUrl = `http://localhost:3000/api/modify?input1=${inputs.input1}&input2=${inputs.input2}&input3=${inputs.input3}&input4=${inputs.input4}&input5=${inputs.input5}&input6=${inputs.input6}&input7=${inputs.input7}&input8=${inputs.input8}&input9=${inputs.input9}&input10=${inputs.input10}&_=${timestamp}`;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Data modified successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to modify data');
        });
    };

    const handleAdvancedAction = (event) => {
        event.preventDefault();
        console.log("Advanced Action Triggered");
        // alert('Performing advanced action!');
        // Here, you can implement what this advanced action does, e.g., fetching more complex data
        // Example fetch call
        const advancedInputs = {
            advancedInput1: inputs.input1,
            advancedInput2: inputs.input2,
            advancedInput3: inputs.input3,
            advancedInput4: inputs.input4
        }
        fetch('http://localhost:3000/api/advanced-action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(advancedInputs)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Advanced data:', data.message);
                alert('Advanced data loaded!');
            })
            .catch(error => {
                console.error('Error fetching advanced data:', error.error);
                alert('Failed to fetch advanced data');
            });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f0f0'
        }}>
            <h1 style={{ color: '#333', marginBottom: '7px' }}>Add New Entry</h1>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',  // 减少内边距
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                width: '80%', // 减小宽度以使表单看起来更小
                maxWidth: '500px',  // 减少最大宽度
                paddingTop: '60px'
            }}>
                {Object.keys(inputs).map((key, index) => (
                    <div key={index} style={{ marginBottom: '10px', width: '100%' }}>
                        <label htmlFor={key} style={{ marginBottom: '5px', fontWeight: 'bold' }}>{`Input ${index + 1}`}:</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={inputs[key]}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',  // 减少输入框的内边距
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <button type="submit" style={{
                        padding: '10px 15px',
                        color: 'white',
                        backgroundColor: '#007bff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>Submit</button>
                    <button type="button" onClick={handleAdvancedAction} style={{
                        padding: '10px 15px',
                        color: 'white',
                        backgroundColor: '#dc3545',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>Advanced Action</button>
                </div>
            </form>
        </div>
    );
}


export default ModifyPage;