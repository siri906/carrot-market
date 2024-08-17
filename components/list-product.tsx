import { formatToTimeAgo, formatTotimeAgo, formatToWon } from "@/lib/util";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({ title, price, created_at, photo, id }: Props) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        {/* layout shift 를 막기 위한 nextjs */}
        {/* - 로딩 전후로 컴포넌트 위치가 밀리는 content shift 를 방지함.
          - 압축률이나, 화면 크기별 압축옵션을 제공함
          필수 prop으로 src, width, height, alt를 입력해주어야함.
          width, height를 모른다면, fill을 제공해주면됨
         <Image fill src={photo} alt={title} /> 
         숫자 영역에 값을 넣으면 이미지 압축이 가능하다 
         <Image fill src={photo} alt={title} quality={숫자} /> 
         <Image width={200} height={200} src={photo} alt={title} />
          fill은 이미지를 자동으로 부모컴포넌트의 크기로 맞춰줌 */}
        <Image fill src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
