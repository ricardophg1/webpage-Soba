import { create } from 'zustand';

interface RegisterModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));