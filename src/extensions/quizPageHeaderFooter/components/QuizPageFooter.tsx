import * as React from "react";
import type { IFooterProps } from "./IFooterProps";
export default class QuizPageFooter extends React.Component<IFooterProps, {}> {
  public render(): React.ReactElement<IFooterProps> {
    return (
      <div className="container-fluid">
        <div className="col-12"></div>
      </div>
    );
  }
}
