import { useState } from "react";
import { useDispatch } from "react-redux";

import { signUpStart } from "../../store/user/user.reducer";

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button , { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    comfirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    // console.log('hit');

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            dispatch(signUpStart({email, password, displayName}));
            resetFormFields();
            console.log('User Registered');

        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters');
            }
            console.log("user creation encountered an error",error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />

                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;

