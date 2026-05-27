import Image from 'next/image';
import { useRef, useState } from 'react';

interface FileInputProps {
  onChange?: (file: File | null) => void;
}

export const FileInput = ({ onChange }: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 이전 URL
  const prevPreviewRef = useRef<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(selected.type)) return;
    if (selected.size > 2 * 1024 * 1024) return;

    // 이전 URL 해제
    if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current);

    const url = URL.createObjectURL(selected);
    prevPreviewRef.current = url;
    setPreview(url);
    onChange?.(selected);
  };

  const handleDelete = () => {
    if (prevPreviewRef.current) {
      URL.revokeObjectURL(prevPreviewRef.current);
      prevPreviewRef.current = null;
    }

    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  const previewImage = preview ? (
    <Image
      src={preview}
      alt="미리보기"
      fill
      unoptimized
      className="object-cover"
    />
  ) : null;

  return (
    <div className="relative size-28.5">
      <label
        aria-label="파일 첨부"
        className="relative flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-50 text-gray-500"
      >
        {previewImage ?? (
          <>
            <Image
              src="/common/icons/image_plus.svg"
              alt=""
              width={18}
              height={18}
            />
            파일 첨부
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleChange}
        />
      </label>
      {preview && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label="삭제"
          className="absolute top-1 right-1"
        >
          <Image
            src="/common/icons/delete_button.svg"
            alt=""
            width={18}
            height={18}
          />
        </button>
      )}
    </div>
  );
};
