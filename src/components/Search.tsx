import SearchProfileBase from "./SearchProfileBase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import useUserProfileStore from "../utils/UserProfileStore";
import type { Swiper as SwiperType } from "swiper";

type Profile = {
  user_id: string;
  nickname: string;
  profile_img: string;
  hobby: string;
  like: number;
  place: string;
};

const PAGE_SIZE = 10;
const PREFETCH_THRESHOLD = 3;

function Search() {
  const { id } = useUserProfileStore();

  const [userArr, setUserArr] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const swiperRef = useRef<SwiperType | null>(null);
  const pageRef = useRef(0);
  const cancelledRef = useRef(false);

  const fetchNext = async () => {
    if (!id) return;
    if (loading) return;
    if (!hasNext) return;

    setLoading(true);

    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("user_info")
      .select("user_id, nickname, profile_img, hobby, like, place")
      .neq("user_id", id)
      .range(from, to);

    if (error) {
      console.error(error);
      if (!cancelledRef.current) setLoading(false);
      return;
    }

    const rows = (data ?? []) as Profile[];

    if (!cancelledRef.current) {
      setUserArr((prev) => {
        const prevIds = new Set(prev.map((p) => p.user_id));
        const unique = rows.filter((r) => !prevIds.has(r.user_id));
        return [...prev, ...unique];
      });

      if (rows.length < PAGE_SIZE) setHasNext(false);
      pageRef.current += 1;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    cancelledRef.current = false;

    setUserArr([]);
    setHasNext(true);
    pageRef.current = 0;

    fetchNext();

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        slidesPerView={1}
        speed={500}
        spaceBetween={20}
        className="h-full"
        onSlideChange={(s) => {
          const idx = s.activeIndex;
          const total = userArr.length;

          if (hasNext && !loading && total - idx <= PREFETCH_THRESHOLD) {
            fetchNext();
          }
        }}
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
