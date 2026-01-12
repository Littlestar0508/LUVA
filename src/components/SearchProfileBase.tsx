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
  const openChatRoom = () => {
    console.log("채팅열기");
  };

  const pressLike = () => {
    console.log("좋아요");
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
