import { DEFAULT_ERROR_MSG } from "../constants/staticMessages";

export const parseErrorMessage = (errorMessage: unknown) => {
  if (errorMessage instanceof Error) {
    return errorMessage.message;
  }

  return DEFAULT_ERROR_MSG;
};

export const parseValidationError = (
  errorMessage: unknown,
  validationError: unknown
) => {
  const message = errorMessage
    ? parseErrorMessage(errorMessage)
    : (validationError as string);

  return message || DEFAULT_ERROR_MSG;
};
