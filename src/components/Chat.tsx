import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import TimeFormatter from "../utils/TimeFormatter";
import { useNavigate } from "react-router-dom";
import useChatPartnerStore from "../utils/ChatPartnerStore";

type ChatRoomList = {
  last_message: string;
  last_message_at: string;
  partner_id: string;
  partner_profile_img: string;
  partner_nickname: string;
  room_id: string;
};

function Chat() {
  const { setPartnerNickname } = useChatPartnerStore();
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ChatRoomList[]>([]);

  const moveToChatRoom = (params: string, partner: string) => {
    setPartnerNickname(partner);
    navigate(`/chat-content?id=${params}`);
  };

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
        async () => {
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
        async () => {
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
        <li
          key={m.room_id}
          className="list-none active:bg-luva-chat text-luva-text-strong active:text-black p-3"
        >
          <button
            type="button"
            className="flex items-center gap-3 w-full text-left"
            aria-label={`${m.partner_nickname} 님과의 채팅방 열기`}
            onClick={() => moveToChatRoom(m.room_id, m.partner_nickname)}
          >
            {/* 프로필 이미지 */}
            <figure className="shrink-0">
              <img
                src={m.partner_profile_img}
                alt={`${m.partner_nickname}의 프로필 이미지`}
                className="size-12 rounded-xl border border-luva-line"
              />
            </figure>

            {/* 채팅 정보 */}
            <article className="flex flex-col gap-2 flex-1 overflow-hidden">
              <header>
                <p className="text-sm font-bold truncate w-1/2">
                  {m.partner_nickname}
                </p>
              </header>

              <p className="text-xs truncate w-4/5">
                {m.last_message ?? "채팅을 열어 대화를 시작해보세요."}
              </p>
            </article>

            {/* 시간 */}
            <time dateTime={m.last_message_at} className="text-xs shrink-0">
              {TimeFormatter(m.last_message_at)}
            </time>
          </button>
        </li>
      ))}
    </>
  );
}

export default Chat;
