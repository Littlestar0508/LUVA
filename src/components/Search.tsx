import SearchProfileBase from "./SearchProfileBase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import useUserProfileStore from "../utils/UserProfileStore";

type Profile = {
  user_id: string;
  nickname: string;
  profile_img: string;
  hobby: string;
  like: number;
  place: string;
};

// 한 번에 불러올 데이터와, 불러온 데이터 중 몇 개 전에 다음 데이터를 불러올지 결정하는 상수
const PAGE_SIZE = 10;
const PREFETCH_THRESHOLD = 3;

function Search() {
  const { id } = useUserProfileStore();

  // 유저의 정보, 불러오는 중인 상태, 다음이 있는지에 대한 체크
  const [userArr, setUserArr] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  // 스와이퍼와 현재 몇 번 불러왔는지, 그리고 중복 setState를 방지하기 위한 ref
  const pageRef = useRef(0);
  const cancelledRef = useRef(false);

  // 다음 데이터를 불러오기
  const fetchNext = async () => {
    // 비정상적인 접근 방지
    if (!id) return;
    if (loading) return;
    if (!hasNext) return;

    // 함수가 실행되면 로딩 상태 바꾸기
    setLoading(true);

    // 데이터 불러올 범위 지정
    const from = pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    // 데이터 렌더링
    const { data, error } = await supabase
      .from("user_info")
      .select("user_id, nickname, profile_img, hobby, like, place")
      .neq("user_id", id)
      .order("user_id", { ascending: true })
      .range(from, to);

    // 만약 호출 과정 중에 문제 발생 시 에러 출력 후 초기화
    if (error) {
      console.error(error);
      if (!cancelledRef.current) setLoading(false);
      return;
    }

    const rows = (data ?? []) as Profile[];

    if (!cancelledRef.current) {
      // 데이터 중복 방지 후 데이터 정제
      setUserArr((prev) => {
        const prevIds = new Set(prev.map((prev) => prev.user_id));
        const unique = rows.filter((row) => !prevIds.has(row.user_id));
        return [...prev, ...unique];
      });

      // 만약 불러온 데이터가 10개보다 적다면 hasNext는 false로 지정
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

    // 언마운트 시 초기화
    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Swiper
        slidesPerView={1}
        speed={500}
        spaceBetween={20}
        className="h-full"
        onSlideChange={(s) => {
          const idx = s.activeIndex;
          const total = userArr.length;

          if (hasNext && !loading && idx >= total - PREFETCH_THRESHOLD - 1) {
            fetchNext();
          }
        }}
      >
        {userArr.map((profile) => (
          <SwiperSlide key={profile.user_id}>
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
