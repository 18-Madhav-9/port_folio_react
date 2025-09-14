const AutoSizingInput = ({ value, onChange, placeholder, type = "text", name, error }) => {
  return (
    <span className="relative inline-block align-bottom mx-2 max-w-full">
      <span className="invisible px-1 min-w-[120px] inline-block font-semibold text-2xl md:text-3xl whitespace-pre">
        {value || placeholder}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`absolute inset-0 w-full bg-transparent border-b-2 outline-none text-indigo-600 dark:text-indigo-400 text-center font-semibold text-2xl md:text-3xl transition-colors
        ${error ? 'border-red-400 focus:border-red-600 dark:focus:border-red-500' : 'border-slate-400 dark:border-slate-500/50 focus:border-indigo-600 dark:focus:border-indigo-500'} 
        placeholder:font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500`}
      />
    </span>
  );
};

export default AutoSizingInput ;