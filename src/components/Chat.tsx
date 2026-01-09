import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import TimeFormatter from "../utils/TimeFormatter";

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

  // 채팅방 목록 불러오기
  useEffect(() => {
    const fetchChatRoomsList = async () => {
      const { data, error } = await supabase.rpc("get_chat_room_list");

      if (error) return;
      setChatList(data);
    };

    fetchChatRoomsList();
  }, []);

  // realtime구독으로 최근 메세지 갱신 및 채팅방 리스트 갱신(실시간)
  useEffect(() => {
    // 최근 메세지 realtime 구독
    const channelMessages = supabase
      .channel("chat-list")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        async (payload) => {
          const { data } = await supabase.rpc("get_chat_room_list");
          if (data) setChatList(data);
        }
      )
      .subscribe();

    // 새로운 방 생성 realtime 구독
    const channelRooms = supabase
      .channel("chat-room-insert")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_room",
        },
        async (payload) => {
          const { data } = await supabase.rpc("get_chat_room_list");
          if (data) setChatList(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelMessages);
      supabase.removeChannel(channelRooms);
    };
  }, []);

  return (
    <>
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
          <p className="text-xs">{TimeFormatter(m.last_message_at)}</p>
        </div>
      ))}
    </>
  );
}

export default Chat;
