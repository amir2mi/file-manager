import clsx from "clsx";

export default function ActionButton({ className, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={clsx(
        "scale-0 rounded-lg bg-slate-100 p-1 transition-transform group-focus-within:scale-100 group-hover:scale-100",
        className
      )}
    >
      {children}
    </button>
  );
}
