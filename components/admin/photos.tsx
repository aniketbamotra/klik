"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Trash, Upload } from "@/components/admin/icons";
import {
  attachProductImages,
  deleteProductImage,
  makeImageMain,
  setImageAlt,
} from "@/lib/admin/actions";
import { checkPhoto, MAX_MB, OK_TYPES, removePhoto, uploadPhoto } from "@/lib/admin/upload";
import { imageUrl, type ProductImage } from "@/lib/images";

/* Photographs live inside the product form on both the new and the edit page,
   so nothing here may be a <form>: forms cannot nest. Every control is a
   type="button" that calls its action directly, and Enter in an alt field is
   caught so it saves the caption rather than submitting the whole product. */

/* ----------------------------------------------------------- drop zone -- */

function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onFiles(Array.from(e.dataTransfer.files));
      }}
      className={`rounded-xl border-2 border-dashed px-6 py-7 text-center transition-colors ${
        over ? "border-plum bg-orange/10" : "border-adm-line bg-adm-surface hover:border-plum/40"
      }`}
    >
      <Upload className="mx-auto h-6 w-6 text-plum/70" />
      <p className="adm-body mt-3 font-medium">
        Drop photographs here, or{" "}
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="underline underline-offset-2 hover:text-orange"
        >
          choose files
        </button>
      </p>
      <p className="adm-body mt-1 text-plum/70">
        JPG, PNG, WebP or AVIF · up to {MAX_MB} MB each · the first is the main one
      </p>
      {/* no name: the files never travel with the product form — they are
          uploaded to Storage as soon as they are picked */}
      <input
        ref={input}
        type="file"
        multiple
        accept={OK_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- tile -- */

function Tile({
  src,
  main,
  busy,
  caption,
  children,
}: {
  src: string;
  main: boolean;
  busy?: boolean;
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-adm-line bg-adm-surface">
      <div className="relative aspect-square bg-adm-bg">
        {/* blob previews and public-bucket URLs; next/image adds nothing here */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className={`h-full w-full object-cover ${busy ? "opacity-50" : ""}`} />
        {main && (
          <span className="absolute left-2 top-2 rounded-full bg-plum px-2 py-0.5 text-xs font-medium text-cream">
            Main
          </span>
        )}
        {busy && (
          <span className="adm-label absolute inset-x-0 bottom-2 text-center text-plum">
            Uploading…
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        {caption}
        <div className="mt-auto flex items-center justify-between gap-2">{children}</div>
      </div>
    </li>
  );
}

function MainButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="adm-body flex items-center gap-1.5 rounded-md px-1.5 py-1 text-plum/70 hover:bg-adm-bg hover:text-plum disabled:opacity-50"
    >
      <Star className="h-4 w-4" />
      Make main
    </button>
  );
}

function RemoveButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Remove this photograph"
      className="ml-auto rounded-md p-1.5 text-plum/70 hover:bg-alert/10 hover:text-alert disabled:opacity-50"
    >
      <Trash className="h-4 w-4" />
    </button>
  );
}

const GRID = "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4";

/* -------------------------------------------------- new product (draft) -- */

export type Draft = {
  key: string;
  file: File;
  preview: string;
  alt: string;
  /** Set once uploaded, so a retry after a failed save does not upload twice. */
  path?: string;
};

/* On a new product nothing is uploaded until "Add product" is pressed — the
   files wait in the form's memory, so a form that is abandoned leaves nothing
   behind in Storage. The product form owns the list and does the uploading on
   submit; this only picks, previews, orders and captions. */
export function DraftPhotos({
  drafts,
  setDrafts,
  disabled,
}: {
  drafts: Draft[];
  setDrafts: React.Dispatch<React.SetStateAction<Draft[]>>;
  disabled: boolean;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const previews = useRef(new Set<string>());

  useEffect(() => {
    const urls = previews.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const add = (files: File[]) => {
    const problems: string[] = [];
    const added: Draft[] = [];
    for (const file of files) {
      const problem = checkPhoto(file);
      if (problem) {
        problems.push(problem);
        continue;
      }
      const preview = URL.createObjectURL(file);
      previews.current.add(preview);
      added.push({ key: crypto.randomUUID(), file, preview, alt: "" });
    }
    setDrafts((d) => [...d, ...added]);
    setErrors(problems);
  };

  const update = (key: string, change: Partial<Draft>) =>
    setDrafts((all) => all.map((x) => (x.key === key ? { ...x, ...change } : x)));

  return (
    <div>
      <DropZone onFiles={add} />
      <Errors errors={errors} />

      {drafts.length > 0 && (
        <ul className={GRID}>
          {drafts.map((d, i) => (
            <Tile
              key={d.key}
              src={d.preview}
              main={i === 0}
              busy={disabled && !d.path}
              caption={
                <input
                  aria-label={`Describe ${d.file.name}`}
                  value={d.alt}
                  onChange={(e) => update(d.key, { alt: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                  disabled={disabled}
                  className="adm-field py-2"
                  placeholder="Describe this photograph"
                />
              }
            >
              {i > 0 && (
                <MainButton
                  disabled={disabled}
                  onClick={() => setDrafts((all) => [d, ...all.filter((x) => x.key !== d.key)])}
                />
              )}
              <RemoveButton
                disabled={disabled}
                onClick={() => {
                  setDrafts((all) => all.filter((x) => x.key !== d.key));
                  // only already-uploaded after a failed save; tidy it away
                  if (d.path) removePhoto(d.path);
                }}
              />
            </Tile>
          ))}
        </ul>
      )}

      <p className="adm-body mt-3 text-plum/70">
        {drafts.length === 0
          ? "Optional. Without a photograph the shop shows the piece's drawing."
          : `${drafts.length} photograph${drafts.length === 1 ? "" : "s"} — uploaded when you add the product.`}
      </p>
    </div>
  );
}

/* ------------------------------------------------ existing product (live) -- */

type Pending = { key: string; preview: string };

/* On an existing product every change is saved as it happens: uploads attach
   straight away, and main / remove / caption each write on their own. None of
   it waits for "Save changes", which only concerns the fields. */
export function ProductPhotos({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState<Pending[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [working, startWork] = useTransition();

  const add = async (files: File[]) => {
    const ok = files.filter((f) => !checkPhoto(f));
    const problems = files.map(checkPhoto).filter((p): p is string => Boolean(p));
    if (ok.length === 0) {
      setErrors(problems);
      return;
    }

    const batch = ok.map((file) => ({ key: crypto.randomUUID(), preview: URL.createObjectURL(file) }));
    setPending((p) => [...p, ...batch]);

    const results = await Promise.allSettled(ok.map((file) => uploadPhoto(productId, file)));
    const paths = results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
    results.forEach((r) => r.status === "rejected" && problems.push((r.reason as Error).message));

    if (paths.length > 0) {
      const result = await attachProductImages(productId, paths);
      if (result.error) problems.push(result.error);
    }

    // clear the placeholders in the same transition as the refresh, so the
    // stored tiles replace them in one commit rather than after a blank beat
    startWork(() => {
      setPending((p) => p.filter((x) => !batch.some((b) => b.key === x.key)));
      setErrors(problems);
      router.refresh();
    });
    batch.forEach((b) => URL.revokeObjectURL(b.preview));
  };

  const run = (fn: () => Promise<unknown>) => startWork(async () => void (await fn()));

  return (
    <div>
      <DropZone onFiles={add} />
      <Errors errors={errors} />

      {images.length + pending.length > 0 && (
        <ul className={GRID}>
          {images.map((image, i) => (
            <Tile
              key={image.id}
              src={imageUrl(image.path)}
              main={i === 0}
              caption={<AltField image={image} />}
            >
              {i > 0 && (
                <MainButton
                  disabled={working}
                  onClick={() => run(() => makeImageMain(image.id, productId))}
                />
              )}
              <RemoveButton
                disabled={working}
                onClick={() => run(() => deleteProductImage(image.id, image.path))}
              />
            </Tile>
          ))}
          {pending.map((p) => (
            <Tile key={p.key} src={p.preview} main={false} busy caption={null}>
              {null}
            </Tile>
          ))}
        </ul>
      )}

      <p aria-live="polite" className="adm-body mt-3 text-plum/70">
        {images.length === 0
          ? "No photographs yet — the shop shows this piece's drawing until you add one."
          : `${images.length} photograph${images.length === 1 ? "" : "s"}. Changes here save immediately.`}
      </p>
    </div>
  );
}

/* Alt text is what a screen reader and a failed image both fall back to. Left
   blank, the storefront uses the product name. Saved on blur or Enter. */
function AltField({ image }: { image: ProductImage }) {
  const [value, setValue] = useState(image.alt);
  const [saved, setSaved] = useState(image.alt);
  const [error, setError] = useState<string | null>(null);
  const [saving, startSave] = useTransition();

  const save = () => {
    if (value.trim() === saved) return;
    startSave(async () => {
      const result = await setImageAlt(image.id, value);
      if (result.error) setError(result.error);
      else {
        setError(null);
        setSaved(value.trim());
      }
    });
  };

  return (
    <div>
      <input
        aria-label="Describe this photograph"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          save();
        }}
        className="adm-field py-2"
        placeholder="Describe this photograph"
        aria-invalid={error ? true : undefined}
      />
      {(saving || error) && (
        <p role={error ? "alert" : "status"} className={`adm-body mt-1 ${error ? "text-alert" : "text-plum/70"}`}>
          {error ?? "Saving…"}
        </p>
      )}
    </div>
  );
}

function Errors({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <ul role="alert" className="adm-body mt-3 space-y-1 text-alert">
      {errors.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  );
}
