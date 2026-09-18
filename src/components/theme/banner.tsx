import { LatestVersion } from "../public";

const Banner = {
  key: `jumpserver-release-${LatestVersion}`,
  text: (
    <a
      href={`https://github.com/jumpserver/jumpserver/releases/tag/${LatestVersion}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      🎉 JumpServer {LatestVersion} is available. See what's new →
    </a>
  ),
};

export default Banner;
