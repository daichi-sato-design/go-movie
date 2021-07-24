const TextArea = ({
  title,
  name,
  value,
  row,
  handleChange,
  className,
  errorDiv,
  errorMsg,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <textarea
        className={`form-control ${className}`}
        id={name}
        name={name}
        rows={row}
        value={value}
        onChange={handleChange}
      />
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
};

export default TextArea;
