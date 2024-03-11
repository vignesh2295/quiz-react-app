import { IDropdownOption } from "@fluentui/react";    
    
export interface IListDropdownProps {    
  label: string;    
  loadOptions: () => Promise<IDropdownOption[]>;    
  onChanged: (option: IDropdownOption, index?: number) => void;    
  selectedKey: string | number;    
  disabled: boolean;    
  stateKey: string;    
}  