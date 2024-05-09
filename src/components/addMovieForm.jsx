import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../App";
import '../styles/addMovieForm.css';

const AddMovieForm = ({ setMovies, movies }) => {
    const { selectedMovie, movieForEdit, flag } = useContext(context);
    console.log(flag);
    const navigate = useNavigate();
    const [formValues, setFormValue] = useState({
        movieName: "",
        releaseDate: "",
        actor: "",
        actress: "",
        director: "",
        category: "",
        rating: "",
        description: "",
    });

    useEffect(() => {
        if (selectedMovie) {
            const updatedFormValues = { ...formValues, ...selectedMovie };
            setFormValue(updatedFormValues);
        }
    }, [selectedMovie]);

    useEffect(() => {
        return (() => {
            movieForEdit({});
        });
    }, []);

    const [inputFields] = useState(
        [
            { type: "text", name: "movieName", placeholder: "Movie Name", fieldName: "movieName", label: "Movie Name" },
            { type: "date", name: "releaseDate", placeholder: "Release Date", fieldName: "releaseDate", label: "Release Date" },
            { type: "text", name: "actor", placeholder: "Actor", fieldName: "actor", label: "Actor" },
            { type: "text", name: "actress", placeholder: "Actress", fieldName: "actress", label: "Actress" },
            { type: "text", name: "director", placeholder: "Director", fieldName: "director", label: "Director" },
            { type: "select", name: "rating", placeholder: "Rating", fieldName: "rating", label: "Rating", options: [1, 2, 3, 4, 5] },
            { type: "select", name: "category", placeholder: "Category", fieldName: "category", label: "Category", options: ["Rom-com", "Thriller", "Suspense", "Fiction", "Drama", "Comedy", "Action", "Science Fiction",] },
            { type: "textarea", name: "description", placeholder: "Description", fieldName: "description", label: "Description" },
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
        if (isSubmit && Object.keys(formErrors).length === 0) { // if formerror object is empty means all input are correct
            if (flag) {
                console.log(formValues);
                console.log("inside edit operation");
                axios.patch(`http://localhost:5000/api/updateMovie/${formValues.id}`, formValues).then((res) => {
                    setMovies((previous) => [...previous, formValues]);
                    navigate("/");
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                console.log("inside add");
                axios.post("http://localhost:5000/api/moviesListAdd", formValues).then((res) => {
                    setMovies((previous) => [...previous, formValues]);
                    navigate("/");
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }, [isSubmit, formErrors]);

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
        if (!values.description) {
            errors['description'] = "Description is required";
        }
        if (!values.director) {
            errors['director'] = "Director is required";
        }
        return errors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{ flag? "Edit": "Add" } a Movie</h1>
            {inputFields.map((field, index) => {
                if (field.type === "select") {
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
                } else if (field.type === "textarea") {
                    return (
                        <React.Fragment key={index}>
                            <div className="field">
                                <label>{field.label}</label>
                                <textarea name={field.name} placeholder={field.placeholder} value={formValues[field.fieldName]} onChange={handleChange} onBlur={handleBlur}></textarea>
                            </div>
                            <p>{formErrors[field.fieldName]}</p>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment key={index}>
                            <div className="field" key={index}>
                                <label>{field.label}</label>
                                <input type={field.type} name={field.name} placeholder={field.placeholder} value={formValues[field.fieldName]} onChange={handleChange} onBlur={handleBlur} />
                            </div>
                            <p>{formErrors[field.fieldName]}</p>
                        </React.Fragment>
                    );
                }
            })}
            <button className="button" type="submit">{ flag? "Edit": "Add" }</button>
        </form >
    );
};

export default AddMovieForm;