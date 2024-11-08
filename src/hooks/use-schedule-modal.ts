import { create } from 'zustand';

interface ScheduleModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useScheduleModal = create<ScheduleModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));