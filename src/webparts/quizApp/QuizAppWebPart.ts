import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { PropertyPaneDropdown } from "./components/PropertyPaneDropdown";
import { IDropdownOption } from "@fluentui/react";
import { update, get } from "@microsoft/sp-lodash-subset";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import * as strings from "QuizAppWebPartStrings";
import QuizHome from "./components/QuizHome";
import { IQuizHomeProps } from "./components/IQuizAppProps";
import "bootstrap/dist/css/bootstrap.css";
export interface IQuizAppWebPartProps {
  description: string;
  quizResponseList: string;
  quizQuestionsList: string;
}

export default class QuizAppWebPart extends BaseClientSideWebPart<IQuizAppWebPartProps> {
  //private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IQuizHomeProps> = React.createElement(
      QuizHome,
      {
        description: this.properties.description,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        ctx: this.context,
        spHttpClient: this.context.spHttpClient,
        siteUrl: escape(this.context.pageContext.web.absoluteUrl),
        quizResponseList: this.properties.quizResponseList,
        quizQuestionsList: this.properties.quizQuestionsList,
        currentUser: this.context.pageContext.user,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
  private loadLists(): Promise<IDropdownOption[]> {
    const url =
      this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists?$filter=Hidden eq false`;
    return this.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse): Promise<IDropdownOption[]> => {
        return response.json();
      })
      .then((item: any): IDropdownOption[] => {
        const listsArray: IDropdownOption[] = item.value.map((list: any) => {
          return { key: list.Title, text: list.Title };
        });
        return listsArray;
      });
  }

  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    console.log(oldValue);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => {
      return newValue;
    });
    // refresh web part
    this.render();
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                new PropertyPaneDropdown("quizResponseList", {
                  label: strings.LSTquizResponsesList,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.quizResponseList,
                  disabled: false,
                }),
                new PropertyPaneDropdown("quizQuestionsList", {
                  label: strings.LSTquizQuestionsList,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.quizQuestionsList,
                  disabled: false,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
