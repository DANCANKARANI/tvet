// components/Card.jsx
const Card = ({title, description }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs mx-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
  
  export default Card;
  