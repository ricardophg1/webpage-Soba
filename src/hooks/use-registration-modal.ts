import { create } from 'zustand';

interface RegistrationModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useRegistrationModal = create<RegistrationModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));