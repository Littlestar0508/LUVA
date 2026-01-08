import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";
import useUserProfileStore from "../utils/UserProfileStore";
import dayjs from "dayjs";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";

type ChatMessage = {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

function ChatContent() {
  const [params] = useSearchParams();
  const chat_room_id = params.get("id");
  const { id } = useUserProfileStore();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // 이후 스켈레톤 UI 작업 예정
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  const formatTime = (time: string) => {
    return dayjs(time).format("YYYY-MM-DD HH:mm");
  };

  const moveToChat = () => {
    navigate("/chat");
  };

  // 채팅 보내기
  const send = async () => {
    const content = text.trim();
    if (!chat_room_id || !content) return;

    const { error } = await supabase.from("chat_messages").insert({
      room_id: chat_room_id,
      sender_id: id,
      content,
    });

    if (!error) setText("");
    else console.error(error);
  };

  // 엔터키로 이벤트 활성화
  const sendByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      send();
    }
  };

  // 초기 렌더링
  useEffect(() => {
    if (!chat_room_id) return;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("chat_messages")
        .select("id, room_id, sender_id, content, created_at")
        .eq("room_id", chat_room_id)
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) {
        console.error(error);
        setMessages([]);
      } else {
        setMessages(data ?? []);
      }
      setLoading(false);
    })();
  }, [chat_room_id]);

  // realtime
  useEffect(() => {
    if (!chat_room_id) return;

    const channel = supabase
      .channel(`room:${chat_room_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${chat_room_id}`,
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) =>
            prev.some((m) => m.id === newMsg.id) ? prev : [...prev, newMsg]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chat_room_id]);

  return (
    <>
      <div className="h-18 absolute top-0 right-0 left-0 text-center content-center border-b-2 border-luva-line text-2xl bg-luva-bg-0">
        <button
          className="absolute left-0 translate-x-1/2"
          onClick={moveToChat}
        >
          <IoChevronBackOutline size={36} />
        </button>
        상대방
      </div>
      <div className="flex flex-col gap-2 pt-18">
        {/* 전송자가 누군지에 따라 색상과 위치 구분 */}
        {messages.map((m) =>
          id === m.sender_id ? (
            <React.Fragment key={m.id}>
              <p className="inline-block bg-luva-chat p-2 whitespace-pre-wrap break-all max-w-4/5 rounded-xl self-end text-luva-bg-0">
                {m.content}
              </p>
              <p className="inline-block self-end text-sm -translate-y-2">
                {formatTime(m.created_at)}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment key={m.id}>
              <p className="bg-luva-primary p-2 whitespace-pre-wrap break-all max-w-4/5 rounded-xl inline-block self-start text-luva-text-strong">
                {m.content}
              </p>
              <p className="inline-block self-start text-sm -translate-y-2">
                {formatTime(m.created_at)}
              </p>
            </React.Fragment>
          )
        )}
        <div className="h-18 flex gap-2 absolute bottom-0 right-0 w-full p-4 justify-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => sendByEnter(e)}
            className="bg-luva-text-strong text-luva-bg-1 p-2 flex-3 rounded-md whitespace-pre-wrap break-all"
          />
          <button
            className="bg-luva-chat p-2 flex-1 text-luva-bg-0 font-bold rounded-md"
            onClick={send}
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatContent;
