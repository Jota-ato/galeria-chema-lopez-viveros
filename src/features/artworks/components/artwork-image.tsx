import Image from "next/image";

export function ArtworkImage({
  ratio,
  image,
}: {
  ratio: number;
  image: string;
}) {
  return (
    <Image
      src={image}
      alt={`Imagen de la obra`}
      width={ratio * 800}
      height={800}
      priority
      loading="eager"
      className="rounded-lg max-w-3xl!"
    />
  );
}
