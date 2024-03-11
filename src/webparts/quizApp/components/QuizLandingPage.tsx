import * as React from "react";
import type { IQuizLandingProps } from "./IQuizAppProps";
import { SPComponentLoader } from "@microsoft/sp-loader";

export default class QuizLanding extends React.Component<
  IQuizLandingProps,
  {}
> {
  constructor(props: IQuizLandingProps) {
    super(props);
    SPComponentLoader.loadCss(
      `${unescape(
        this.props.siteUrl
      )}/SiteAssets/QuizApp%20Assets/css/customStyles.css`
    );
  }
  public render(): React.ReactElement<IQuizLandingProps> {
    return (
      <section className="bgimage">
        <div className="container-fluid" style={{ height: "inherit" }}>
          <div className="hero-section">
            <h5>Welcome to QUIZ Master</h5>
            <p>
              The ultimate trivia app that will test your knowledge across a
              wide range of categories! Whether you're a history buff, a science
              enthusiast, a pop culture connoisseur, or just love random facts,
              QuizMaster has something for everyone.
            </p>
            <p>
              <a
                href="#"
                className="btn btn-primary btn-large"
                onClick={() => {
                  this.props.onQuizEnter();
                }}
              >
                Enter Quiz »
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
