export default function Divider({ text }: { text: string }) {
  return (
    <div className="relative my-5 transition-all duration-500">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-sqyellowfaint" />
      </div>
      <div className="relative flex justify-center drop-shadow-[0_0_1px_rgba(0,0,0,0.30)]">
        <span className="select-none px-3 bg-sqyellow text-[#413318] rounded-md text-lg font-semibold skew-x-[-10deg]">
          <p className="skew-x-[10deg]">{text}</p>
        </span>
      </div>
    </div>
  );
}
