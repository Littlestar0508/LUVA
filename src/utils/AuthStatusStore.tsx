import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 변수 타입
interface State {
  isLoggedIn: boolean;
  isLoading: boolean;
  init: boolean;
}

// 함수 타입
interface Actions {
  setIsLoggedIn: (session: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setInit: (init: boolean) => void;
}

type Store = State & Actions;

const useAuthStatusStore = create<Store>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isLoading: true,
      init: false,

      setIsLoggedIn: (loginState) =>
        set(() => ({
          isLoggedIn: loginState,
        })),

      setIsLoading: (loadingState) =>
        set(() => ({
          isLoading: loadingState,
        })),

      setInit: (init) =>
        set(() => ({
          init,
        })),
    }),
    {
      name: "로그인 정보 저장소",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useAuthStatusStore;
