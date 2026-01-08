import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import useUserProfileStore from "../utils/UserProfileStore";

type ChatRoomList = {
  id: string;
  user_a: string;
  user_b: string;
  created_at: string;
};

function Chat() {
  const { id } = useUserProfileStore();
  const [chatList, setChatList] = useState<ChatRoomList[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const { data, error } = await supabase
        .from("chat_room")
        .select("id, user_a, user_b, created_at")
        .or(`user_a.eq.${id},user_b.eq.${id}`);

      if (error) {
        console.error(error);
        return;
      }

      setChatList(data ?? []);
    };

    fetchChatRooms();
  }, [id]);

  return (
    <>
      <div className="bg-luva-line">채팅창 영역입니다.</div>
      {chatList.map((m) => (
        <div>{m.id}</div>
      ))}
    </>
  );
}

export default Chat;
