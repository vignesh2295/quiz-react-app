import { IDropdownOption } from "@fluentui/react";    
    
export interface IListDropdownState {    
  loading: boolean;    
  options: IDropdownOption[];    
  error: string | undefined;    
}