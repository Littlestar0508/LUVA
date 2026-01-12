import SearchProfileBase from "./SearchProfileBase";

function Search() {
  return (
    <SearchProfileBase
      src={"/basic_profile.png"}
      alt="프로필 사진"
      hobby={"취미"}
      place={"사는 곳"}
      id={"123"}
      name={"닉네임"}
    />
  );
}

export default Search;
