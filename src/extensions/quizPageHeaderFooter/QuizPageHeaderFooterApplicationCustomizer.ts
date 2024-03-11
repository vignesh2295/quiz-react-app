import { Log } from "@microsoft/sp-core-library";
import * as React from "react";
import * as ReactDom from "react-dom";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import QuizPageHeader from "./components/QuizPageHeader";
import { IHeaderProps } from "./components/IHeaderProps";
import QuizPageFooter from "./components/QuizPageFooter";
import { IFooterProps } from "./components/IFooterProps";
import * as strings from "QuizPageHeaderFooterApplicationCustomizerStrings";
import "bootstrap/dist/css/bootstrap.css";
require("../../../node_modules/bootstrap/dist/js/bootstrap.min.js");
const LOG_SOURCE: string = "QuizPageHeaderFooterApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IQuizPageHeaderFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class QuizPageHeaderFooterApplicationCustomizer extends BaseApplicationCustomizer<IQuizPageHeaderFooterApplicationCustomizerProperties> {
  private _topPlaceholderHeader: PlaceholderContent | undefined;
  private _bottomPlaceholderFooter: PlaceholderContent | undefined;
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    const currentPage = window.location.href;
    const checkHomeURL = currentPage
      .split("?")[0]
      .replace(this.context.pageContext.web.absoluteUrl, "");
    if (
      currentPage.indexOf("Quiz%20App.aspx") > -1 ||
      checkHomeURL === "" ||
      checkHomeURL === "/"
    ) {
      this.context.placeholderProvider.changedEvent.add(
        this,
        this._renderPlaceHoldersHeaderandFooter
      );
      //Added the below line code to handle the possible changes on the existence of placeholders.
      this.context.placeholderProvider.changedEvent.add(
        this,
        this._renderPlaceHoldersHeaderandFooter
      );
      //The below code is used to call render method for generating the HTML elements.
      this._renderPlaceHoldersHeaderandFooter();
    }
    return Promise.resolve();
  }

  private _renderPlaceHoldersHeaderandFooter(): void {
    // if (window.location.href.indexOf("env=WebViewList") === -1) {
    //   window.location.href =
    //     window.location.href.indexOf("?") === -1
    //       ? `${window.location.href}?env=WebViewList`
    //       : `${window.location.href}&env=WebViewList`;
    // }
    if (!this._topPlaceholderHeader) {
      //Adding top header section
      this._topPlaceholderHeader =
        this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
          onDispose: this._onDispose,
        });

      if (!this._topPlaceholderHeader) {
        console.error("Top placeholder was not found.");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "CustomHeader";
        }
        if (this._topPlaceholderHeader.domElement) {
          const element: React.ReactElement<IHeaderProps> = React.createElement(
            QuizPageHeader,
            {
              description: "Header Text",
              userDetails: this.context.pageContext.user,
              siteURL: this.context.pageContext.web.absoluteUrl,
            }
          );
          ReactDom.render(element, this._topPlaceholderHeader.domElement);
        }
      }
    }

    //Adding bottom footer section

    if (!this._bottomPlaceholderFooter) {
      this._bottomPlaceholderFooter =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,

          { onDispose: this._onDispose }
        );

      if (!this._bottomPlaceholderFooter) {
        console.error("Bottom placeholder was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "CustomFooter";
        }
        if (this._bottomPlaceholderFooter.domElement) {
          const element: React.ReactElement<IFooterProps> = React.createElement(
            QuizPageFooter,
            {
              description: "Footer Text",
              userDisplayName: this.context.pageContext.user.displayName,
            }
          );
          ReactDom.render(element, this._bottomPlaceholderFooter.domElement);
        }
      }
    }
  }

  private _onDispose(): void {
    console.log("Header footer disposed");
  }
}
