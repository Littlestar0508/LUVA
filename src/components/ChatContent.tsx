import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";
import useUserProfileStore from "../utils/UserProfileStore";
import dayjs from "dayjs";

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

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  const formatTime = (time) => {
    return dayjs(time).format("YYYY-MM-DD HH:mm");
  };

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

  return (
    <>
      <div>채팅창입니다.</div>
      <div className="flex flex-col gap-2">
        {messages.map((m) =>
          id === m.sender_id ? (
            <>
              <p
                key={m.id}
                className="inline-block bg-luva-chat p-2 whitespace-pre-wrap break-all max-w-4/5 rounded-xl self-end text-luva-bg-0"
              >
                {m.content}
              </p>
              <p className="inline-block self-end text-sm -translate-y-1">
                {formatTime(m.created_at)}
              </p>
            </>
          ) : (
            <>
              <p
                key={m.id}
                className="bg-luva-primary p-2 text-balance max-w-4/5 rounded-xl inline-block self-start text-luva-text-strong"
              >
                {m.content}
              </p>
              <p className="inline-block self-start text-sm -translate-y-1">
                {formatTime(m.created_at)}
              </p>
            </>
          )
        )}
      </div>
    </>
  );
}

export default ChatContent;
