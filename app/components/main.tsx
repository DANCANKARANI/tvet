// components/Main.jsx
import Card from './Card.jsx';

const Main = () => {
  return (
    <section className="bg-white-100 pt-0">
      <div className="container mx-auto ">
        <div className="flex 1 space-x-4 ">
          <div className="flex-1 max-w-xs">
            <Card 
              title={"Engineering"} 
              description={"At our institution, we offer some of the best engineering courses designed to equip students with cutting-edge knowledge and practical skills. Our Mechanical Engineering program delves into the design and manufacturing of mechanical systems, preparing students for diverse industries. Electrical Engineering provides in-depth understanding of electrical systems and electronics, crucial for modern technological advancements. Civil Engineering focuses on infrastructure development, emphasizing sustainable design and construction practices. Computer Engineering merges principles of electrical engineering and computer science, fostering innovation in hardware and software development. Lastly, our Chemical Engineering course integrates chemistry, biology, and engineering principles to address challenges in production and environmental sustainability. Each program combines theoretical knowledge with hands-on experience, ensuring our graduates are well-prepared for successful careers in their respective fields."}
            />
          </div>
          <div className="flex-1 max-w-xs">
            <Card 
              title={"ICT"} 
              description={"Our institution offers premier ICT courses aimed at developing tech-savvy professionals ready to tackle modern challenges. Our Computer Science program covers fundamental and advanced topics in algorithms, data structures, and software development, preparing students for a wide range of tech careers. The Information Technology course focuses on the management and support of computer systems and networks, essential for any organization. Our Cybersecurity program equips students with skills to protect digital information from cyber threats, a critical need in today’s digital world. The Data Science course trains students to analyze and interpret complex data, providing valuable insights for decision-making. Lastly, our Software Engineering program emphasizes the design, development, and maintenance of software applications, ensuring robust and efficient solutions. Each course blends theoretical foundations with practical experience, ensuring graduates are well-prepared for the dynamic ICT industry."}
            />
          </div>
          <div className="flex-1 max-w-xs">
            <Card 
              title={"Business"} 
              description={"At our institution, we offer top-tier business courses designed to develop future leaders and innovators. Our Business Administration program provides a comprehensive understanding of managing and operating businesses, covering essential areas like finance, marketing, and human resources. The Marketing course focuses on strategies to effectively promote and sell products, utilizing market research and digital tools. Our Finance program delves into the management of money, investments, and financial planning, preparing students for dynamic financial careers. The Entrepreneurship course fosters creativity and business acumen, equipping students to start and manage new ventures. Additionally, our International Business program explores global trade, international marketing, and cross-cultural management, preparing students for success in the global marketplace. Each course combines rigorous academic learning with practical applications, ensuring students are well-equipped to thrive in the business world."}
            />
          </div>
          <div className="flex-1 max-w-xs">
            <Card 
              title={"Agriculture"} 
              description={"At our institution, we offer a diverse range of top-tier agricultural courses designed to address modern challenges in farming and food production. The Agricultural Science program provides comprehensive knowledge on crop and livestock management, integrating scientific methods with practical techniques. Horticulture focuses on the cultivation and care of fruits, vegetables, and ornamental plants, preparing students for careers in plant science and garden design. Agricultural Economics combines economic principles with agricultural practices to enhance production efficiency and market understanding. Animal Science delves into the biology and management of farm animals, equipping students for roles in veterinary science and animal care. Finally, Agroecology promotes sustainable farming practices by integrating ecological principles into agriculture, aiming for environmental balance and productivity. Each course combines rigorous academic learning with hands-on experience, ensuring our graduates are well-prepared for impactful careers in agriculture."}            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
