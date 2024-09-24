// Packages
// import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import QueryWrapper from "../../wrappers/QueryWrapper";
import { Styled } from "../../../../utilities/theme/common";


interface ImageProps {
    url?: any,
    fullUrl?: any,
    handleClick?: () => void
    sx?: any
};

// Compoonent
const Image = ({
    // Props w/defaults
    url,
    fullUrl,
    handleClick = () => {},
    sx = {
        width: "100%",
        height: "auto"
    }
}: ImageProps | any) => ( // Prop Types
    <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
    >
        <Styled.PictureFrame>
            {(!url && !fullUrl)
                ? (
                    <LazyLoadImage
                        alt={"test1234"}
                        height={sx?.height || "auto"}
                        src={"https://unsplash.it/400/600"} // use normal <img> attributes as props
                        width={sx?.width || "100%"}
                    />
                ) : (
                    <QueryWrapper 
                        path={(paths: { local: string }) => fullUrl
                            ? fullUrl
                            : `${paths.local}/images/${url}`
                        }
                    >
                        {({ image }: { image: string }) => (
                            <LazyLoadImage
                                alt={"test1234"}
                                height={sx?.height || "auto"}
                                src={image} // use normal <img> attributes as props
                                width={sx?.width || "100%"}
                            />
                        )}
                    </QueryWrapper>
                )
            }
        </Styled.PictureFrame>
    </motion.div>
);

export default Image;
