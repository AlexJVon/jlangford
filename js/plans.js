/*
  PLAN LIBRARY DATA
  ==========================================================================
  EASIEST WAY TO ADD A PLAN:  open  add-plan.html  in the browser, fill in
  the form, and it writes the block below for you. Paste it above the
  "ADD NEW PLANS ABOVE THIS LINE" marker at the bottom of this file.

  Drawing files go in   plans/<plan-id>/   (images or PDFs).

  Every field except name and sheets is optional — leave out what you don't
  know and the site simply won't show it.

  {
    id: "my-plan",                       // used in the web address; lowercase, dashes
    name: "The Magnolia",
    type: "Single-Family",               // Single-Family, Cottage, Townhouse, Live/Work,
                                         // Mixed-Use, Multi-Family, Commercial, Neighborhood Plan
    collection: "Custom Residential",    // groups plans together
    location: "Gainesville, FL",
    year: "2024",
    style: "Craftsman",
    hidden: false,                       // true = not listed (but anyone with the link can still see it)
    project: "portfolio-project-id",     // links to the built project's photos

    specs: {                             // numbers used by the search filters
      heated: 1850, underRoof: 2600,     // square feet
      beds: 3, baths: 2.5, stories: 2,
      width: "32'-0\"", depth: "58'-0\"",
      minLot: "42' (alley-loaded)", lotFt: 42,   // lotFt powers the "fits a lot" filter
      garage: "2-car, alley-loaded"
    },
    features: ["Wrap-around porch", "First-floor owner's suite"],   // short, plain-English
    summary: "One or two paragraphs for homeowners.",
    tech: {                              // builder/architect detail — any headings, any rows
      "Structure & Envelope": [["Foundation", "Slab-on-grade"], ["Walls", "2x6 wood frame"]],
      "Code & Performance":   [["Design wind speed", "120 mph, Exp. B"]]
    },
    sheets: [                            // first sheet is the main image
      { src: "plans/my-plan/front.jpg",   title: "Front Elevation", type: "Elevation" },
      { src: "plans/my-plan/first.pdf",   title: "First Floor Plan", type: "Floor Plan", sheet: "A1.1" }
    ]
  }

  Sheet types: Floor Plan, Elevation, Section, Wall Section, Site Plan,
               Detail, Rendering, Photo, Other
  ==========================================================================
*/

window.PLANS = [

  /* ---------- Laney Walker / Bethlehem — Augusta, GA ---------- */
  {
    id: "dent-1239", name: "The Dent 1239", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-dent-1239",
    summary: "One of a family of house plans designed for the Laney Walker/Bethlehem revitalization in Augusta, Georgia — traditional homes sized for the neighborhood's historic lots and built to bring new owners back to the community.",
    sheets: [
      { src: "elevation_f.png", title: "Front Elevation", type: "Elevation" },
      { src: "elevation_b.png", title: "Rear Elevation", type: "Elevation" },
      { src: "dent%201239%20fp.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "norfleet", name: "The Norfleet", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-norfleet",
    summary: "A Laney Walker/Bethlehem house plan for Augusta's historic in-town lots.",
    sheets: [
      { src: "norfleet%201237%20el.png", title: "Elevation", type: "Elevation" },
      { src: "norfleet%201237%20fp.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "ruffin-i", name: "The Ruffin I", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-ruffin-i",
    summary: "A Laney Walker/Bethlehem house plan for Augusta's historic in-town lots.",
    sheets: [
      { src: "0015.jpg", title: "Built home", type: "Photo" },
      { src: "ruffin%20fp.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "ruffin-ii", name: "The Ruffin II", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-ruffin-ii",
    summary: "A variation of the Ruffin plan for the Laney Walker/Bethlehem neighborhood.",
    sheets: [
      { src: "ruffin%20ii%20el.png", title: "Elevation", type: "Elevation" },
      { src: "ruffin%20ii%20fp.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "dent-1224", name: "The Dent 1224", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-dent-1224",
    summary: "A Laney Walker/Bethlehem house plan for Augusta's historic in-town lots.",
    sheets: [
      { src: "0017.jpg", title: "Built home", type: "Photo" },
      { src: "dent%20fp.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "hyde-park-1152", name: "The Hyde Park 1152", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-hyde-park-1152",
    summary: "A Laney Walker/Bethlehem house plan. Its drawing set includes a typical wall section showing how the house goes together from foundation to roof.",
    sheets: [
      { src: "elevation.png", title: "Elevation", type: "Elevation" },
      { src: "floor%20plan.png", title: "Floor Plan", type: "Floor Plan" },
      { src: "typical%20wall%20section.png", title: "Typical Wall Section", type: "Wall Section" }
    ]
  },
  {
    id: "westin-i", name: "The Westin I", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-westin-i",
    summary: "A Laney Walker/Bethlehem house plan for Augusta's historic in-town lots.",
    sheets: [
      { src: "elevation2.png", title: "Elevation", type: "Elevation" },
      { src: "floor%20plan2.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "westin-ii", name: "The Westin II", type: "Single-Family",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "the-westin-ii",
    summary: "A variation of the Westin plan for the Laney Walker/Bethlehem neighborhood.",
    sheets: [
      { src: "westin%20el.png", title: "Elevation", type: "Elevation" },
      { src: "westin%20fp.png", title: "Floor Plan", type: "Floor Plan" }
    ]
  },

  /* ---------- Haile Village Center — Gainesville, FL ---------- */
  {
    id: "powell-building", name: "Powell Building", type: "Mixed-Use",
    collection: "Haile Village Center", location: "Gainesville, FL", year: "2006",
    style: "Classical", project: "powell-building",
    specs: { stories: 3 },
    features: ["Offices on the ground floor", "Two apartments on the 2nd floor", "Large 3-bedroom apartment on top"],
    summary: "A three-story classically styled building on a prominent vista in the Haile Village Center. Offices fill the ground floor, with homes above — the kind of building that makes a main street lively all day and night.",
    tech: {
      "Program by floor": [
        ["1st floor", "2,175 sq ft commercial — 7 offices, reception office, lobby, conference, break and work rooms"],
        ["2nd floor", "2,647 sq ft — two 2-bedroom, 2-bath apartments"],
        ["3rd floor", "2,151 sq ft — 3-bedroom, 3-bath apartment with study"]
      ],
      "Construction": [
        ["Exterior", "Brick with precast concrete details"],
        ["Builder", "Joyner Construction"]
      ]
    },
    sheets: [
      { src: "front%20elevation.png", title: "Front Elevation", type: "Elevation" },
      { src: "first%20floor.png", title: "First Floor Plan", type: "Floor Plan" },
      { src: "second%20floor.png", title: "Second Floor Plan", type: "Floor Plan" },
      { src: "third%20floor.png", title: "Third Floor Plan", type: "Floor Plan" },
      { src: "front%20facade.jpg", title: "Built — front facade", type: "Photo" }
    ]
  },
  {
    id: "village-lofts", name: "The Village Lofts", type: "Mixed-Use",
    collection: "Haile Village Center", location: "Gainesville, FL",
    project: "the-village-lofts",
    specs: { stories: 3 },
    summary: "Two floors of homes above a law office, facing the town hall and framing the edge of a public plaza.",
    sheets: [
      { src: "bobsbldg38.jpg", title: "Built", type: "Photo" },
      { src: "fp_1.png", title: "First Floor Plan", type: "Floor Plan" },
      { src: "fp_2.png", title: "Second Floor Plan", type: "Floor Plan" },
      { src: "fp_3.png", title: "Third Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "harris-salon", name: "Harris Salon", type: "Mixed-Use",
    collection: "Haile Village Center", location: "Gainesville, FL", year: "2004",
    project: "harris-salon",
    specs: { stories: 2 },
    summary: "A traditional design that takes full advantage of a very small site.",
    tech: { "Construction": [["Builder", "Warring Construction"]] },
    sheets: [
      { src: "exterior%20facade_straightened.jpg", title: "Built — front facade", type: "Photo" },
      { src: "1st%20floor%20plan_harris.png", title: "First Floor Plan", type: "Floor Plan" },
      { src: "2nd%20floor%20plan_harris.png", title: "Second Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "langford-live-work", name: "Langford Live/Work", type: "Live/Work",
    collection: "Haile Village Center", location: "Gainesville, FL",
    project: "langford-live-work",
    specs: { beds: 1, stories: 2 },
    features: ["Shop or office at street level", "Apartment above", "Private stair entry"],
    summary: "A small business space on the street with a one-bedroom apartment upstairs — work downstairs, live upstairs.",
    tech: {
      "Program": [
        ["Commercial (ground floor)", "524 sq ft"],
        ["Residential (2nd floor)", "837 sq ft, one bedroom"],
        ["Access", "On-grade entry to a conditioned stair and foyer/laundry nook"]
      ]
    },
    sheets: [
      { src: "floor%20plans.png", title: "Floor Plans", type: "Floor Plan" },
      { src: "langford%205.jpg", title: "Built", type: "Photo" }
    ]
  },
  {
    id: "village-center-townhomes", name: "Village Center Townhomes", type: "Townhouse",
    collection: "Haile Village Center", location: "Gainesville, FL",
    project: "village-center-townhomes",
    sheets: [
      { src: "elev.png", title: "Elevation", type: "Elevation" },
      { src: "fp_12.png", title: "Floor Plan", type: "Floor Plan" },
      { src: "p5090028.jpg", title: "Built", type: "Photo" }
    ]
  },
  {
    id: "haile-village-center-plan", name: "Haile Village Center", type: "Neighborhood Plan",
    collection: "Haile Village Center", location: "Gainesville, FL",
    project: "haile-village-center",
    specs: {},
    features: ["45 acres", "Mixed-use main street", "Grid of streets, alleys and greens"],
    summary: "A 45-acre New Urbanist village: a mixed-use main street, apartments, townhouses and single-family homes on a connected grid of streets, alleys and green spaces.",
    sheets: [
      { src: "hvc%20map.jpg", title: "Village Plan", type: "Site Plan" }
    ]
  },

  /* ---------- Brytan — Gainesville, FL ---------- */
  {
    id: "brytan-master-plan", name: "Brytan", type: "Neighborhood Plan",
    collection: "Brytan", location: "Gainesville, FL",
    project: "brytan",
    summary: "Master plan for the Brytan Traditional Neighborhood Development, home to several of the studio's LEED® certified houses.",
    sheets: [
      { src: "brytanmasterplan.jpg", title: "Master Plan", type: "Site Plan" },
      { src: "7_1%20011.jpg", title: "Built home in Brytan", type: "Photo" }
    ]
  },
  {
    id: "brytan-live-work", name: "Brytan Live/Work", type: "Live/Work",
    collection: "Brytan", location: "Gainesville, FL",
    project: "brytan-live-work",
    features: ["Level street entry", "Ground floor works as studio, office, retail or residence", "Can be divided over time"],
    summary: "Live/work units designed for maximum flexibility — the street-level space can be a studio, office, shop or more living space, and can be separated incrementally as needs change.",
    sheets: [
      { src: "brytan%20live%20work%20rendering2.jpg", title: "Rendering", type: "Rendering" },
      { src: "drawings1.jpg", title: "Drawings 1", type: "Other" },
      { src: "drawings2.jpg", title: "Drawings 2", type: "Other" },
      { src: "drawings3.jpg", title: "Drawings 3", type: "Other" }
    ]
  },

  /* ---------- Laney Walker / Bethlehem — neighborhood ---------- */
  {
    id: "lwb-plan", name: "Laney Walker / Bethlehem", type: "Neighborhood Plan",
    collection: "Laney Walker / Bethlehem", location: "Augusta, GA",
    project: "laney-walker-bethlehem-revitalization",
    summary: "Planning for the revitalization of Augusta's historic Laney Walker/Bethlehem neighborhood, led by the Augusta Housing and Community Development Department.",
    sheets: [
      { src: "lwb%20map.jpg", title: "Neighborhood Map", type: "Site Plan" },
      { src: "lwb%20neighborhood%20b.png", title: "Neighborhood B", type: "Site Plan" },
      { src: "streetscape.jpg", title: "Streetscape", type: "Rendering" }
    ]
  },

  /* ---------- Custom residential ---------- */
  {
    id: "langford-river-house", name: "Langford River House", type: "Single-Family",
    collection: "Custom Residential", project: "langford-river-house",
    sheets: [
      { src: "p1080017.jpg", title: "Built", type: "Photo" },
      { src: "els.jpg", title: "Elevations", type: "Elevation" },
      { src: "fps.jpg", title: "Floor Plans", type: "Floor Plan" }
    ]
  },
  {
    id: "fisher-residence", name: "Fisher Residence", type: "Single-Family",
    collection: "Custom Residential", project: "fisher-residence",
    sheets: [
      { src: "p1010002.jpg", title: "Built", type: "Photo" },
      { src: "fps2.jpg", title: "Floor Plans", type: "Floor Plan" }
    ]
  },
  {
    id: "farb-residence", name: "Farb Residence", type: "Single-Family",
    collection: "Custom Residential", project: "farb-residence",
    sheets: [
      { src: "farbfrontelev.jpg", title: "Front Elevation", type: "Elevation" },
      { src: "drawings4.jpg", title: "Drawings", type: "Other" },
      { src: "farbfrontpic.jpg", title: "Built", type: "Photo" }
    ]
  },
  {
    id: "redfish", name: "Redfish", type: "Single-Family",
    collection: "Custom Residential", location: "Florida coast",
    project: "redfish",
    features: ["Living spaces raised above flood level", "Concrete walls built to resist storms", "Impact-resistant windows"],
    summary: "A coastal Florida home built to FORTIFIED guidelines. The living spaces are lifted a full story for flood protection, the walls are solid insulated concrete, and every window is impact-rated.",
    tech: {
      "Structure & Envelope": [
        ["Walls", "Insulated concrete forms (ICF)"],
        ["Windows", "Impact-resistant"],
        ["Living level", "Raised — ground level used for storage and utilities"]
      ],
      "Code & Performance": [
        ["Program", "FORTIFIED for Safer Living (IBHS)"],
        ["Hazards addressed", "Wind, flood, fire and wall damage"]
      ]
    },
    sheets: [
      { src: "redfish_2.png", title: "Drawing", type: "Other" },
      { src: "estuary%20010.jpg", title: "Built", type: "Photo" }
    ]
  },

  /* ---------- Multi-family & commercial ---------- */
  {
    id: "bunzmann-triplex", name: "Bunzmann Triplex", type: "Multi-Family",
    project: "bunzmann-triplex",
    specs: { stories: 2 },
    sheets: [
      { src: "p1010015_straightened.jpg", title: "Built", type: "Photo" },
      { src: "first_floor.jpg", title: "First Floor Plan", type: "Floor Plan" },
      { src: "second_floor.jpg", title: "Second Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "estuary-clubhouse", name: "Estuary Clubhouse", type: "Commercial",
    location: "Steinhatchee, FL", project: "estuary-clubhouse",
    sheets: [
      { src: "estuary%20007.jpg", title: "Built", type: "Photo" },
      { src: "floorplan.jpg", title: "Floor Plan", type: "Floor Plan" }
    ]
  },
  {
    id: "hpc-pool-house", name: "Haile Plantation Pool House", type: "Commercial",
    location: "Gainesville, FL", project: "haile-plantation-community-pool-house",
    sheets: [
      { src: "p10100322.jpg", title: "Built", type: "Photo" },
      { src: "floor%20plan.jpg", title: "Floor Plan", type: "Floor Plan" }
    ]
  },

  /* ===================== ADD NEW PLANS ABOVE THIS LINE ===================== */
];
