export type UpdateItemProps<T> = {
  id: string | undefined;
  endpoint: string;
  initialData: T;
  amountField: keyof T; // "outcome" or "income"
  editableFields: (keyof T)[]; // field
  onSuccess?: () => void;
};
