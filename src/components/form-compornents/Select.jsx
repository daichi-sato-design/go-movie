const Select = ({
  title,
  name,
  value,
  placeholder,
  options,
  handleChange,
  className,
  errorDiv,
  errorMsg,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {" "}
        {title}{" "}
      </label>
      <select
        className={`form-select ${className}`}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          return (
            <option
              className="form-select"
              key={option.id}
              value={option.id}
              label={option.value}
            >
              {option.value}
            </option>
          );
        })}
      </select>
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
};

export default Select;
