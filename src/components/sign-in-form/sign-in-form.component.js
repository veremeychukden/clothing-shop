import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.js";

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword( email, password);
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/wrong-password'){
        alert('Cannot sign-in, wrong password');
      } else if(error.code === 'auth/user-not-found'){
        alert('Cannot sign-in, user email not found');
      }
      else {
        console.log("Error - ", error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return(
    <SignInContainer>
    <h2>Already have an account?</h2>
    <span>Sign in</span>
    <form onSubmit={handleSubmit}>
      <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

      <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

      <ButtonsContainer>
        <Button type="submit">Sign in</Button>
        <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>
        Google Sign in
        </Button>
      </ButtonsContainer>
    </form>
  </SignInContainer>
  )
}

export default SignInForm;