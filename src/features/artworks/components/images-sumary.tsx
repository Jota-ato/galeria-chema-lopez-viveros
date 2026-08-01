import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import { ArtworkInput } from "../schema/artwork-schema";
import Image from "next/image";

export function ImagesSumary({
  imageUrl,
  extraImages,
  basicInfo,
}: {
  imageUrl: string;
  extraImages: string[];
  basicInfo: ArtworkInput;
}) {
  const ratio = RATIO_MAP[basicInfo.aspectRatio];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Image
          src={imageUrl}
          alt={basicInfo.title}
          width={ratio * 1000}
          height={1000}
          className="object-cover size-full rounded-lg shrink-0"
        />
      </div>
      <div className="flex gap-2 overflow-auto">
        {extraImages.length > 0
          ? extraImages.map((url) => (
              <Image
                key={url}
                src={url}
                alt={basicInfo.title}
                width={100}
                height={100}
                className="object-cover h-24 w-32 rounded-lg shrink-0"
              />
            ))
          : null}
      </div>
    </div>
  );
}
