import { Button } from "./ui/button";

export default function Burette(volume) {
  let percent = (volume.volume / 100) * 100 + "%";
  percent = percent.toString();
  return (
    <>
      <Button
        className="bg-yellow-600"
        disabled={volume.volume !== 0 ? false : true}
        onClick={() => volume.onDrain()}
      >
        Drain!
      </Button>

      <div className="flex flex-col justify-end w-20 h-full border border-black rounded-t-lg">
        <div
          className={`w-20 ${volume.Chemical.color}`}
          style={{ height: `${percent}`, transition: "height 0.5s ease" }}
        ></div>
      </div>
    </>
  );
}
