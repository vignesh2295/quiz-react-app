import * as React from "react";
import type { IQuizAppProps } from "./IQuizAppProps";
import type { IQuizAppState, IQuizQuestion } from "./IQuizAppState";
import {
  TextField,
  DatePicker,
  DayOfWeek,
  defaultDatePickerStrings,
  ChoiceGroup,
  IChoiceGroupOption,
  ComboBox,
  IComboBox,
  IComboBoxOption,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import Swal from "sweetalert2";
import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import CRUDOperation from "./CRUDOperation";
import { country_arr, s_a } from "./countries";
require("../components/loader.css");
require("../components/countries");

export default class QuizApp extends React.Component<
  IQuizAppProps,
  IQuizAppState
> {
  constructor(props: IQuizAppProps) {
    super(props);
    SPComponentLoader.loadCss(
      `${unescape(
        this.props.siteUrl
      )}/SiteAssets/QuizApp%20Assets/css/customStyles.css`
    );
    this.state = {
      //fields
      responseSubmitted: false,
      responseID: 0,
      isError: false,
      firstNameError: false,
      lastNameError: false,
      emailIdError: false,
      mobileNumberError: false,
      dateOfBirthError: false,
      addressLine1Error: false,
      cityError: false,
      stateError: false,
      countryError: false,
      pincodeError: false,
      genderError: false,
      firstName: "",
      lastName: "",
      emailId: "",
      mobileNumber: null,
      age: 0,
      dateOfBirth: undefined,
      addressLine1: "",
      city: "",
      state: undefined,
      country: undefined,
      pincode: null,
      gender: undefined,
      hobbiesSelected: [],
      genderOptions: [],
      hobbiesOptions: [],
      quizQuestionsGroup: [],
    };
  }
  public render(): React.ReactElement<IQuizAppProps> {
    const {
      firstName,
      lastName,
      emailId,
      mobileNumber,
      age,
      dateOfBirth,
      addressLine1,
      city,
      state,
      country,
      pincode,
      gender,
      hobbiesSelected,
      genderOptions,
      hobbiesOptions,
      quizQuestionsGroup,
      isError,
      firstNameError,
      lastNameError,
      emailIdError,
      mobileNumberError,
      dateOfBirthError,
      addressLine1Error,
      cityError,
      stateError,
      countryError,
      pincodeError,
      genderError,
      responseSubmitted,
    } = this.state;

    const questElements: JSX.Element[] = quizQuestionsGroup.map(
      (quest: IQuizQuestion) => {
        return (
          <div className="form-group row">
            <label className="col-12 col-form-label">
              {quest.QuestionNumber}. {quest.Question}
              <span className="mandatory-fields">*</span>
            </label>
            <div className="col-12 quiz-choices quest-choices">
              <ChoiceGroup
                options={quest.QuestionChoices}
                readOnly={responseSubmitted}
                selectedKey={quest.selectedAnswer}
                onChange={(event, selectedOption: IChoiceGroupOption) => {
                  if (selectedOption) {
                    const newQuestArray = quizQuestionsGroup.map((t) => {
                      return t.QuestionNumber === quest.QuestionNumber
                        ? {
                            ...t,
                            selectedAnswer: selectedOption.key,
                            isValid: true,
                          }
                        : t;
                    });
                    this.setState({
                      quizQuestionsGroup: newQuestArray,
                      genderError: false,
                    });
                  }
                }}
              />
              {responseSubmitted && (
                <p className="correctAnswer">
                  Correct answer is : {quest.CorrectAnswer}
                </p>
              )}
              {isError && !quest.isValid && (
                <p className="error-message">Please select the response</p>
              )}
            </div>
          </div>
        );
      }
    );
    const countryOptionsArray: IComboBoxOption[] = country_arr.map((c, i) => {
      return { key: i, text: c };
    });
    const stateOptionsArray: IComboBoxOption[] = country
      ? s_a[(country.key as number) + 1].split("|").map((s: string) => {
          return { key: s, text: s };
        })
      : [];
    return (
      <section id="QuizAppForm" className="my-4">
        <div className="container">
          <div className="card">
            <div className="card-header">QUIZ Form</div>
            <div className="card-body">
              <div className="col-12">
                <nav>
                  <div
                    className="nav nav-tabs nav-fill"
                    id="nav-tab"
                    role="tablist"
                  >
                    <a
                      className="nav-item nav-link active"
                      id="nav-BasicInfo-tab"
                      data-toggle="tab"
                      href="#nav-BasicInfo"
                      role="tab"
                      aria-controls="nav-BasicInfo"
                      aria-selected="true"
                      style={{ borderTopLeftRadius: "15px" }}
                    >
                      Personal Details
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-Question-tab"
                      data-toggle="tab"
                      href="#nav-Question"
                      role="tab"
                      aria-controls="nav-Question"
                      aria-selected="false"
                      style={{ borderTopRightRadius: "15px" }}
                    >
                      Quiz Questions
                    </a>
                  </div>
                </nav>
                <div
                  className="tab-content py-3 px-3 px-sm-0 rounded-bottom"
                  id="nav-tabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="nav-BasicInfo"
                    role="tabpanel"
                    aria-labelledby="nav-BasicInfo-tab"
                  >
                    <div
                      id="personalInfoForm"
                      className="col-lg-12 col-md-12 col-sm-12 title"
                    >
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              First Name
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <TextField
                                value={firstName}
                                readOnly={responseSubmitted}
                                onChange={(event, value) => {
                                  if (value?.trim()) {
                                    this.setState({
                                      firstName: value,
                                      firstNameError: false,
                                    });
                                  } else {
                                    this.setState({
                                      firstName: "",
                                      firstNameError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && firstNameError && (
                                <p className="error-message">
                                  Firt Name is mandatory
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Last Name
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <TextField
                                value={lastName}
                                readOnly={responseSubmitted}
                                onChange={(event, value) => {
                                  if (value?.trim()) {
                                    this.setState({
                                      lastName: value,
                                      lastNameError: false,
                                    });
                                  } else {
                                    this.setState({
                                      lastName: "",
                                      lastNameError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && lastNameError && (
                                <p className="error-message">
                                  Last Name is mandatory
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Email ID
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <TextField
                                value={emailId}
                                readOnly={responseSubmitted}
                                onChange={(event, value) => {
                                  if (value?.trim()) {
                                    this.setState({
                                      emailId: value,
                                      emailIdError: false,
                                    });
                                  } else {
                                    this.setState({
                                      emailId: "",
                                      emailIdError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && emailIdError && (
                                <p className="error-message">
                                  Please enter a valid Email Address
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Mobile Number
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <TextField
                                type="number"
                                readOnly={responseSubmitted}
                                value={mobileNumber?.toString()}
                                onChange={(event, value) => {
                                  if (value?.trim()) {
                                    this.setState({
                                      mobileNumber: parseInt(value),
                                      mobileNumberError: false,
                                    });
                                  } else {
                                    this.setState({
                                      mobileNumber: null,
                                      mobileNumberError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && mobileNumberError && (
                                <p className="error-message">
                                  Please enter a valid Mobile Number.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Date of Birth
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <DatePicker
                                disabled={responseSubmitted}
                                firstDayOfWeek={DayOfWeek.Sunday}
                                value={dateOfBirth}
                                placeholder="Select a date..."
                                ariaLabel="Select a date"
                                maxDate={new Date()}
                                onSelectDate={(selectedDate) => {
                                  if (selectedDate) {
                                    const age =
                                      new Date().getFullYear() -
                                      selectedDate.getFullYear();
                                    this.setState({
                                      dateOfBirth: selectedDate,
                                      age,
                                      dateOfBirthError: false,
                                    });
                                  } else {
                                    this.setState({
                                      dateOfBirth: undefined,
                                      age: 0,
                                      dateOfBirthError: true,
                                    });
                                  }
                                }}
                                strings={defaultDatePickerStrings}
                              />
                              {isError && dateOfBirthError && (
                                <p className="error-message">
                                  Date of Birth is a mandatory field
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Age
                            </label>
                            <div className="col-sm-7">
                              <TextField readOnly value={age?.toString()} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Gender <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7 quiz-choices">
                              <ChoiceGroup
                                readOnly={responseSubmitted}
                                options={genderOptions}
                                selectedKey={gender}
                                onChange={(
                                  event,
                                  selectedOption: IChoiceGroupOption
                                ) => {
                                  if (selectedOption) {
                                    this.setState({
                                      gender: selectedOption.key,
                                      genderError: false,
                                    });
                                  } else {
                                    this.setState({
                                      gender: "",
                                      genderError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && genderError && (
                                <p className="error-message">
                                  Gender is a mandatory field
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Hobbies
                            </label>
                            <div className="col-sm-7">
                              <ComboBox
                                disabled={responseSubmitted}
                                multiSelect
                                options={hobbiesOptions}
                                selectedKey={hobbiesSelected}
                                onChange={(
                                  event: React.FormEvent<IComboBox>,
                                  option?: IComboBoxOption,
                                  index?: number,
                                  value?: string
                                ): void => {
                                  const newHobbies = option?.selected
                                    ? [
                                        ...hobbiesSelected,
                                        option!.key as string,
                                      ]
                                    : hobbiesSelected.filter(
                                        (k) => k !== option!.key
                                      );
                                  this.setState({
                                    hobbiesSelected: newHobbies,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Address Line 1{" "}
                          <span className="mandatory-fields">*</span>
                        </label>
                        <div className="col-sm-9">
                          <TextField
                            readOnly={responseSubmitted}
                            multiline
                            rows={3}
                            value={addressLine1}
                            onChange={(event, value) => {
                              if (value?.trim()) {
                                this.setState({
                                  addressLine1: value,
                                  addressLine1Error: false,
                                });
                              } else {
                                this.setState({
                                  addressLine1: "",
                                  addressLine1Error: true,
                                });
                              }
                            }}
                          />
                          {isError && addressLine1Error && (
                            <p className="error-message">
                              Address is a mandatory field
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Country
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <ComboBox
                                disabled={responseSubmitted}
                                options={countryOptionsArray}
                                selectedKey={country ? country.key : undefined}
                                onChange={(
                                  event: React.FormEvent<IComboBox>,
                                  option?: IComboBoxOption,
                                  index?: number,
                                  value?: string
                                ): void => {
                                  if (option) {
                                    this.setState({
                                      country: option,
                                      countryError: false,
                                    });
                                  } else {
                                    this.setState({
                                      country: undefined,
                                      countryError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && countryError && (
                                <p className="error-message">
                                  Country is a mandatory field
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              State
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <ComboBox
                                disabled={responseSubmitted}
                                options={stateOptionsArray}
                                selectedKey={state ? state.key : undefined}
                                onChange={(
                                  event: React.FormEvent<IComboBox>,
                                  option?: IComboBoxOption,
                                  index?: number,
                                  value?: string
                                ): void => {
                                  if (option) {
                                    this.setState({
                                      state: option,
                                      stateError: false,
                                    });
                                  } else {
                                    this.setState({
                                      state: undefined,
                                      stateError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && stateError && (
                                <p className="error-message">
                                  State is a mandatory field
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              City
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <TextField
                                readOnly={responseSubmitted}
                                value={city}
                                onChange={(event, value) => {
                                  if (value?.trim()) {
                                    this.setState({
                                      city: value,
                                      cityError: false,
                                    });
                                  } else {
                                    this.setState({
                                      city: "",
                                      cityError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && cityError && (
                                <p className="error-message">
                                  City is a mandatory field
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-5 col-form-label">
                              Pincode
                              <span className="mandatory-fields">*</span>
                            </label>
                            <div className="col-sm-7">
                              <TextField
                                readOnly={responseSubmitted}
                                type="number"
                                value={pincode?.toString()}
                                onChange={(event, value) => {
                                  if (value?.trim()) {
                                    this.setState({
                                      pincode: parseInt(value),
                                      pincodeError: false,
                                    });
                                  } else {
                                    this.setState({
                                      pincode: null,
                                      pincodeError: true,
                                    });
                                  }
                                }}
                              />
                              {isError && pincodeError && (
                                <p className="error-message">
                                  Please enter a valid Pincode.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="personalInfoFormLoader"
                      style={{ display: "none" }}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="loader12">
                            <div className="loader-inner-1 box-1 box-red"></div>
                            <div className="loader-inner-2 box-2 box-pink"></div>
                            <div className="loader-inner-1 box-3 box-blue"></div>
                            <div className="loader-inner-2 box-4 box-yellow"></div>
                            <div className="loader-inner-1 box-5 box-peach"></div>
                            <div className="loader-inner-2 box-6 box-pink"></div>
                            <div className="loader-inner-1 box-7 box-green"></div>
                            <div className="loader-inner-2 box-8 box-purple"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-Question"
                    role="tabpanel"
                    aria-labelledby="nav-Question-tab"
                  >
                    <div
                      id="quizQuestForm"
                      className="col-lg-12 col-md-12 col-sm-12 title"
                    >
                      {quizQuestionsGroup.length > 0 && questElements}
                      <div id="submitButtonDiv" className="row my-3">
                        <div
                          className="col-md-12"
                          style={
                            responseSubmitted
                              ? { display: "none" }
                              : { display: "block" }
                          }
                        >
                          <PrimaryButton
                            text="Submit"
                            className="submit-button mx-2"
                            onClick={() => {
                              this.submitResponse();
                            }}
                            allowDisabledFocus
                          />
                          <DefaultButton
                            text="Cancel"
                            className="cancel-button mx-2"
                            onClick={() => {
                              this.clearResponse();
                            }}
                            allowDisabledFocus
                          />
                        </div>
                        <div
                          className="col-md-12"
                          style={
                            responseSubmitted
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <PrimaryButton
                            text="Submit Feedback"
                            className="submit-button mx-2"
                            onClick={() => {
                              console.log("Feedback");
                            }}
                            allowDisabledFocus
                          />
                        </div>
                      </div>
                    </div>
                    <div id="quizQuestFormLoader" style={{ display: "none" }}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="loader12">
                            <div className="loader-inner-1 box-1 box-red"></div>
                            <div className="loader-inner-2 box-2 box-pink"></div>
                            <div className="loader-inner-1 box-3 box-blue"></div>
                            <div className="loader-inner-2 box-4 box-yellow"></div>
                            <div className="loader-inner-1 box-5 box-peach"></div>
                            <div className="loader-inner-2 box-6 box-pink"></div>
                            <div className="loader-inner-1 box-7 box-green"></div>
                            <div className="loader-inner-2 box-8 box-purple"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  public componentDidMount(): void {
    this.getChoices();
  }
  private getChoices(): void {
    $("#personalInfoForm").hide();
    $("#personalInfoFormLoader").show();
    try {
      const { siteUrl, quizResponseList, quizQuestionsList, spHttpClient } =
        this.props;
      const crudOperation: CRUDOperation = new CRUDOperation();
      crudOperation._targetURL = `${unescape(
        siteUrl
      )}/_api/web/lists/getbytitle('${quizResponseList}')/fields/getbytitle('Gender')?$select=Choices`;
      crudOperation._spHttpClient = spHttpClient;
      crudOperation.getItems().then((genderData): void => {
        if (genderData.status) {
          const spGenderOptions = genderData.data.map((gender: string) => {
            return { key: gender, text: gender };
          });
          crudOperation._targetURL = `${unescape(
            siteUrl
          )}/_api/web/lists/getbytitle('${quizResponseList}')/fields/getbytitle('Hobbies')?$select=Choices`;
          crudOperation._spHttpClient = spHttpClient;
          crudOperation.getItems().then((hobbiesData) => {
            if (hobbiesData.status) {
              const spHobbiesOptions = hobbiesData.data.map((hobby: string) => {
                return { key: hobby, text: hobby };
              });

              crudOperation._targetURL = `${unescape(
                siteUrl
              )}/_api/web/lists/getbytitle('${quizQuestionsList}')/items?$select=Title,Question,QuizChoices,CorrectAnswer`;
              crudOperation._spHttpClient = spHttpClient;
              crudOperation.getItems().then((quizQuestionsItems) => {
                if (quizQuestionsItems.status) {
                  const questionArray: IQuizQuestion[] =
                    quizQuestionsItems.data.map((singleQuest: any) => {
                      return {
                        QuestionNumber: singleQuest.Title,
                        Question: singleQuest.Question,
                        QuestionChoices: singleQuest.QuizChoices.split(
                          "###"
                        ).map((x: string) => {
                          return { key: x, text: x };
                        }),
                        selectedAnswer: undefined,
                        CorrectAnswer: singleQuest.CorrectAnswer,
                        isValid: false,
                      };
                    });
                  $("#personalInfoForm").show();
                  $("#personalInfoFormLoader").hide();
                  this.setState({
                    genderOptions: spGenderOptions,
                    hobbiesOptions: spHobbiesOptions,
                    quizQuestionsGroup: questionArray,
                  });
                }
              });
            }
          });
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please contact the administrator.",
      }).then(() => {
        $("#personalInfoForm").show();
        $("#personalInfoFormLoader").hide();
      });
    }
  }
  private submitResponse(): void {
    $("#quizQuestForm").hide();
    $("#quizQuestFormLoader").show();
    const { quizResponseList } = this.props;
    const {
      firstName,
      lastName,
      emailId,
      mobileNumber,
      age,
      dateOfBirth,
      addressLine1,
      city,
      state,
      country,
      pincode,
      gender,
      hobbiesSelected,
      quizQuestionsGroup,
    } = this.state;
    try {
      const validationObj: any = this.validateResponses();
      if (
        !(
          validationObj.isError ||
          validationObj.firstNameError ||
          validationObj.lastNameError ||
          validationObj.mailIdError ||
          validationObj.mobileNumberError ||
          validationObj.dateOfBirthError ||
          validationObj.addressLine1Error ||
          validationObj.cityError ||
          validationObj.stateError ||
          validationObj.countryError ||
          validationObj.pincodeError ||
          validationObj.genderError
        )
      ) {
        let crudOperation: CRUDOperation = new CRUDOperation();
        crudOperation._spHttpClient = this.props.spHttpClient;
        let questCurrResponse = quizQuestionsGroup.map(
          (currQuest: IQuizQuestion) => {
            return {
              questNo: currQuest.QuestionNumber,
              question: currQuest.Question,
              questResponse: currQuest.selectedAnswer,
            };
          }
        );
        let newItemObj = {
          __metadata: { type: "SP.Data.QuizResponsesListItem" },
          Title: firstName,
          LastName: lastName,
          EmailID: emailId,
          MobileNumber: mobileNumber,
          Age: age,
          DateOfBirth: dateOfBirth,
          AddressLine1: addressLine1,
          City: city,
          State: state ? state.text : "",
          Country: country ? country.text : "",
          Pincode: pincode,
          Gender: gender,
          Hobbies: {
            results: [...hobbiesSelected],
          },
          QuizResponses: JSON.stringify(questCurrResponse),
        };

        crudOperation._targetURL = `${unescape(
          this.props.siteUrl
        )}/_api/web/lists/GetByTitle('${quizResponseList}')/items`;
        crudOperation._dataBody = JSON.stringify(newItemObj);
        crudOperation.createItem().then((statusObject: any) => {
          if (statusObject.status) {
            $("#quizQuestForm").show();
            $("#quizQuestFormLoader").hide();
            Swal.fire(
              "Success!",
              `Your response saved successfully!`,
              "success"
            ).then(() => {
              this.setState({
                responseSubmitted: true,
                responseID: statusObject.data.d.Id,
              });
            });
          } else {
            $("#quizQuestForm").show();
            $("#quizQuestFormLoader").hide();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! Please contact the administrator.",
            }).then(() => {
              console.log("Test");
            });
          }
        });
      } else {
        $("#quizQuestForm").show();
        $("#quizQuestFormLoader").hide();
        this.setState({
          isError: !validationObj.isValid,
          firstNameError: validationObj.firstNameError,
          lastNameError: validationObj.lastNameError,
          emailIdError: validationObj.emailIdError,
          mobileNumberError: validationObj.mobileNumberError,
          dateOfBirthError: validationObj.dateOfBirthError,
          addressLine1Error: validationObj.addressLine1Error,
          cityError: validationObj.cityError,
          stateError: validationObj.stateError,
          countryError: validationObj.countryError,
          pincodeError: validationObj.pincodeError,
          genderError: validationObj.genderError,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please contact the administrator.",
      }).then(() => {
        $("#quizQuestForm").show();
        $("#quizQuestFormLoader").hide();
      });
    }
  }
  private validateResponses(): any {
    const {
      firstName,
      lastName,
      emailId,
      mobileNumber,
      dateOfBirth,
      addressLine1,
      city,
      state,
      country,
      pincode,
      gender,
    } = this.state;
    const validateEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    try {
      const inValidQuestResponse = this.state.quizQuestionsGroup.filter(
        (x) => !x.isValid
      );
      return {
        isError: inValidQuestResponse.length !== 0,
        firstNameError: !firstName.trim() ? true : false,
        lastNameError: !lastName.trim() ? true : false,
        emailIdError: !emailId.match(validateEmail),
        mobileNumberError: !mobileNumber ? true : false,
        dateOfBirthError: !dateOfBirth ? true : false,
        addressLine1Error: !addressLine1 ? true : false,
        cityError: !city ? true : false,
        stateError: !state ? true : false,
        countryError: !country ? true : false,
        pincodeError: !pincode ? true : false,
        genderError: !gender ? true : false,
      };
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please contact the administrator.",
      }).then(() => {
        $("#quizQuestForm").show();
        $("#quizQuestFormLoader").hide();
      });
    }
  }
  private clearResponse(): void {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to clear responses!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.setState({
          //fields
          isError: false,
          firstNameError: false,
          lastNameError: false,
          emailIdError: false,
          mobileNumberError: false,
          dateOfBirthError: false,
          addressLine1Error: false,
          cityError: false,
          stateError: false,
          countryError: false,
          pincodeError: false,
          genderError: false,
          firstName: "",
          lastName: "",
          emailId: "",
          mobileNumber: null,
          age: 0,
          dateOfBirth: undefined,
          addressLine1: "",
          city: "",
          state: undefined,
          country: undefined,
          pincode: null,
          gender: undefined,
          hobbiesSelected: [],
          genderOptions: [],
          hobbiesOptions: [],
          quizQuestionsGroup: [],
        });
      }
    });
  }
}
