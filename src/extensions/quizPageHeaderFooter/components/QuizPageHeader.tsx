import * as React from "react";
import type { IHeaderProps } from "./IHeaderProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
export default class QuizPageHeader extends React.Component<IHeaderProps, {}> {
  constructor(props: IHeaderProps) {
    super(props);
    SPComponentLoader.loadCss(
      `${unescape(
        this.props.siteURL
      )}/SiteAssets/QuizApp%20Assets/css/customStyles.css`
    );
  }
  public render(): React.ReactElement<IHeaderProps> {
    return (
      <header id="QuizAppHeader" className="py-2 border-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12 QuizAppHeaderTitle">
              <a
                href="#"
                className="d-block align-items-center mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
              >
                <img
                  src={`${this.props.siteURL}/SiteAssets/QuizApp%20Assets/images/QLogo.png`}
                  className="bi me-2"
                  width="50"
                  height="50"
                />
                <span className="ml-2">QUIZ Master</span>
              </a>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 QuizAppHeaderUser">
              <a
                href="#"
                className="d-inline-block link-body-emphasis text-decoration-none py-1"
                aria-expanded="false"
              >
                <img
                  src={`${
                    this.props.siteURL
                  }/_layouts/15/userphoto.aspx?size=L&username=${this.props.userDetails.email.toLowerCase()}`}
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <span className="w-auto mx-2 d-inline-block">{`Welcome ${this.props.userDetails.displayName}`}</span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
