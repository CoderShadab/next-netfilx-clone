import { create } from 'zustand';

export interface ModalStoreInterface {
  isFeedOpen: boolean;
  openFeedModal: () => void;
  closeFeedModal: () => void;
}

const useFeedbackModal = create<ModalStoreInterface>((set) => ({
  isFeedOpen: false,
  openFeedModal: () => set({ isFeedOpen: true }),
  closeFeedModal: () => set({ isFeedOpen: false }),
}));

export default useFeedbackModal;