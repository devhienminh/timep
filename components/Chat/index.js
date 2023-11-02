import ChatForm from "./ChatForm";
import ChatTitle from "./ChatTitle";

export default function Chat() {
  return (
    <>
      <div className="flex flex-col lg:flex-row isolate overflow-hidden bg-gray-900 rounded-lg justify-center items-center">
        <ChatTitle />
        <ChatForm />
      </div>
    </>
  );
}
