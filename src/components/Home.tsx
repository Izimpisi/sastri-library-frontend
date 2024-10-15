"use client"
import "./Home.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { Stack, Button, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const onToRegisterNavigation = () => {
        router.push("/auth/register");
    }

    const onToLoginNavigation = () => {
        router.push("/auth/login");
    }
    const text = `"The reading of books is the most glorious pastime that humankind has yet devised. 
    In the stillness of the library, you will find horizons beyond your wildest imaginingss."- Carl Sagan, Cosmos`.split('');

    return (
        <div className="home-cover-wrapper-div">
            <div className="spin-logo-class">
                <motion.div
                    className="box"
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                    }}
                    animate={{
                        scale: [1, 1.1, 1, 1.1, 1], // Small oscillations in size
                        rotate: [0, 180, 180, 0]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.5, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 2, // Shorter delay between animations
                    }}
                >
                    <Image
                        src="/logo.png" // Replace with your image path
                        alt="Description of image" // Add a meaningful alt text
                        layout="fill" // Fills the parent container
                        objectFit="contain"
                        style={{ borderRadius: "inherit" }} // Maintains aspect ratio
                    />
                </motion.div>
                <Box className="svg-carrier-div" sx={{display: {
                    xs: 'none', // Hide on extra-small screens (mobile)
                    sm: 'none', // Hide on small screens (tablets)
                    md: 'none', // Hide on medium screens (like small laptops)
                    lg: 'block', // Visible on large screens and above
                }}}>
                    <svg id="logo">
                        <text x="50%" y="60%" fill="transparent" textAnchor="middle">
                            Sastri Library Management System
                        </text>
                    </svg>
                </Box>
                <div className="background-image-div">
                </div>
            </div>
            <div className="animated-text-landing">
                {text.map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.10,
                            delay: i / 10,
                        }}
                        key={i}
                    >
                        {el}
                    </motion.span>
                ))}
            </div>
            <div className="home-cover-buttons">
                <Stack direction="row" spacing={2}>
                    <Button color="success" onClick={onToRegisterNavigation} variant="outlined">Get Started and Register Library Account</Button>
                    <Button onClick={onToLoginNavigation} variant="contained" endIcon={<PersonIcon />}>
                        Already have an Account? Log in
                    </Button>
                </Stack>
            </div>
        </div>

    );
}


