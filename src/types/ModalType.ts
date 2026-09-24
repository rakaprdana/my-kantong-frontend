export type ModalType = {
  canShow: string | boolean;
  onClose: () => void;
  onSuccess?: () => void;
};
