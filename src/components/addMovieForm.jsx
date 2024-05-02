import { useState } from "react";
import "../styles/addMovieForm.css";

const AddMovieForm = () => {

    const [formValues, setFormValues] = useState({
        movieName: "",
        date: "",
        actor: "",
        actress: "",
        rating: 1
    });
    
    const inputFields = [
        { type: "text", id: "movie", required: true, name: "movie", labelName: "Movie Name", placeholder: "Enter Movie Name", focused: false, value: "", pattern: "^[A-Za-z0-9]{3,16}$" },
        { type: "date", id: "releaseDate", required: true, name: "releaseDate", labelName: "Release Date", placeholder: "Release Date", focused: false, value: "", },
        { type: "text", id: "actor", required: true, name: "actor", labelName: "Actor", placeholder: "Enter Actor", value: "", focused: false, pattern: "^^[A-Za-z0-9]{3,16}$" },
        { type: "text", id: "actress", required: true, name: "actress", labelName: "Actress", placeholder: "Enter Actress", value: "", focused: false, pattern: "^^[A-Za-z0-9]{3,16}$" },
        { type: "select", id: "rating", required: true, name: "rating", labelName: "Rating", options: ["1", "2", "3", "4", "5"], focused: false, value: 1 }
    ];

    const submitForm = (e) => {
        e.preventDefault();
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
                                <select required  >
                                    {field.options.map((option, index) => {
                                        return <option key={index} value={option}>{option}</option>;
                                    }
                                    )}
                                </select>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <label htmlFor={field.labelName}>{field.labelName}</label>
                                <input type={field.type} id={field.id} value={field.value} placeholder={field.placeholder} name={field.name} pattern={field.pattern} />
                                <span>{field.errMsg}</span>
                            </div>
                        );
                    }
                })}

                <button className={"button"} type="submit" >SIGN UP</button>
            </form>
            <pre>{JSON.stringify(inputFields)}</pre>
        </>
    );
};

export default AddMovieForm;