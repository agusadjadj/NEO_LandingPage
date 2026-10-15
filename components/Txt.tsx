// Muestra un texto resaltando lo que está [entre corchetes] como dato a completar.
export function Txt({ children }: { children: string }) {
  const partes = children.split(/(\[[^\]]+\])/);
  if (partes.length === 1) return <>{children}</>;
  return (
    <>
      {partes.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span key={i} className="fill">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}
