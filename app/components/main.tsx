// components/Main.jsx
import Card from './Card';

const Main = () => {
  return (
    <section className="bg-white-100 pt-0"> {/* Adjust pt-16 based on navbar height */}
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4">
          <Card title="Card 1" description="This is the first card" />
          <Card title="Card 2" description="This is the second card" />
        </div>
      </div>
    </section>
  );
};

export default Main;
