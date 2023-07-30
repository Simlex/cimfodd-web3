import styles from "../../styles/Home.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CaretRightIcon } from "../SVGs/SVGicons";

const HeroSection = () => {

    const images = [
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678964006/uploads/hero_imgs/food_bowl_hdzsef.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963988/uploads/hero_imgs/rice_meat_q9dmuv.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963995/uploads/hero_imgs/pizza_tvhjgi.png" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678964008/uploads/hero_imgs/chicken_cknm59.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963999/uploads/hero_imgs/chicken_bread_yhlrcl.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963996/uploads/hero_imgs/grilled_meat_uuiooj.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963980/uploads/hero_imgs/toast_xcabk1.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963988/uploads/hero_imgs/rice_meat_q9dmuv.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678964006/uploads/hero_imgs/food_bowl_hdzsef.jpg" },
        { link: "https://res.cloudinary.com/dxwpajciu/image/upload/v1678963999/uploads/hero_imgs/chicken_bread_yhlrcl.jpg" },
    ];

    const videos = [
        { link: "https://res.cloudinary.com/dxwpajciu/video/upload/v1678963389/uploads/pexels-cristian-rojas-7613411_cuzsqc.mp4" },
        { link: "https://res.cloudinary.com/dxwpajciu/video/upload/v1678963723/uploads/pexels-taryn-elliott-7172269_zallvg.mp4" },
        { link: "https://res.cloudinary.com/dxwpajciu/video/upload/v1678963562/uploads/production_meal_uo2lty.mp4" },
    ];

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (currentVideo <= videos.length) setCurrentVideo(currentVideo + 1);
            setCurrentVideo(0)
        }, 5500);
    }, [currentVideo]);

    return (
        <div className={styles.heroSection}>
            <div className={styles.videoBackground}>
                <div className={styles.videoBackground__overlay}></div>
                <video src={videos[0].link} autoPlay loop muted />
            </div>
            <div className={styles.heroSection__textArea}>
                <div className={styles.top}>
                    <span>Hungry?</span>
                    <h1>Just Come to Cimfodd & order</h1>
                </div>
                <div className={styles.bottom}>
                    <p>
                        Order now and satisfy your hunger with our delicious and wholesome
                        selection of food.
                    </p>
                    <div className={styles.bottom__cta}>
                        <Link href="/product" passHref>
                            <button>
                                Explore More <CaretRightIcon />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.heroSection__imageArea}>
                <div className={styles.imageContainer}>
                    <div className={styles.image}>
                        <img src="/img/food_bowl.jpg" alt="" width="240" height="240" />
                    </div>
                    <div className={styles.additional}>
                        {images.map((each, index) => (
                            <span key={index}>
                                <img src={each.link} alt="" width="64" height="64" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
