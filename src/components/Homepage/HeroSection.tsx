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
        { link: "https://res.cloudinary.com/dxwpajciu/video/upload/v1692003203/cimfodd/videos/heroVideo_2_kicvm8.mp4" },
        { link: "https://res.cloudinary.com/dxwpajciu/video/upload/v1692003239/cimfodd/videos/heroVideo_1_frmlm1.mp4" },
        { link: "https://res.cloudinary.com/dxwpajciu/video/upload/v1692003195/cimfodd/videos/heroVideo_3_suruwg.mp4" }
    ];

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentVideo === videos.length - 1) {
                setCurrentVideo(0);
                return;
            }
            // Else... 
            setCurrentVideo(currentVideo + 1)
        }, 5500);

        return () => clearInterval(intervalId);
    }, [currentVideo]);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentVideo((prevIndex) =>
    //             prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    //         );
    //     }, 5000);

    //     return () => clearInterval(intervalId);
    // }, [videos.length]);

    return (
        <div className={styles.heroSection}>
            <div className={styles.videoBackground}>
                <div className={styles.videoBackground__overlay}></div>
                <video src={videos[currentVideo].link} autoPlay loop muted />
            </div>
            <div className={styles.heroSection__textArea}>
                <div className={styles.top}>
                    <span>Hungry?</span>
                    <h1>Your First Decentralized Food Ordering Application</h1>
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
