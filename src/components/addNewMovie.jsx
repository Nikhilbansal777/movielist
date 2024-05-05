import { useState } from "react";
import "../styles/addMovieForm.css";

const AddMovie = () => {
    const [inputFields, setFormData] = useState([
        { type: "text", id: "movie", required: true, name: "movie", labelName: "Movie Name", placeholder: "Enter Movie Name", focused: false, value: "", errMsg: "Movie name must be between 3 and 16 characters.", pattern: "^[A-Za-z0-9]{3,16}$" },
        { type: "date", id: "releaseDate", required: true, name: "releaseDate", labelName: "Release Date", placeholder: "Release Date", focused: false, value: "", errMsg: "Please enter a date from past." },
        { type: "text", id: "actor", required: true, name: "actor", labelName: "Actor", placeholder: "Enter Actor", value: "", focused: false, errMsg: "Actor name must be between 3 and 16 characters.", pattern: "^[A-Za-z0-9]{3,16}$" },
        { type: "text", id: "actress", required: true, name: "actress", labelName: "Actress", placeholder: "Enter Actress", value: "", focused: false, errMsg: "Actress name must be between 3 and 16 characters.", pattern: "^[A-Za-z0-9]{3,16}$" },
        { type: "select", id: "rating", required: true, name: "rating", labelName: "Rating", options: ["1", "2", "3", "4", "5"], focused: false, value: 1 }
    ]);

    const changeInputField = (e, index) => {
        setFormData(prevState => {
            const newFields = [...prevState];
            newFields[index] = { ...newFields[index], value: e.target.value };
            console.log(e.target.value);
            console.log(newFields[index]);
            return newFields;
        });
        console.log(inputFields);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(inputFields);
        const data = new FormData(e.target);
        console.log(Object.fromEntries(data.entries()));
        const formValues = Object.fromEntries(data.entries());

        inputFields.map((field, index) => {
            if (field.value === "") {

            }
        });
    };

    const disableButton = () => {
        return inputFields.some(field => field.value === "");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
    };

    const handleFocus = (e, index) => {
        setFormData(prevState => {
            const newFields = [...prevState];
            if (newFields[index].type === 'date') {
                console.log("hi");
                const enteredDate = new Date(e.target.value);
                const today = new Date();
                console.log(formatDate(enteredDate), formatDate(today));
                if (formatDate(enteredDate) > formatDate(today)) {
                    newFields[index] = { ...newFields[index], focused: true, errMsg: "Please enter a date from past" };
                }
                return newFields;
            } else {
                newFields[index] = { ...newFields[index], focused: true };
            }
            return newFields;
        });
    };


    return (
        <>
            <form onSubmit={submitForm}>
                <h1>Add Movie</h1>
                {inputFields.map((field, index) => {
                    if (field.type == "select") {
                        return (
                            <div key={index}>
                                <label htmlFor={field.labelName}>{field.labelName}</label>
                                <select required name={field.name} onChange={(e) => changeInputField(e, index)} value={field.value}>
                                    {field.options.map((option, index) => {
                                        return <option key={index} value={option}>{option}</option>;
                                    }
                                    )}
                                </select>
                            </div>
                        );
                    } else {
                        return (
                            <>
                                <div key={index}>
                                    <label htmlFor={field.labelName}>{field.labelName}</label>
                                    <input type={field.type} id={field.id} value={field.value} focused={field.focused.toString()} onBlur={(e) => handleFocus(e, index)} required onChange={(e) => changeInputField(e, index)} placeholder={field.placeholder} name={field.name} pattern={field.pattern} />
                                    <span>{field.errMsg}</span>
                                </div>
                            </>
                        );
                    }
                })}
                <button className={"button"} type="submit" >SIGN UP</button>
            </form>
            <pre>{JSON.stringify(inputFields)}</pre>
        </>
    );
};

export default AddMovie;