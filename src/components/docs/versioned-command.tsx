import { Pre } from "nextra/components";
import LatestVersion from "@/components/public/version";

export default function VersionedCommand({ template }: { template: string }) {
  const command = template.replace(/\{version\}/g, LatestVersion);
  const tokens = command.match(/"[^"]*"|&&|\s+|[^\s"]+/g) ?? [];
  let expectCommand = true;

  return (
    <Pre hasCopyCode data-language="sh" data-theme="default">
      <code data-language="sh" data-theme="default">
        <span className="line">
          {tokens.map((token, index) => {
            let color = "var(--shiki-color-text)";

            if (token === "&&") {
              color = "var(--shiki-token-punctuation)";
              expectCommand = true;
            } else if (!/^\s+$/.test(token)) {
              color = token.startsWith('"')
                ? "var(--shiki-token-string-expression)"
                : expectCommand
                  ? "var(--shiki-token-function)"
                  : "var(--shiki-token-string)";
              expectCommand = false;
            }

            return (
              <span key={index} style={{ color }}>
                {token}
              </span>
            );
          })}
        </span>
      </code>
    </Pre>
  );
}
