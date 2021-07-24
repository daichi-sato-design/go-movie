const TextArea = ({ title, name, value, row, handleChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <textarea
        className="form-control"
        id={name}
        name={name}
        rows={row}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextArea;
