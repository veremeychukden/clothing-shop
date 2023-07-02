import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resp = await signInAuthUserWithEmailAndPassword( email, password);
      console.log(resp);
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
    <div className="sign-in-container">
    <h2>Already have an account?</h2>
    <span>Sign in</span>
    <form onSubmit={handleSubmit}>
      <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

      <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

      <div className="buttons-container">
        <Button type="submit">Sign in</Button>
        <Button type="button" onClick={signInWithGoogle} buttonType="google">
        Google Sign in
        </Button>
      </div>
    </form>
  </div>
  )
}

export default SignInForm;