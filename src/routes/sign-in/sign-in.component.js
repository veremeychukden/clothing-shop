import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return(
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>
        Google Sign in
      </button>
    </div>
  )
}

export default SignIn;