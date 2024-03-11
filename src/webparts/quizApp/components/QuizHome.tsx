import * as React from "react";
import type { IQuizHomeProps } from "./IQuizAppProps";
import QuizApp from "./QuizApp";
import QuizLanding from "./QuizLandingPage";
import { SPComponentLoader } from "@microsoft/sp-loader";

export default class QuizHome extends React.Component<
  IQuizHomeProps,
  { isLandingPage: boolean }
> {
  constructor(props: IQuizHomeProps) {
    super(props);
    SPComponentLoader.loadCss(
      `${unescape(
        this.props.siteUrl
      )}/SiteAssets/QuizApp%20Assets/css/customStyles.css`
    );
    this.state = {
      isLandingPage: true,
    };
  }
  public render(): React.ReactElement<IQuizHomeProps> {
    const {
      description,
      hasTeamsContext,
      userDisplayName,
      ctx,
      spHttpClient,
      siteUrl,
      quizResponseList,
      quizQuestionsList,
      currentUser,
    } = this.props;
    return (
      <div id="appMainComponent">
        {this.state.isLandingPage ? (
          <QuizLanding
            siteUrl={siteUrl}
            currentUser={currentUser}
            onQuizEnter={() => {
              this.setState({ isLandingPage: false });
            }}
          />
        ) : (
          <QuizApp
            description={description}
            hasTeamsContext={hasTeamsContext}
            userDisplayName={userDisplayName}
            ctx={ctx}
            spHttpClient={spHttpClient}
            siteUrl={siteUrl}
            quizResponseList={quizResponseList}
            quizQuestionsList={quizQuestionsList}
            currentUser={currentUser}
            onQuizExit={() => {
              this.setState({ isLandingPage: true });
            }}
          />
        )}
      </div>
    );
  }
}
