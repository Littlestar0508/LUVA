import { useState } from "react";
import useUserProfileStore from "../utils/UserProfileStore";
import { supabase } from "../utils/SupabaseClient";
import { useNavigate } from "react-router-dom";

type SearchProfileBaseProps = {
  id: string;
  src: string;
  alt: string;
  name: string;
  place: string;
  hobby: string;
};

function SearchProfileBase({
  id,
  src,
  alt,
  name,
  place,
  hobby,
}: SearchProfileBaseProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const { id: myId } = useUserProfileStore();

  const openChatRoom = async () => {
    const orderUUID = [];
    if (myId < id) {
      orderUUID[0] = myId;
      orderUUID[1] = id;
    } else {
      orderUUID[0] = id;
      orderUUID[1] = myId;
    }

    const { data: chkHasRoom } = await supabase
      .from("chat_room")
      .select("*")
      .eq("user_a", orderUUID[0])
      .eq("user_b", orderUUID[1])
      .maybeSingle();

    if (chkHasRoom) {
      navigate(`/chat-content?id=${chkHasRoom.id}`);
    }

    if (!chkHasRoom) {
      const { data, error } = await supabase
        .from("chat_room")
        .insert([{ user_a: orderUUID[0], user_b: orderUUID[1] }])
        .select();

      if (error) {
        console.error(error);
        return;
      }

      navigate(`/chat-content?id=${data[0].id}`);
    }
  };

  const pressLike = () => {
    console.log("좋아요");

    const nextLiked = !liked;

    setLiked(nextLiked);
  };

  return (
    <>
      <div
        className="grid grid-col-4 grid-rows-20 h-full items-center gap-4"
        key={id}
      >
        <figure className="col-span-4 row-span-18 relative">
          <img
            src={src}
            alt={alt}
            className="aspect-square size-full mx-auto"
          />
          <figcaption className="absolute bottom-1 left-1 bg-luva-bg-0 opacity-80 rounded-2xl p-2 text-luva-text-strong">
            닉네임 : {name}
            <br />
            위치 : {place}
            <br />
            취미 : {hobby}
          </figcaption>
        </figure>
        <button
          onClick={openChatRoom}
          className="border border-luva-chat col-span-2 row-span-2 bg-luva-chat text-luva-bg-0 p-1 rounded-lg h-full"
        >
          채팅열기
        </button>
        <button
          onClick={pressLike}
          className={`border border-luva-like col-span-2 row-span-2 text-luva-text-strong p-1 rounded-lg h-full ${
            liked ? "bg-luva-like" : null
          }`}
        >
          좋아요
        </button>
      </div>
    </>
  );
}

export default SearchProfileBase;
