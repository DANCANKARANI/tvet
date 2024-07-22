// components/Card.jsx
const Card = ({ title, description }) => {
  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <ul style={{ padding: "0", listStyleType: "none" }}>
          {description.map((item, index) => (
            <li key={index} style={{ wordBreak: "break-word" }}>
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      return <p style={{ wordBreak: "break-word" }}>{description}</p>;
    }
  };

  return (
    <div style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px", padding: "24px", maxWidth: "300px", margin: "16px" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "8px" }}>{title}</h3>
      {renderDescription()}
    </div>
  );
};

export default Card;
