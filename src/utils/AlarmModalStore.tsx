import { create } from "zustand";

// 상태 변수 타입
interface State {
  isModalOpen: boolean;
}

// 함수 타입
interface Actions {
  setIsModalOpen: () => void;
}

type Store = State & Actions;

const useAlarmModalStore = create<Store>((set) => ({
  isModalOpen: false,

  setIsModalOpen: () => {
    set((state) => ({
      isModalOpen: !state.isModalOpen,
    }));
  },
}));

export default useAlarmModalStore;
