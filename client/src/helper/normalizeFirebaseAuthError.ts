interface NormalizeFirebaseAuthErrorParams {
  code: string;
  message: string;
}

const normalizeFirebaseAuthError = (
  error: NormalizeFirebaseAuthErrorParams
) => {
  let errorCode = error.code;
  let errorMessage = error.message;

  switch (errorCode) {
    case 'auth/user-not-found':
      errorMessage = 'The email address you entered is not registered.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'The password you entered is incorrect.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Too many request, please try again later.';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'Your email already use, use another email';
      break;
    default:
      errorMessage = 'An error occurred. Please try again later.';
      break;
  }

  return errorMessage;
};

export default normalizeFirebaseAuthError;
