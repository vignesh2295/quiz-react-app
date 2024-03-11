import { IChoiceGroupOption, IComboBoxOption } from "@fluentui/react";
export interface IQuizQuestion {
  QuestionNumber: number;
  Question: string;
  QuestionChoices: IChoiceGroupOption[];
  selectedAnswer: string | undefined;
  CorrectAnswer: string;
  isValid: boolean;
}
export interface IQuizAppState {
  responseSubmitted: boolean;
  responseID: number;
  isError: boolean;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: number | null;
  age: number;
  dateOfBirth: Date | undefined;
  addressLine1: string;
  city: string;
  state: IComboBoxOption | undefined;
  country: IComboBoxOption | undefined;
  pincode: number | null;
  gender: string | undefined;
  hobbiesSelected: string[];
  firstNameError: boolean;
  lastNameError: boolean;
  emailIdError: boolean;
  mobileNumberError: boolean;
  dateOfBirthError: boolean;
  addressLine1Error: boolean;
  cityError: boolean;
  stateError: boolean;
  countryError: boolean;
  pincodeError: boolean;
  genderError: boolean;
  genderOptions: IChoiceGroupOption[];
  hobbiesOptions: IComboBoxOption[];
  //QuizQuestions
  quizQuestionsGroup: IQuizQuestion[];
}
