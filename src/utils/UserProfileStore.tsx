import { create } from "zustand";

// 상태 변수 타입
interface State {
  nickname: string;
  profile_img: string;
  hobby: string;
  like: number;
  place: string;
}

// 함수 타입
interface Actions {
  setNickname: () => void;
  setProfileImg: () => void;
  setHobby: () => void;
  setLike: () => void;
  setPlace: () => void;
}

type Store = State & Actions;

const useUserProfileStore = create<Store>((set) => ({
  nickname: "LUVA",
  profile_img: "/basic_profile.png",
  hobby: "취미를 설정해주시길 바랍니다.",
  like: 0,
  place: "대한민국",

  setNickname: () => {
    set((state) => ({
      nickname: state.nickname,
    }));
  },

  setProfileImg: () => {
    set((state) => ({
      profile_img: state.profile_img,
    }));
  },

  setHobby: () => {
    set((state) => ({
      hobby: state.hobby,
    }));
  },

  setLike: () => {
    set((state) => ({
      like: state.like,
    }));
  },

  setPlace: () => {
    set((state) => ({
      place: state.place,
    }));
  },
}));

export default useUserProfileStore;
