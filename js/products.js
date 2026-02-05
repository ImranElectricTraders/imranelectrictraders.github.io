// Product Database for Imran Electric Traders
const defaultImg = "image/logo.jpg";

const productsDB = {
    "China Fitting": [
        {
            name: "Piano Switch",
            brand: "Pioneer",
            price: "Rs. 45",
            images: [defaultImg],
            desc: "Classic piano style switch, durable and smooth operation.",
            features: ["10A Current", "Polycarbonate Body", "Smooth Click", "White Gloss Finish"]
        },
        {
            name: "Universal Socket",
            brand: "Pioneer",
            price: "Rs. 65",
            images: [defaultImg],
            desc: "Multi-pin universal socket for all plug types.",
            features: ["Safety Shutter", "Brass Terminals", "Heat Resistant", "Fits all plugs"]
        },
        {
            name: "Fan Dimmer",
            brand: "Osaka",
            price: "Rs. 120",
            images: [defaultImg],
            desc: "Capacitor based fan speed regulator for hum-free operation.",
            features: ["No Hum Noise", "5 Speed Steps", "Energy Saving", "Long Life"]
        },
        {
            name: "Power Plug",
            brand: "Pioneer",
            price: "Rs. 150",
            images: [defaultImg],
            desc: "Heavy duty power plug for AC and heaters.",
            features: ["20A Rating", "Ceramic Back", "Heavy Brass", "Indicator Light"]
        },
        {
            name: "Bell Push",
            brand: "Pioneer",
            price: "Rs. 55",
            images: [defaultImg],
            desc: "Stylish bell push button with symbol.",
            features: ["Water Splash Proof", "Spring Action", "Easy to clean", "Icon Marked"]
        },
        {
            name: "Light Plug",
            brand: "Pioneer",
            price: "Rs. 50",
            images: [defaultImg],
            desc: "Standard 2-pin socket for chargers and lamps.",
            features: ["Tight Grip", "Spark Proof", "Standard Size", "Durable"]
        }
    ],
    "Fiber Sheet": [
        {
            name: "Green Fiber Sheet 4x8",
            brand: "SuperStrong",
            price: "Contact for Rate",
            images: [defaultImg],
            desc: "Standard green fiber sheet for sun shades.",
            features: ["UV Protection", "Weather Proof", "Standard Thickness", "Lightweight"]
        },
        {
            name: "Blue Fiber Sheet 4x8",
            brand: "SuperStrong",
            price: "Contact for Rate",
            images: [defaultImg],
            desc: "Cool blue shade fiber sheet, blocks more heat.",
            features: ["Cooling Effect", "Flexible", "Unbreakable", "Fade Resistant"]
        },
        {
            name: "Clear Corrugated Sheet",
            brand: "PlexiGlass",
            price: "Contact for Rate",
            images: [defaultImg],
            desc: "Transparent corrugated sheet for skylights.",
            features: ["90% Light Pass", "Yellowing Resistant", "High Impact", "Easy Cut"]
        },
        {
            name: "Available Textured Sheet",
            brand: "Designer",
            price: "Contact for Rate",
            images: [defaultImg],
            desc: "Decorative textured sheet for privacy screens.",
            features: ["Privacy Blur", "Diamond Texture", "Multiple Colors", "Interior Use"]
        },
        {
            name: "Heavy Duty Sheet 2mm",
            brand: "Titan",
            price: "Contact for Rate",
            images: [defaultImg],
            desc: "Extra thick fiber sheet for industrial roofing.",
            features: ["2mm Thick", "Storm Proof", "Walkable", "20 Year Life"]
        }
    ],
    "Extension Leads": [
        {
            name: "3-Way Extension 3M",
            brand: "Imran Power",
            price: "Rs. 350",
            images: [defaultImg],
            desc: "Basic 3 socket extension with 3 meter wire.",
            features: ["Copper Wire", "On/Off Button", "Compact", "Daily Use"]
        },
        {
            name: "5-Way Extension 5M",
            brand: "Imran Power",
            price: "Rs. 650",
            images: [defaultImg],
            desc: "Long reach 5 socket board for multimedia.",
            features: ["Heavy Wire", "Surge Check", "Individual Switches", "Wall Mountable"]
        },
        {
            name: "Round Reel Extension",
            brand: "PowerMaster",
            price: "Rs. 1200",
            images: [defaultImg],
            desc: "Spinning reel extension for garden and tools.",
            features: ["10 Meter", "Easy Wind", "Handle Grip", "Overload Fuse"]
        },
        {
            name: "Universal Spike Buster",
            brand: "Belkin Copy",
            price: "Rs. 850",
            images: [defaultImg],
            desc: "Spike protector for computers and sensitive electronics.",
            features: ["Surge Protection", "Universal Ports", "Master Switch", "Fuse"]
        },
        {
            name: "Travel Adapter",
            brand: "Universal",
            price: "Rs. 200",
            images: [defaultImg],
            desc: "All-in-one travel plug for international pins.",
            features: ["Us/UK/EU Pins", "Compact", "Travel Friendly", "Solid Build"]
        }
    ],
    "Lights": [
        {
            name: "12W SMD Downlight",
            brand: "Philips",
            price: "Rs. 280",
            images: [defaultImg],
            desc: "Best selling ceiling light.",
            features: ["High Lumen", "Cool DayLight", "Anti-Glare", "Long Life"]
        },
        {
            name: "18W LED Panel",
            brand: "Osaka",
            price: "Rs. 450",
            images: [defaultImg],
            desc: "Square surface/concealed panel light.",
            features: ["Slim Design", "Bright White", "Energy A++", "Wide Angle"]
        },
        {
            name: "7W LED Bulb",
            brand: "Osaka",
            price: "Rs. 180",
            images: [defaultImg],
            desc: "Standard E27 screw bulb.",
            features: ["Unbreakable", "Instant On", "Warm/White", "1 Year Warranty"]
        },
        {
            name: "30W Flood Light",
            brand: "Homage",
            price: "Rs. 1500",
            images: [defaultImg],
            desc: "Outdoor waterproof flood light.",
            features: ["IP65 Waterproof", "High Brightness", "Metal Body", "Garden Use"]
        },
        {
            name: "Rope Light (Per Yard)",
            brand: "Decoration",
            price: "Rs. 120",
            images: [defaultImg],
            desc: "Flexible rope light for ceilings decorations.",
            features: ["Golden/Blue/White", "Flexible", "Waterproof", "Interior Design"]
        }
    ],
    "Circuit Breakers": [
        {
            name: "Single Pole Breaker 10A",
            brand: "Schneider",
            price: "Rs. 350",
            images: [defaultImg],
            desc: "For room protection.",
            features: ["10 Amp", "Din Rail", "Trip Free", "Original"]
        },
        {
            name: "Double Pole Breaker 63A",
            brand: "Terasaki",
            price: "Rs. 1200",
            images: [defaultImg],
            desc: "Main switch breaker for home.",
            features: ["63 Amp", "Double Pole", "Heavy Duty", "Safety Main"]
        },
        {
            name: "Earth Leakage (ELCB)",
            brand: "Fuji",
            price: "Rs. 2500",
            images: [defaultImg],
            desc: "Life saver shock-proof breaker.",
            features: ["30mA Sensitivity", "Anti-Shock", "Auto Trip", "Must for Home"]
        },
        {
            name: "MCCB 100A",
            brand: "Hyundai",
            price: "Rs. 4500",
            images: [defaultImg],
            desc: "Molded case circuit breaker for industry.",
            features: ["100 Amp", "3 Phase", "Adjustable", "Industrial"]
        },
        {
            name: "Change Over Switch",
            brand: "Local Heavy",
            price: "Rs. 800",
            images: [defaultImg],
            desc: "Manual generator changeover.",
            features: ["Pure Copper", "Ceramic Base", "Knife Switch", "Reliable"]
        }
    ],
    "Cabels/Wiring": [
        {
            name: "Cable 3/29 Coil (90m)",
            brand: "GM Cables",
            price: "Rs. 3800",
            images: [defaultImg],
            desc: "Standard wiring cable for lights and fans.",
            features: ["99.9% Copper", "PVC Grade 1", "No Smoke", "Voltage 450V"]
        },
        {
            name: "Cable 7/29 Coil (90m)",
            brand: "Pakistan Cables",
            price: "Rs. 7500",
            images: [defaultImg],
            desc: "Mian power cable for plugs and ACs.",
            features: ["Stranded Copper", "High Load", "Heat Resistant", "Certified"]
        },
        {
            name: "Flexible Wire 40/76",
            brand: "Local Premium",
            price: "Rs. 35/yd",
            images: [defaultImg],
            desc: "Flexible two core wire for extensions.",
            features: ["Two Core", "Flexible", "Good Insulation", "Multi-colors"]
        },
        {
            name: "Service Drop Wire",
            brand: "Wapda Spec",
            price: "Rs. 120/m",
            images: [defaultImg],
            desc: "Main meter to DB cable.",
            features: ["Aluminum/Copper", "Weather Proof", "Black Insulation", "Outdoor"]
        },
        {
            name: "Network Cable Cat6",
            brand: "D-Link",
            price: "Rs. 45/m",
            images: [defaultImg],
            desc: "High speed internet cable.",
            features: ["Gigabit Speed", "4 Pair", "Low Loss", "Grey Color"]
        }
    ],
    "Our Services": [
        {
            name: "Complete Home Wiring",
            brand: "Imran Services",
            price: "Contact for Quote",
            images: [defaultImg],
            desc: "Professional wiring services for new and old houses.",
            features: ["Underground Wiring", "DB Box Setup", "Short Circuit Repair", "Certified Electricians"]
        },
        {
            name: "Solar System Installation",
            brand: "Imran Services",
            price: "Contact for Quote",
            images: [defaultImg],
            desc: "Complete solar solution for home and office.",
            features: ["Inverter Setting", "Panel Mounting", "Net Metering Help", "Maintenance"]
        },
        {
            name: "Generator Fitting & Repair",
            brand: "Imran Services",
            price: "Contact for Quote",
            images: [defaultImg],
            desc: "Expert installation of gas and petrol generators.",
            features: ["Changeover Switch", "ATS Panel", "Oil Change", "Troubleshooting"]
        },
        {
            name: "Industrial Wiring Upgrade",
            brand: "Imran Services",
            price: "Contact for Quote",
            images: [defaultImg],
            desc: "Heavy duty wiring for factories and machines.",
            features: ["3-Phase Wiring", "Motor Control", "Safety Audit", "Cable Management"]
        }
    ]
};
