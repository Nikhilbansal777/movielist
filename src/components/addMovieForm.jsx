import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/addMovieForm.css';

const AddMovieForm = ({ setMovies, movies }) => {
    const navigate = useNavigate();
    const [formValues, setFormValue] = useState({
        movieName: "",
        releaseDate: "",
        actor: "",
        actress: "",
        category: "",
        rating: "",
    });

    const [inputFields, setInputFields] = useState(
        [
            { type: "text", name: "movieName", placeholder: "Movie Name", fieldName: "movieName", label: "Movie Name" },
            { type: "date", name: "releaseDate", placeholder: "Release Date", fieldName: "releaseDate", label: "Release Dat" },
            { type: "text", name: "actor", placeholder: "Actor", fieldName: "actor", label: "Actor" },
            { type: "text", name: "actress", placeholder: "Actress", fieldName: "actress", label: "Actress" },
            { type: "select", name: "rating", placeholder: "Rating", fieldName: "rating", label: "Rating", options: [1, 2, 3, 4, 5] },
            { type: "select", name: "category", placeholder: "Category", fieldName: "category", label: "Category", options: ["Rom Com", "Thriller", "Suspense", "Fiction", "Drama", "Comedy", "Action", "Science Fiction",] },
        ]);

    const [formErrors, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const errors = validateFields({ ...formValues, [e.target.name]: e.target.value });
        setFormValue({ ...formValues, [e.target.name]: e.target.value });
        // Check if the input value is truthy (i.e., not empty)
        if (errors[e.target.name] && e.target.value.trim() !== "") {
            setFormError({ ...formErrors, [e.target.name]: "" });
        }
    };

    const handleBlur = (e) => {
        const errors = validateFields(formValues);
        // setFormError({ ...formErrors, [e.target.name]: errors[e.target.name] });
        if (formValues[e.target.name] && !errors[e.target.name]) {
            setFormError({ ...formErrors, [e.target.name]: "" });
        } else {
            setFormError({ ...formErrors, [e.target.name]: errors[e.target.name] });
        }
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) { // if formerror object is empty means all input are correct
            axios.post("http://localhost:5000/api/moviesListAdd", formValues).then((res) => {
                console.log(res);
                setMovies((previous) => [...previous, formValues]);
                navigate("/");
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [formErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(validateFields(formValues));
        setIsSubmit(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
    };

    const validateFields = (values) => {
        // if input is correct than error onbject set to formError will be empty otherwise error obejct will get a key
        const errors = {};
        const textRegex = /^[A-Za-z0-9]{3,16}$/;
        if (!values.actor) {
            errors['actor'] = "Actor is required";
        } else if (!textRegex.test(values.actor)) {
            errors['actor'] = "Actor name must be between 3 and 16 characters.";
        }
        if (!values.movieName) {
            errors['movieName'] = "Movie Name is required";
        }
        else if (!textRegex.test(values.movieName)) {
            errors['movieName'] = "Movie name must be between 3 and 16 characters.";
        }
        if (!values.releaseDate) {
            errors['releaseDate'] = "Release Date is required";
        } else if (values.releaseDate) {
            const enteredDate = new Date(values.releaseDate);
            const today = new Date();
            console.log(formatDate(enteredDate), formatDate(today));
            if (formatDate(enteredDate) > formatDate(today)) {
                errors['releaseDate'] = "Please enter a date from past";
            }
        }
        if (!values.actress) {
            errors['actress'] = "Actress is required";
        } else if (!textRegex.test(values.actress)) {
            errors['actress'] = "Actress name must be between 3 and 16 characters.";
        }
        if (!values.rating) {
            errors['rating'] = "Rating is required";
        }
        if (!values.category) {
            errors['category'] = "Category is required";
        }
        return errors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add/Edit a Movie</h1>
            {inputFields.map((field, index) => {
                if (field.type == "select") {
                    return (
                        <React.Fragment key={index}>
                            <div className="field" >
                                <label>{field.label}</label>
                                <select name={field.name} onChange={handleChange} onBlur={handleBlur} value={formValues[field.fieldName]}>
                                    <option value="">Choose option</option>
                                    {field.options.map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                    )}
                                </select>
                            </div>
                            <p>{formErrors[field.fieldName]}</p>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment key={index}>
                            <div className="field" key={index}>
                                <label>{field.label}</label>
                                <input type={field.type} name={field.name} placeholder={field.placeholder} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <p>{formErrors[field.fieldName]}</p>
                        </React.Fragment>
                    );
                }
            })}
            <button className="button" type="submit">Submit</button>
        </form >
    );
};

export default AddMovieForm;