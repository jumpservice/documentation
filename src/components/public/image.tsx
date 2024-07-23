import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  caption?: string; // Optional title property
  width?: number;
  height?: number;
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  width = 600,
  height = 600,
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <a href={src} target="_blank">
          <Image src={src} alt={alt} width={width} height={height} />
        </a>
      </div>
    </div>
  );
};

export default ImageComponent;
