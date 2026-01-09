import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import useUserProfileStore from "../utils/UserProfileStore";

type ChatRoomList = {
  last_message: string;
  last_message_at: string;
  partner_id: string;
  partner_profile_img: string;
  partner_nickname: string;
  room_id: string;
};

function Chat() {
  const [chatList, setChatList] = useState<ChatRoomList[]>([]);

  useEffect(() => {
    const fetchChatRoomsList = async () => {
      const { data, error } = await supabase.rpc("get_chat_room_list");

      setChatList(data);
    };

    fetchChatRoomsList();
  }, []);

  return (
    <>
      <div className="bg-luva-line">채팅창 영역입니다.</div>
      {chatList.map((m) => (
        <div className="flex items-center gap-3" key={m.room_id} id={m.room_id}>
          <img
            src={m.partner_profile_img}
            alt={m.partner_nickname + "프로필 이미지"}
            className="size-12 rounded-xl shrink-0"
          />
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm text-luva-text-strong font-bold">
              {m.partner_nickname}
            </p>
            <p className="text-xs">{m.last_message}</p>
          </div>
          <p className="text-xs">{m.last_message_at}</p>
        </div>
      ))}
    </>
  );
}

export default Chat;
