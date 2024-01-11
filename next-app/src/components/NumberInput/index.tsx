interface NumberInputProps {
  name: string;
  defaultValue: number;
  onChange: (quantity: number) => void;
  disabledIncrement?: boolean;
  disabledDecrement?: boolean;
}
export default function NumberInput({
  name,
  defaultValue,
  onChange,
  disabledIncrement = false,
  disabledDecrement = false,
}: NumberInputProps) {
  return (
    <div
      className="py-2 px-3 inline-block border rounded-lg bg-slate-900 border-slate-900"
      data-hs-input-number
    >
      <div className="flex justify-center items-center gap-x-1.5">
        <button
          type="button"
          className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-white hover:bg-gray-800 focus:outline-none"
          onClick={() => onChange(-1)}
          disabled={disabledDecrement}
          data-hs-input-number-decrement
        >
          <svg
            className="flex-shrink-0 w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
        <input
          className="p-0 w-6 bg-transparent border-0 text-gray-400 text-center"
          type="text"
          defaultValue={defaultValue}
          name={name}
          id={`input-${name}`}
          onBlur={(evt) => onChange(parseInt(evt.target.value || "0", 10))}
          data-hs-input-number-input
        />
        <button
          type="button"
          className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 dark:text-white hover:bg-gray-800 focus:outline-none"
          onClick={() => onChange(1)}
          disabled={disabledIncrement}
          data-hs-input-number-increment
        >
          <svg
            className="flex-shrink-0 w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
