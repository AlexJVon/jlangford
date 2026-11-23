/*
  PORTFOLIO DATA
  ---------------------------------------------------------------
  This is the only file you need to edit to add, remove, or reorder
  projects and photos.

  - Image files live in  images/projects/
  - "cover" is the photo shown on the project card (defaults to the first image).
  - "featured: true" puts the project on the home page.
  - To remove a photo, delete its line. To reorder, move the lines.
  - Captions are optional:  { src: "photo.jpg", caption: "Front porch" }
*/

window.CATEGORIES = [
  { slug: "residential",      label: "Residential",      cover: "west%20porch.jpg" },
  { slug: "mixed-use",        label: "Mixed-Use",        cover: "mixed-use_powellbw.jpg" },
  { slug: "neighborhoods",    label: "Neighborhoods",    cover: "brytan%20live%20work%20rendering.jpg" },
  { slug: "commercial",       label: "Commercial",       cover: "estuary%20bw.jpg" },
  { slug: "livework",         label: "Live/Work",        cover: "livework_langfordbw.jpg" },
  { slug: "leed-certified",   label: "LEED® Certified",  cover: "streetscapebw.jpg" },
  { slug: "multi-family",     label: "Multi-Family",     cover: "p1010018.jpg" },
  { slug: "universal-design", label: "Universal Design", cover: "universal-crop-u10108.jpg" },
  { slug: "fortified-homes",  label: "Fortified Homes",  cover: "estuary%20012.jpg" }
];

window.PROJECTS = [
  /* ---------------- MIXED-USE ---------------- */
  {
    name: "Powell Building", category: "mixed-use", featured: true,
    location: "Haile Village Center, Gainesville, FL",
    description: "The Powell Building is a classically styled mixed-use building occupying a prominent vista in the Haile Village Center. It employs durable exterior finishes of brick and concrete precast details.",
    details: [
      ["Year Built", "2006"],
      ["1st Floor", "2,175 sq ft commercial — 7 offices, reception, lobby, conference, break and work rooms"],
      ["2nd Floor", "2,647 sq ft — two 2-bedroom, 2-bath apartments"],
      ["3rd Floor", "2,151 sq ft — 3-bedroom, 3-bath apartment with study"],
      ["Builder", "Joyner Construction"]
    ],
    images: ["front%20facade.jpg", "powell%201.jpg", "powell%202.jpg", "powell%203.jpg", "powell%204.jpg",
             "front%20elevation.png", "first%20floor.png", "second%20floor.png", "third%20floor.png"]
  },
  {
    name: "Cornell Building", category: "mixed-use",
    location: "Haile Market Square, Gainesville, FL",
    description: "The Cornell Building is a 2-story mixed-use building, sited in Haile market square. Cornell & Associates real estate office occupies the first floor commercial space. Above, on the second floor, is a luxury apartment.",
    images: ["cornell_1.jpg", "drawings.jpg"]
  },
  {
    name: "The Village Lofts", category: "mixed-use",
    location: "Haile Village Center, Gainesville, FL",
    description: "The Village Lofts Building in Gainesville Florida’s Haile Village Center houses two floors of residential space above the law office of Fisher, Butts, Sechrest & Warner, P.A. The mixed-use building sits across from the town hall and adjacent to a plaza, creating a textured urban edge for this outdoor civic space.",
    images: ["bobsbldg38.jpg", "bobsbldg38_2.jpg", "p1010006.jpg", "p1010007.jpg", "fp_3.png", "fp_2.png", "fp_1.png"]
  },
  {
    name: "Harris Salon", category: "mixed-use",
    location: "Gainesville, FL", cover: "exterior%20facade_straightened.jpg",
    description: "This traditional design takes full advantage of a very small site.",
    details: [["Year Built", "2004"], ["Builder", "Warring Construction"]],
    images: ["exterior%20facade_straightened.jpg", "harris%201.jpg", "harris%202.jpg", "interior%20ceiling.jpg",
             "1st%20floor%20plan_harris.png", "2nd%20floor%20plan_harris.png"]
  },

  /* ---------------- UNIVERSAL DESIGN ---------------- */
  {
    name: "Brytan, Lot 69", category: "universal-design",
    location: "Brytan, Gainesville, FL",
    description: "Within the design of this home, we have considered Universal Design characteristics, creating a home that is accessible by people of varying ages and abilities. We have provided ramped access from the front of the home as well as from within the garage for gentle transition into the first floor living space. Additionally, the stair width is large enough to accommodate a stair chair lift. With these subtle modifications, the home fits into the Craftsman Style New Urbanist neighborhood it was designed for.",
    images: ["001.jpg", "7_1%20011.jpg", "7_1%20006.jpg", "7_1%20007.jpg", "7_1%20008.jpg", "7_1%20014.jpg", "002.jpg", "003.jpg"]
  },

  /* ---------------- COMMERCIAL ---------------- */
  {
    name: "O2B Kids", category: "commercial",
    images: ["018.jpg", "023.jpg", "032.jpg"]
  },
  {
    name: "Estuary Clubhouse", category: "commercial",
    location: "Steinhatchee, FL",
    images: ["estuary%20007.jpg", "estuary%20008.jpg", "estuary%20009.jpg", "estuary%20011.jpg", "estuary%20015.jpg", "floorplan.jpg"]
  },
  {
    name: "Haile Plantation Community Pool House", category: "commercial",
    location: "Gainesville, FL", cover: "p10100322.jpg",
    images: ["p10100322.jpg", "p1010036.jpg", "p1010037.jpg", "p1010038.jpg", "p1010039.jpg", "p1010040.jpg", "floor%20plan.jpg"]
  },
  {
    name: "60 North Main", category: "commercial",
    location: "High Springs, FL",
    links: [["60NorthMain.com", "http://www.60northmain.com/"]],
    images: ["00110.jpg", "0025.jpg"]
  },
  {
    name: "WHP", category: "commercial",
    location: "Gainesville, FL",
    details: [["General Contractor", "D. E. Scorpio Corporation"]],
    links: [["whpinc.com", "http://whpinc.com/"]],
    images: ["whp_01.jpg", "whp_02.jpg", "whp_03.jpg", "whp_04.jpg", "whp_05.jpg", "whp_06.jpg"]
  },
  {
    name: "Nephrology Clinic", category: "commercial",
    location: "Lake City, FL",
    details: [["General Contractor", "Robinson Renovation"]],
    images: ["algk_01.jpg"]
  },
  {
    name: "Haile Jewelry & Loan", category: "commercial",
    location: "Gainesville, FL",
    images: ["asbell_01.jpg", "asbell_02.jpg", "asbell_03.jpg"]
  },

  /* ---------------- LIVE/WORK ---------------- */
  {
    name: "Brytan Live/Work", category: "livework",
    location: "Brytan, Gainesville, FL",
    description: "The Brytan Live/Work units are designed with maximum flexibility. The first floor street frontage has a level entry and can be used for studio, office, retail or residential use. The design allows the spaces to be separated incrementally to suit a variety of space configurations.",
    images: ["brytan%20live%20work%20rendering2.jpg", "drawings1.jpg", "drawings2.jpg", "drawings3.jpg"]
  },
  {
    name: "Langford Live/Work", category: "livework", featured: true,
    location: "Haile Village Center, Gainesville, FL", cover: "langford%205.jpg",
    description: "The Langford Building is a Live/Work unit in the urban setting of the Haile Village Center in Gainesville, Florida, located next door to the Langford Office building. A 524 sq ft commercial space exists on the ground level, and above is an 837 sq ft one-bedroom apartment, accessible on grade via a conditioned stair and foyer/laundry nook.",
    images: ["langford%201.jpg", "langford%202.jpg", "langford%203.jpg", "langford%204.jpg", "langford%205.jpg", "langford%206.jpg", "floor%20plans.png"]
  },

  /* ---------------- LEED CERTIFIED ---------------- */
  {
    name: "Stanley Residence", category: "leed-certified", featured: true,
    cover: "untitled-5.jpg",
    description: "The approach was to balance the lessons and techniques employed in the local vernacular for passive cooling, lighting, durability and livability with the high-tech materials and systems available today.",
    details: [["Total Area", "2,165 sq ft"], ["Program", "3 bedrooms, 2.5 bathrooms"], ["Photographer", "Mark J. Koper"]],
    links: [["Project website", "http://stanleyresidence.blogspot.com/"],
            ["Mark J. Koper Photography", "https://www.houzz.com/pro/mjkoper/mark-j-koper-photography"]],
    images: ["11%2008%202010%20053.jpg", "untitled-5.jpg", "untitled-11.jpg", "untitled-13.jpg", "untitled-20.jpg",
             "untitled-23.jpg", "untitled-24.jpg", "untitled-30.jpg", "untitled-37.jpg", "untitled-38.jpg",
             "untitled-40.jpg", "untitled-42.jpg", "untitled-43.jpg", "untitled-45.jpg", "untitled-46.jpg",
             "untitled-48.jpg", "untitled-50.jpg", "untitled-53.jpg", "untitled-54.jpg", "untitled-62.jpg"]
  },
  {
    name: "Brytan, Lot 70", category: "leed-certified",
    location: "Brytan, Gainesville, FL",
    description: "This project, one of the first three designed for the Brytan development, has complied with the LEED for Homes program and has achieved LEED® Gold Certification.",
    images: ["p1010009.jpg", "p1010016.jpg", "p1010020.jpg", "p1010024.jpg", "p1010028.jpg",
             "p1010029.jpg", "p1010030.jpg", "p1010031.jpg", "p1010032.jpg", "p1010033.jpg"]
  },
  {
    name: "Brytan, Lot 82", category: "leed-certified",
    location: "Brytan, Gainesville, FL", cover: "lot%2082%20(3).jpg",
    description: "This project, one of the first three designed for the Brytan development, has complied with the LEED for Homes program and has achieved LEED® Silver Certification.",
    images: ["lot%2082%20(1).jpg", "lot%2082%20(3).jpg", "lot%2082%20(4).jpg", "lot%2082%20(5).jpg",
             "lot%2082%20(9).jpg", "lot%2082%20(10).jpg", "p1010044.jpg"]
  },
  {
    name: "Brytan, Lot 83", category: "leed-certified",
    location: "Brytan, Gainesville, FL",
    description: "This project, one of the first three designed for the Brytan development, has complied with the LEED for Homes program and has achieved LEED® Silver Certification.",
    images: ["lot%2083%20(2).jpg", "lot%2083%20(6).jpg", "lot%2083%20(7).jpg", "lot%2083%20(8).jpg", "lot%2083%20(12).jpg",
             "lot%2083%20(14).jpg", "lot%2083%20(17).jpg", "lot%2083%20(19).jpg", "lot%2083%20(20).jpg", "lot%2083.jpg"]
  },

  /* ---------------- MULTI-FAMILY ---------------- */
  {
    name: "Bunzmann Triplex", category: "multi-family", cover: "p1010015_straightened.jpg",
    images: ["p1010015_straightened.jpg", "p1010017.jpg", "p10100182.jpg", "first_floor.jpg", "second_floor.jpg"]
  },
  {
    name: "Village Center Townhomes", category: "multi-family", cover: "p5090028.jpg",
    location: "Haile Village Center, Gainesville, FL",
    images: ["p5090028.jpg", "mvc-006f.jpg", "p5090032.jpg", "p9210007.jpg", "elev.png", "fp_12.png"]
  },
  {
    name: "B&H Triplex", category: "multi-family",
    images: ["b-h3plex.jpg", "2_1.jpg", "3_1.jpg"]
  },

  /* ---------------- RESIDENTIAL ---------------- */
  {
    name: "Langford River House", category: "residential", featured: true,
    images: ["p1080017.jpg", "p1080019.jpg", "p1080020.jpg", "1_1.jpg", "els.jpg", "fps.jpg"]
  },
  {
    name: "Fisher Residence", category: "residential",
    images: ["p1010002.jpg", "p1010005.jpg", "p10100072.jpg", "fps2.jpg"]
  },
  {
    name: "Horne Residence", category: "residential",
    images: ["2.jpg", "3.jpg", "4.jpg", "5.jpg"]
  },
  {
    name: "Drenner Residence", category: "residential", cover: "02.jpg",
    images: ["01.jpg", "02.jpg", "03.jpg", "32.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"]
  },
  {
    name: "Farb Residence", category: "residential", cover: "farbfrontpic.jpg",
    images: ["farbfrontpic.jpg", "farbporch.jpg", "farblrpic.jpg", "farbsunroompic.jpg", "farbstairwaypic.jpg",
             "farbbathroompic.jpg", "farbfrontelev.jpg", "drawings4.jpg"]
  },
  {
    name: "Bryant Residence", category: "residential", cover: "bryantfront.jpg",
    images: ["bryantfront.jpg", "012.jpg", "1.jpg", "022.jpg"]
  },
  {
    name: "West Residence", category: "residential", featured: true,
    images: ["0012.jpg", "0022.jpg", "0032.jpg", "004.jpg", "005.jpg", "007.jpg", "008.jpg", "009.jpg",
             "010.jpg", "011.jpg", "0122.jpg", "013.jpg", "014.jpg", "015.jpg", "016.jpg", "017.jpg"]
  },
  {
    name: "West Cottage", category: "residential",
    images: ["p1010026.jpg", "p1010025.jpg", "p1010027.jpg", "p10100282.jpg", "p10100292.jpg", "p10100302.jpg", "p10100312.jpg"]
  },
  {
    name: "The Dent 1239", category: "residential", location: "Augusta, GA",
    images: ["0013.jpg", "0023.jpg", "0033.jpg", "0042.jpg", "elevation_f.png", "elevation_b.png", "dent%201239%20fp.png"]
  },
  {
    name: "The Norfleet", category: "residential", location: "Augusta, GA",
    images: ["0014.jpg", "0024.jpg", "0034.jpg", "0043.jpg", "0052.jpg", "norfleet%201237%20el.png", "norfleet%201237%20fp.png"]
  },
  {
    name: "The Ruffin I", category: "residential", location: "Augusta, GA",
    images: ["0015.jpg", "ruffin%20fp.png"]
  },
  {
    name: "The Ruffin II", category: "residential", location: "Augusta, GA",
    images: ["0016.jpg", "ruffin%20ii%20el.png", "ruffin%20ii%20fp.png"]
  },
  {
    name: "The Dent 1224", category: "residential", location: "Augusta, GA",
    images: ["0017.jpg", "dent%20fp.png"]
  },
  {
    name: "The Hyde Park 1152", category: "residential", location: "Augusta, GA",
    images: ["0018.jpg", "elevation.png", "floor%20plan.png", "typical%20wall%20section.png"]
  },
  {
    name: "The Westin I", category: "residential", location: "Augusta, GA",
    images: ["elevation2.png", "floor%20plan2.png"]
  },
  {
    name: "The Westin II", category: "residential", location: "Augusta, GA",
    images: ["0019.jpg", "westin%20el.png", "westin%20fp.png"]
  },
  {
    name: "Harris Residence", category: "residential", cover: "4835%20sw%2091%20way-9.jpg",
    images: ["4835%20sw%2091%20way-10.jpg", "4835%20sw%2091%20way-9.jpg", "4835%20sw%2091%20way-8.jpg",
             "4835%20sw%2091%20way-7.jpg", "4835%20sw%2091%20way-6.jpg", "4835%20sw%2091%20way-5.jpg",
             "4835%20sw%2091%20way-4.jpg", "4835%20sw%2091%20way-3.jpg", "4835%20sw%2091%20way-2.jpg",
             "4835%20sw%2091%20way-1.jpg"]
  },

  /* ---------------- FORTIFIED HOMES ---------------- */
  {
    name: "Redfish", category: "fortified-homes", featured: true,
    location: "Florida Gulf Coast", cover: "estuary%20010.jpg",
    description: "The coastal location of this Florida residence faces several potential threats. We have used Fortified for Safer Living guidelines in order to increase the safety and stability of its construction. Structurally, this home supersedes national building code, and it uses impact resistant windows. The structure is constructed of insulated concrete form (ICF), which allows resistance to wall damage, extreme wind, earthquakes, flooding and fire. Additionally, we raised the living spaces, providing beneficial storage and utility space on the ground level, and most importantly flood mitigation.",
    images: ["redfish_2.png", "estuary%20010.jpg", "estuary%20017.jpg", "estuary%20005.jpg", "estuary%20003.jpg",
             "estuary%20004.jpg", "p10100202.jpg", "p1010021.jpg"]
  },

  /* ---------------- NEIGHBORHOODS ---------------- */
  {
    name: "Haile Village Center", category: "neighborhoods", featured: true,
    location: "Gainesville, FL", cover: "exterior%20facade_straightened2.jpg",
    description: "The Haile Village Center is a 45-acre New Urbanist development near Gainesville, FL. It is a traditionally styled neighborhood featuring a mixed-use main street, apartments, townhouses, and single family houses sited in a sophisticated grid of streets, alleys, and green spaces.",
    images: ["hvc%20map.jpg", "exterior%20facade_straightened2.jpg", "bryant%202.jpg", "p1010014.jpg", "p5090028.jpg"]
  },
  {
    name: "Brytan", category: "neighborhoods",
    location: "Gainesville, FL", cover: "7_1%20011.jpg",
    images: ["brytanmasterplan.jpg", "7_1%20011.jpg", "p1010008.jpg", "p1010011.jpg", "p10100162.jpg"]
  },
  {
    name: "Laney Walker / Bethlehem Revitalization", category: "neighborhoods",
    location: "Augusta, GA", cover: "streetscape.jpg",
    description: "Laney Walker/Bethlehem was once a thriving neighborhood, but by the 1980s had begun to decline. Many people moved away and businesses closed with decreased economic development and residential construction. In 2008, City leaders approved long-term funding for community development in Laney Walker/Bethlehem. Led by the Augusta Housing and Community Development Department, the City is employing a multi-phased approach to guide redevelopment, growth and sustainability in this historic community.",
    images: ["lwb%20map.jpg", "streetscape.jpg", "lwb%20neighborhood%20b.png", "0042.jpg", "0052.jpg",
             "0017.jpg", "0018.jpg", "0015.jpg", "0016.jpg", "0019.jpg"]
  }
];
