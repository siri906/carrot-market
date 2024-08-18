"use client";
import Button from "@/components/form-btn";
import Input from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [state, action] = useFormState(uploadProduct, null);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("event", event);
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    // url 을 생성하는 거고 브라우저에만 들어가고 파일이 업로드된 메모리를 참조 / 새로고침하면 메모리 만료
    const url = URL.createObjectURL(file);
    // console.log("url", url);
    setPreview(url);
  };
  return (
    <div>
      <form className="p-5 flex flex-col gap-5" action={action}>
        <label htmlFor="photo" style={{ backgroundImage: `url(${preview})` }} className="bg-center bg-cover border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer">
          {!preview && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
              {state?.fieldErrors.photo}
            </>
          )}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
        <Input name="title" required placeholder="제목" type="text" errors={state?.fieldErrors.title} />
        <Input name="price" type="number" required placeholder="가격" errors={state?.fieldErrors.price} />
        <Input name="desc" type="text" required placeholder="자세한 설명" errors={state?.fieldErrors.desc} />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
