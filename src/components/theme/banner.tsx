import { LatestVersion } from "../public";

const Banner = {
  key: "4.0-release",
  text: (
    <a
      href={`https://github.com/jumpserver/jumpserver/releases/${LatestVersion}`}
      target="_blank"
    >
      🎉 JumpServer { LatestVersion } is released. Read more →
    </a>
  ),
};

export default Banner;
