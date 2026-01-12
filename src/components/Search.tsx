import SearchProfileBase from "./SearchProfileBase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Search() {
  const textMap = Array(10).fill(0);

  return (
    <>
      <Swiper slidesPerView={1} className="h-full">
        {textMap.map(() => (
          <SwiperSlide>
            <SearchProfileBase
              src={"/basic_profile.png"}
              alt="프로필 사진"
              hobby={"취미"}
              place={"사는 곳"}
              id={"123"}
              name={"닉네임"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Search;
