function SearchProfileBase() {
  const openChatRoom = () => {
    console.log("채팅열기");
  };

  const pressLike = () => {
    console.log("좋아요");
  };

  return (
    <>
      <div className="grid grid-col-4 grid-rows-20 h-full items-center gap-4">
        <figure className="col-span-4 row-span-18 relative">
          <img
            src="/basic_profile.png"
            alt="프로필 사진"
            className="aspect-square size-full mx-auto"
          />
          <figcaption className="absolute bottom-1 left-1 bg-luva-bg-0 opacity-80 rounded-2xl p-2 text-luva-text-strong">
            이름
            <br />
            대한민국
            <br />
            취미
          </figcaption>
        </figure>
        <button
          onClick={openChatRoom}
          className="col-span-2 row-span-2 bg-luva-chat text-luva-bg-0 p-1 rounded-lg h-full"
        >
          채팅열기
        </button>
        <button
          onClick={pressLike}
          className="col-span-2 row-span-2 bg-luva-like text-luva-text-strong p-1 rounded-lg h-full"
        >
          좋아요
        </button>
      </div>
    </>
  );
}

export default SearchProfileBase;
