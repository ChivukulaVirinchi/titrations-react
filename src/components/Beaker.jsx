export default function Beaker(volume) {
  let percent = ((100 - volume.volume) / 100) * 100 + "%";
  percent = percent.toString();
  return (
    <>
      <div className="w-20 h-20 border border-black rounded-lg">
        <div
          className={`w-20 ${volume.Chemical.color}`}
          style={{ height: `${percent}`, transition: "height 0.5s ease" }}
        ></div>
      </div>
    </>
  );
}
