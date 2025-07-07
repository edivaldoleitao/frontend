type LabelType = "inputText" | "Password" | "Email";

export interface LabelsProps {
  variant: LabelType;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
