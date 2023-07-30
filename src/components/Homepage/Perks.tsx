import React from "react";
import styles from "../../styles/Perks.module.scss";
import { BicycleIcon, LeafIcon, SettingIcon } from "../SVGs/SVGicons";

const Perks = () => {
  const perks = [
    {
      icon: <LeafIcon />,
      title: "Locally sourced ingredients",
      desc: `We use only fresh and high-quality ingredients, many of which are
    locally sourced. Trust us for a meal made with care and attention to
    detail.`,
    },
    {
      icon: <SettingIcon />,
      title: "Customizable options",
      desc: ` We offer a range of customizable options to suit your dietary needs
    and preferences. Our easy-to-use online ordering system makes it
    simple to customize your order.`,
    },
    {
      icon: <BicycleIcon />,
      title: "Fast and reliable delivery",
      desc: `Enjoy fast and reliable delivery straight to your doorstep. Our
    friendly and efficient delivery team always strives to deliver your
    order on time with a smile.`,
    },
  ];

  return (
    <div className={`${styles.perksContainer} ${styles.section}`}>
      <h2 className={styles.sectionhead}>Why Choose Us?</h2>
      <p className={styles.sectionSub}>
        Our commitment to quality and customer satisfaction sets us apart from
        the competition. From our locally sourced ingredients to our friendly
        service, we go above and beyond to ensure that every meal is a memorable
        one.
      </p>
      <div className={styles.perksList}>
        {perks.map((each, index) => (
          <div className={styles.perk} key={index}>
            <span>{each.icon}</span>
            <h3>{each.title}</h3>
            <p>{each.desc}</p>
          </div>
        ))}
        {/* <div className={styles.perk}>
          <IoFastFood />
          <h3>Customizable options</h3>
          <p>
            We offer a range of customizable options to suit your dietary needs
            and preferences. Our easy-to-use online ordering system makes it
            simple to customize your order.
          </p>
        </div>
        <div className={styles.perk}>
          <IoFastFood />
          <h3>Fast and reliable delivery</h3>
          <p>
            Enjoy fast and reliable delivery straight to your doorstep. Our
            friendly and efficient delivery team always strives to deliver your
            order on time with a smile.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Perks;
