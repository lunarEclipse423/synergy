const ERROR_EMPTY_FIELD = "All fields required";
const ERROR_NEGATIVE_AGE = "Age cannot be negative";

type userInputType = {
  userFirstName: string;
  userLastName: string;
  userAge: number;
  userEmail: string;
};

export const validateUserInput = (userInput: userInputType): string | null => {
  for (let key in userInput) {
    if (userInput[key as keyof userInputType].toString() === "") {
      return ERROR_EMPTY_FIELD;
    }
  }

  if (userInput.userAge < 0) {
    return ERROR_NEGATIVE_AGE;
  }

  return null;
};
