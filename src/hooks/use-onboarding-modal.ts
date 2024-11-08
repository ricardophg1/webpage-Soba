import { create } from 'zustand';

interface OnboardingModalStore {
  isOpen: boolean;
  step: number;
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  previousStep: () => void;
  resetSteps: () => void;
  showPlatform: boolean;
  setShowPlatform: (show: boolean) => void;
}

export const useOnboardingModal = create<OnboardingModalStore>((set) => ({
  isOpen: false,
  step: 1,
  showPlatform: false,
  openModal: () => set({ isOpen: true, step: 1, showPlatform: false }),
  closeModal: () => set({ isOpen: false, step: 1 }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () => set((state) => ({ step: state.step - 1 })),
  resetSteps: () => set({ step: 1 }),
  setShowPlatform: (show) => set({ showPlatform: show }),
}));