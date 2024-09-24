import NewPost from "../components/UploadFormBox";

export default function Upload() {
  return(
    <main className="p-[30px] mt-[80px]">
      <div className="flex flex-col items-center justify-center text-white">
        <NewPost/>
      </div>
    </main>
  )
}