import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태 변수 타입
interface State {
  nickname: string;
  profile_img: string;
  hobby: string;
  like: number;
  place: string;
  email: string;
  id: string;
}

// 함수 타입
interface Actions {
  setNickname: (nickname: string) => void;
  setProfileImg: (profile_url: string) => void;
  setHobby: (hobby: string) => void;
  setLike: (like: number) => void;
  setPlace: (place: string) => void;
  setEmail: (email: string) => void;
  setId: (id: string) => void;
  reset: () => void;
}

type Store = State & Actions;

const initialState: State = {
  nickname: "LUVA",
  profile_img: "/basic_profile.png",
  hobby: "취미를 설정해주시길 바랍니다.",
  like: 0,
  place: "대한민국",
  email: "알 수 없습니다.",
  id: "",
};

const useUserProfileStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

      setNickname: (nickname) => set({ nickname }),
      setProfileImg: (profile_url) => set({ profile_img: profile_url }),
      setHobby: (hobby) => set({ hobby }),
      setLike: (like) => set({ like }),
      setPlace: (place) => set({ place }),
      setEmail: (email) => set({ email }),
      setId: (id) => set({ id }),

      // 로그아웃 / 계정 전환 대비
      reset: () => set(initialState),
    }),
    {
      name: "user-profile-store", // localStorage key
      partialize: (state) => ({
        nickname: state.nickname,
        profile_img: state.profile_img,
        hobby: state.hobby,
        like: state.like,
        place: state.place,
        email: state.email,
        id: state.id,
      }),
    }
  )
);

export default useUserProfileStore;
