import { create } from "zustand";

interface State {
  partnerNickname: string;
}

interface Actions {
  setPartnerNickname: (partner: string) => void;
}

type Store = State & Actions;

const useChatPartnerStore = create<Store>((set) => ({
  partnerNickname: "",

  setPartnerNickname: (partner) => {
    set(() => ({
      partnerNickname: partner,
    }));
  },
}));

export default useChatPartnerStore;
