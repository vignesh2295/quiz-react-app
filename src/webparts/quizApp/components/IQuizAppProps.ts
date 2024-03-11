import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IQuizLandingProps {
  siteUrl: string;
  currentUser: any;
  onQuizEnter: () => void;
}
export interface IQuizAppProps {
  description: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  ctx: WebPartContext;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  quizResponseList: string;
  quizQuestionsList: string;
  currentUser: any;
  onQuizExit: () => void;
}
export interface IQuizHomeProps {
  description: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  ctx: WebPartContext;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  quizResponseList: string;
  quizQuestionsList: string;
  currentUser: any;
}
