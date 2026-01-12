import SearchProfileBase from "./SearchProfileBase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";

type Profile = {
  user_id: string;
  nickname: string;
  profile_img: string;
  hobby: string;
  like: number;
  place: string;
};

function Search() {
  const [userArr, setUserArr] = useState<Profile[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase.from("user_info").select("*");

      if (error) return;

      if (!cancelled) setUserArr((data ?? []) as Profile[]);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        speed={500}
        spaceBetween={20}
        className="h-full"
      >
        {userArr.map((profile) => (
          <SwiperSlide>
            <SearchProfileBase
              src={profile.profile_img}
              alt={profile.nickname}
              hobby={profile.hobby}
              place={profile.place}
              id={profile.user_id}
              name={profile.nickname}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Search;
