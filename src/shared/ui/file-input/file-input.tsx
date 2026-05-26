import { useEffect, useRef, useState } from 'react';

interface FileInputProps {
  onChange?: (file: File | null) => void;
}

export const FileInput = ({ onChange }: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // preview 등록 및 파일 등록
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(selected.type)) return;
    if (selected.size > 2 * 1024 * 1024) return;

    setPreview(URL.createObjectURL(selected));
    onChange?.(selected);
  };

  const handleDelete = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  // preview가 바뀔 때마다 이전 blob URL 메모리 해제
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const previewImage = preview ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={preview} alt="미리보기" className="size-full object-cover" />
  ) : null;

  return (
    <div className="relative size-28.5">
      <label className="flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-50 text-gray-500">
        {previewImage ?? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/common/icons/image_plus.svg"
              alt="파일 첨부"
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
          className="absolute top-1 right-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/common/icons/delete_button.svg"
            alt="삭제"
            width={18}
            height={18}
          />
        </button>
      )}
    </div>
  );
};
