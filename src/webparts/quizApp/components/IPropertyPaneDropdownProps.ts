import { IDropdownOption } from "@fluentui/react";

export interface IPropertyPaneDropdownProps {
  label: string;
  loadOptions: () => Promise<IDropdownOption[]>;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedKey: string | number;
  disabled: boolean;
}
