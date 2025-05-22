export const filtersJson = {
    "publicationDate": {
      "position": 0,
      "label": "Publication Date",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_publication_date",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "Today",
          "value": "today"
        },
        {
          "label": "This Week",
          "value": "this-week"
        },
        {
          "label": "This Month",
          "value": "this-month"
        },
        {
          "label": "Past 2 Weeks",
          "value": "past-2-weeks"
        },
        {
          "label": "Past 3 Months",
          "value": "past-3-months"
        },
        {
          "label": "Past 6 Months",
          "value": "past-6-months"
        }
      ],
      "paramKey": "publicationDate"
    },
    "salary": {
      "position": 4,
      "label": "Salary",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_salary",
      "kind": "RANGE",
      "prefix": "$",
      "value": {
        "lowest": {
          "value": 21600,
          "paramKey": "minSalaryRange"
        },
        "highest": {
          "value": 422500,
          "paramKey": "maxSalaryRange"
        }
      }
    },
    "seniority": {
      "position": 5,
      "label": "Seniority",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_seniority",
      "kind": "MULTI_SELECT",
      "options": [
        {
          "label": "3",
          "value": "3"
        },
        {
          "label": "4",
          "value": "4"
        },
        {
          "label": "2",
          "value": "2"
        },
        {
          "label": "5",
          "value": "5"
        },
        {
          "label": "1",
          "value": "1"
        }
      ],
      "paramKey": "seniority"
    },
    "locations": {
      "position": 6,
      "label": "Location",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_location",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "Onsite",
          "value": "onsite"
        },
        {
          "label": "Remote",
          "value": "remote"
        },
        {
          "label": "Hybrid",
          "value": "hybrid"
        }
      ],
      "paramKey": "locations"
    },
    "headcountEstimate": {
      "position": 7,
      "label": "Head Count",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_head_count",
      "kind": "RANGE",
      "prefix": null,
      "value": {
        "lowest": {
          "value": 0,
          "paramKey": "minHeadCount"
        },
        "highest": {
          "value": 4500,
          "paramKey": "maxHeadCount"
        }
      }
    },
    "tags": {
      "position": 8,
      "label": "Skills",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_tags",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "reliability",
          "value": "reliability"
        },
        {
          "label": "digital currencies",
          "value": "digital-currencies"
        },
        {
          "label": "Industry Engagement",
          "value": "industry-engagement"
        },
        {
          "label": "sustainability",
          "value": "sustainability"
        },
        {
          "label": "renewable energy",
          "value": "renewable-energy"
        },
        {
          "label": "Usability Testing",
          "value": "usability-testing"
        },
        {
          "label": "office software",
          "value": "office-software"
        },
        {
          "label": "Wireframe",
          "value": "wireframe"
        },
        {
          "label": "bower",
          "value": "bower"
        },
        {
          "label": "Google Suites",
          "value": "google-suites"
        },
        {
          "label": "Russian",
          "value": "russian"
        },
        {
          "label": "evaluation",
          "value": "evaluation"
        },
        {
          "label": "cryptographic protocols",
          "value": "cryptographic-protocols"
        },
        {
          "label": "Proof of Concept",
          "value": "proof-of-concept"
        },
        {
          "label": "Twelve-Factor App",
          "value": "twelve-factor-app"
        },
        {
          "label": "peer-to-peer networking",
          "value": "peer-to-peer-networking"
        },
        {
          "label": "rendering",
          "value": "rendering"
        },
        {
          "label": "frontend development",
          "value": "frontend-development"
        },
        {
          "label": "control systems",
          "value": "control-systems"
        },
        {
          "label": "engineering best practices",
          "value": "engineering-best-practices"
        },
        {
          "label": "ReduxSaga",
          "value": "reduxsaga"
        },
        {
          "label": "crypto technology",
          "value": "crypto-technology"
        },
        {
          "label": "Reselect",
          "value": "reselect"
        },
        {
          "label": "Coveralls",
          "value": "coveralls"
        },
        {
          "label": "Web3-onboard.js",
          "value": "web3-onboardjs"
        },
        {
          "label": "Webinar",
          "value": "webinar"
        },
        {
          "label": "Proof-of-Stake",
          "value": "proof-of-stake"
        },
        {
          "label": "SFRS",
          "value": "sfrs"
        },
        {
          "label": "Enzyme",
          "value": "enzyme"
        },
        {
          "label": "Substrate",
          "value": "substrate"
        },
        {
          "label": "web3js",
          "value": "web3js"
        },
        {
          "label": "cosmjs",
          "value": "cosmjs"
        },
        {
          "label": "cloud accounting",
          "value": "cloud-accounting"
        },
        {
          "label": "Polkadot",
          "value": "polkadot"
        },
        {
          "label": "financial product innovation",
          "value": "financial-product-innovation"
        },
        {
          "label": "Adaptive Design",
          "value": "adaptive-design"
        },
        {
          "label": "ambassadors",
          "value": "ambassadors"
        },
        {
          "label": "BI tool",
          "value": "bi-tool"
        },
        {
          "label": "plotly",
          "value": "plotly"
        },
        {
          "label": "MS Excel",
          "value": "ms-excel"
        },
        {
          "label": "Trade Finance",
          "value": "trade-finance"
        },
        {
          "label": "order aggregation",
          "value": "order-aggregation"
        },
        {
          "label": "Podman",
          "value": "podman"
        },
        {
          "label": "BFF",
          "value": "bff"
        },
        {
          "label": "Dash",
          "value": "dash"
        },
        {
          "label": "crypto knowledge",
          "value": "crypto-knowledge"
        },
        {
          "label": "logging",
          "value": "logging"
        },
        {
          "label": "cloud software",
          "value": "cloud-software"
        },
        {
          "label": "mergers and acquisitions",
          "value": "mergers-and-acquisitions"
        },
        {
          "label": "data best practices",
          "value": "data-best-practices"
        },
        {
          "label": "Google Tag Manager",
          "value": "google-tag-manager"
        },
        {
          "label": "layer-1 network",
          "value": "layer-1-network"
        },
        {
          "label": "technical features",
          "value": "technical-features"
        },
        {
          "label": "prototype iterations",
          "value": "prototype-iterations"
        },
        {
          "label": "alerting systems",
          "value": "alerting-systems"
        },
        {
          "label": "project designing",
          "value": "project-designing"
        },
        {
          "label": "solutioning",
          "value": "solutioning"
        },
        {
          "label": "MSSQL Server",
          "value": "mssql-server"
        },
        {
          "label": "launch campaigns",
          "value": "launch-campaigns"
        },
        {
          "label": "external developers",
          "value": "external-developers"
        },
        {
          "label": "orchestration",
          "value": "orchestration"
        },
        {
          "label": "mobile-first",
          "value": "mobile-first"
        },
        {
          "label": "design guidelines",
          "value": "design-guidelines"
        },
        {
          "label": "brand",
          "value": "brand"
        },
        {
          "label": "project delivery",
          "value": "project-delivery"
        },
        {
          "label": "customer pain-points",
          "value": "customer-pain-points"
        },
        {
          "label": "front end development",
          "value": "front-end-development"
        },
        {
          "label": "GraphProtocol",
          "value": "graphprotocol"
        },
        {
          "label": "back end development",
          "value": "back-end-development"
        },
        {
          "label": "Snapshot voting",
          "value": "snapshot-voting"
        },
        {
          "label": "Customer empathy",
          "value": "customer-empathy"
        },
        {
          "label": "High fidelity prototypes",
          "value": "high-fidelity-prototypes"
        },
        {
          "label": "Presentation Drafting",
          "value": "presentation-drafting"
        },
        {
          "label": "DataBricks",
          "value": "databricks"
        },
        {
          "label": "Decentralized notification system",
          "value": "decentralized-notification-system"
        },
        {
          "label": "Avalanche protocol",
          "value": "avalanche-protocol"
        },
        {
          "label": "Client Business Analysis",
          "value": "client-business-analysis"
        },
        {
          "label": "decentralized infrastructure",
          "value": "decentralized-infrastructure"
        },
        {
          "label": "Correspondence Management",
          "value": "correspondence-management"
        },
        {
          "label": "content strategy",
          "value": "content-strategy"
        },
        {
          "label": "transaction settlement",
          "value": "transaction-settlement"
        },
        {
          "label": "trade matching",
          "value": "trade-matching"
        },
        {
          "label": "VPC",
          "value": "vpc"
        },
        {
          "label": "object-oriented programming",
          "value": "object-oriented-programming"
        },
        {
          "label": "EKS",
          "value": "eks"
        },
        {
          "label": "Vault",
          "value": "vault"
        },
        {
          "label": "DNS",
          "value": "dns"
        },
        {
          "label": "Sanctions Compliance",
          "value": "sanctions-compliance"
        },
        {
          "label": "optimisation",
          "value": "optimisation"
        },
        {
          "label": "Unity engine",
          "value": "unity-engine"
        },
        {
          "label": "V-Ray",
          "value": "v-ray"
        },
        {
          "label": "Octane",
          "value": "octane"
        },
        {
          "label": "client reporting",
          "value": "client-reporting"
        },
        {
          "label": "transparency",
          "value": "transparency"
        },
        {
          "label": "digital filing system",
          "value": "digital-filing-system"
        },
        {
          "label": "Cross-compilation",
          "value": "cross-compilation"
        },
        {
          "label": "authentication",
          "value": "authentication"
        },
        {
          "label": "Debugger",
          "value": "debugger"
        },
        {
          "label": "TrustArc",
          "value": "trustarc"
        },
        {
          "label": "CISSP",
          "value": "cissp"
        }
      ],
      "paramKey": "tags"
    },
    "fundingRounds": {
      "position": 9,
      "label": "Funding Rounds",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_funding_rounds",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "Series A",
          "value": "series-a"
        },
        {
          "label": "Seed",
          "value": "seed"
        },
        {
          "label": "Series B",
          "value": "series-b"
        },
        {
          "label": "Strategic ",
          "value": "strategic"
        },
        {
          "label": "Unknown",
          "value": "unknown"
        },
        {
          "label": "Pre-Seed",
          "value": "pre-seed"
        },
        {
          "label": "Ecosystem Foundation raise",
          "value": "ecosystem-foundation-raise"
        },
        {
          "label": "ICO",
          "value": "ico"
        },
        {
          "label": "OTC",
          "value": "otc"
        },
        {
          "label": "Series E",
          "value": "series-e"
        },
        {
          "label": "Series D",
          "value": "series-d"
        },
        {
          "label": "Series C",
          "value": "series-c"
        },
        {
          "label": "Series F",
          "value": "series-f"
        },
        {
          "label": "Post-IPO Equity",
          "value": "post-ipo-equity"
        },
        {
          "label": "Series C-1",
          "value": "series-c-1"
        },
        {
          "label": "Convertible note issuance",
          "value": "convertible-note-issuance"
        },
        {
          "label": "SAFT",
          "value": "saft"
        },
        {
          "label": "Private token sale",
          "value": "private-token-sale"
        },
        {
          "label": "Ecosystem Round",
          "value": "ecosystem-round"
        },
        {
          "label": "Venture Round",
          "value": "venture-round"
        },
        {
          "label": "Preseed",
          "value": "preseed"
        },
        {
          "label": "Grant",
          "value": "grant"
        },
        {
          "label": "Public token sale",
          "value": "public-token-sale"
        },
        {
          "label": "Private",
          "value": "private"
        },
        {
          "label": "Private Round",
          "value": "private-round"
        },
        {
          "label": "Debt Financing",
          "value": "debt-financing"
        },
        {
          "label": "Seed+",
          "value": "seed"
        },
        {
          "label": "Strategic",
          "value": "strategic"
        },
        {
          "label": "Seed and Strategic",
          "value": "seed-and-strategic"
        },
        {
          "label": "Post-IPO Debt",
          "value": "post-ipo-debt"
        },
        {
          "label": "Series A & B",
          "value": "series-a-and-b"
        },
        {
          "label": "Series A+",
          "value": "series-a"
        },
        {
          "label": "Strategic Private Sale",
          "value": "strategic-private-sale"
        },
        {
          "label": "Equity Crowdsale",
          "value": "equity-crowdsale"
        },
        {
          "label": "Angel Round",
          "value": "angel-round"
        },
        {
          "label": "Equity + Token",
          "value": "equity-token"
        }
      ],
      "paramKey": "fundingRounds"
    },
    "investors": {
      "position": 10,
      "label": "Investors",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_investors",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "SGH CAPITAL",
          "value": "sgh-capital"
        },
        {
          "label": "BitGo",
          "value": "bitgo"
        },
        {
          "label": "500 Startups Vietnam",
          "value": "500-startups-vietnam"
        },
        {
          "label": "Pangea Blockchain Fund",
          "value": "pangea-blockchain-fund"
        },
        {
          "label": "Wintermute Ventures",
          "value": "wintermute-ventures"
        },
        {
          "label": "Access Ventures",
          "value": "access-ventures"
        },
        {
          "label": "Expa",
          "value": "expa"
        },
        {
          "label": "L Catterton",
          "value": "l-catterton"
        },
        {
          "label": "Valor Equity Partners",
          "value": "valor-equity-partners"
        },
        {
          "label": "Youbi Capital",
          "value": "youbi-capital"
        },
        {
          "label": "Activant Capital",
          "value": "activant-capital"
        },
        {
          "label": "Spark Digital Capital",
          "value": "spark-digital-capital"
        },
        {
          "label": "WAGMI Ventures",
          "value": "wagmi-ventures"
        },
        {
          "label": "Ventech Ventures",
          "value": "ventech-ventures"
        },
        {
          "label": "SBI Ven Capital",
          "value": "sbi-ven-capital"
        },
        {
          "label": "Azimut Group",
          "value": "azimut-group"
        },
        {
          "label": "Unicorn Factory Ventures",
          "value": "unicorn-factory-ventures"
        },
        {
          "label": "Anachram",
          "value": "anachram"
        },
        {
          "label": "Stefano Bernardi",
          "value": "stefano-bernardi"
        },
        {
          "label": "Stephane Gosselin",
          "value": "stephane-gosselin"
        },
        {
          "label": "MacLane Wilkison",
          "value": "maclane-wilkison"
        },
        {
          "label": "Hummer Winblad Venture Partners",
          "value": "hummer-winblad-venture-partners"
        },
        {
          "label": "Rovida Advisors",
          "value": "rovida-advisors"
        },
        {
          "label": "Galileo",
          "value": "galileo"
        },
        {
          "label": "GMJP",
          "value": "gmjp"
        },
        {
          "label": "DV Crypto VC",
          "value": "dv-crypto-vc"
        },
        {
          "label": "Nameless Ventures",
          "value": "nameless-ventures"
        },
        {
          "label": "Tomsic Holdings",
          "value": "tomsic-holdings"
        },
        {
          "label": "Belvedere Strategic Capital",
          "value": "belvedere-strategic-capital"
        },
        {
          "label": "Metropolitan Capital Bank",
          "value": "metropolitan-capital-bank"
        },
        {
          "label": "Matter Labs",
          "value": "matter-labs"
        },
        {
          "label": "Department of XYZ",
          "value": "department-of-xyz"
        },
        {
          "label": "Swisscom",
          "value": "swisscom"
        },
        {
          "label": "KESTREL 0x1",
          "value": "kestrel-0x1"
        },
        {
          "label": "Greycroft",
          "value": "greycroft"
        },
        {
          "label": "Ellerston Capital",
          "value": "ellerston-capital"
        },
        {
          "label": "LCV Capital Management",
          "value": "lcv-capital-management"
        },
        {
          "label": "Gobi Partners",
          "value": "gobi-partners"
        },
        {
          "label": "Samsung Venture Investment",
          "value": "samsung-venture-investment"
        },
        {
          "label": "Ajeet Khurana",
          "value": "ajeet-khurana"
        },
        {
          "label": "Social Starts",
          "value": "social-starts"
        },
        {
          "label": "Josh Hannah",
          "value": "josh-hannah"
        },
        {
          "label": "Nakul Gupta",
          "value": "nakul-gupta"
        },
        {
          "label": "ZebPay",
          "value": "zebpay"
        },
        {
          "label": "Tupix Capital",
          "value": "tupix-capital"
        },
        {
          "label": "Mayur Gupta",
          "value": "mayur-gupta"
        },
        {
          "label": "Michael Montero",
          "value": "michael-montero"
        },
        {
          "label": "Ravi Adusumalli",
          "value": "ravi-adusumalli"
        },
        {
          "label": "Vijay Pravin Maharajan",
          "value": "vijay-pravin-maharajan"
        },
        {
          "label": "WeMade",
          "value": "wemade"
        },
        {
          "label": "Ganesan Swaminathan",
          "value": "ganesan-swaminathan"
        },
        {
          "label": "Rohan Chauhan",
          "value": "rohan-chauhan"
        },
        {
          "label": "Yele Bademosi",
          "value": "yele-bademosi"
        },
        {
          "label": "Pankaj Gupta",
          "value": "pankaj-gupta"
        },
        {
          "label": "DCM Ventures",
          "value": "dcm-ventures"
        },
        {
          "label": "Victor Ji",
          "value": "victor-ji"
        },
        {
          "label": "Papership Capital",
          "value": "papership-capital"
        },
        {
          "label": "Mindfulness Capital",
          "value": "mindfulness-capital"
        },
        {
          "label": "Minuscule Ventures",
          "value": "minuscule-ventures"
        },
        {
          "label": "Evan Van Ness",
          "value": "evan-van-ness"
        },
        {
          "label": "Caladan",
          "value": "caladan"
        },
        {
          "label": "Original Capital",
          "value": "original-capital"
        },
        {
          "label": "Electric Feel Ventures",
          "value": "electric-feel-ventures"
        },
        {
          "label": "STIX",
          "value": "stix"
        },
        {
          "label": "Nicolas Bacca",
          "value": "nicolas-bacca"
        },
        {
          "label": "Sami Ben",
          "value": "sami-ben"
        },
        {
          "label": "Gregoireljda.eth",
          "value": "gregoireljdaeth"
        },
        {
          "label": "Etienne Royole",
          "value": "etienne-royole"
        },
        {
          "label": "Ramzi Laieb",
          "value": "ramzi-laieb"
        },
        {
          "label": "Benjamin Flores ",
          "value": "benjamin-flores"
        },
        {
          "label": "Gabin Marignier",
          "value": "gabin-marignier"
        },
        {
          "label": "Pol Maire",
          "value": "pol-maire"
        },
        {
          "label": "FuzzingLabs",
          "value": "fuzzinglabs"
        },
        {
          "label": "HerodotusDev",
          "value": "herodotusdev"
        },
        {
          "label": "Edi Sinovcic",
          "value": "edi-sinovcic"
        },
        {
          "label": "Nathan VDH",
          "value": "nathan-vdh"
        },
        {
          "label": "Greg Gambatto",
          "value": "greg-gambatto"
        },
        {
          "label": "Abdouuu_la",
          "value": "abdouuula"
        },
        {
          "label": "Jason Delabays",
          "value": "jason-delabays"
        },
        {
          "label": "Alliance DAO",
          "value": "alliance-dao"
        },
        {
          "label": "Polychain Capital",
          "value": "polychain-capital"
        },
        {
          "label": "Superscrypt ",
          "value": "superscrypt"
        },
        {
          "label": "Galaxy",
          "value": "galaxy"
        },
        {
          "label": "Griffin Gaming Partners",
          "value": "griffin-gaming-partners"
        },
        {
          "label": "Huobi Ventures",
          "value": "huobi-ventures"
        },
        {
          "label": "HashKey",
          "value": "hashkey"
        },
        {
          "label": "Circle Ventures",
          "value": "circle-ventures"
        },
        {
          "label": "FTX Ventures",
          "value": "ftx-ventures"
        },
        {
          "label": "Jump Crypto",
          "value": "jump-crypto"
        },
        {
          "label": "Apollo",
          "value": "apollo"
        },
        {
          "label": "Franklin Templeton",
          "value": "franklin-templeton"
        },
        {
          "label": "Electric Capital",
          "value": "electric-capital"
        },
        {
          "label": "Elad Gil",
          "value": "elad-gil"
        },
        {
          "label": "Future Perfect Venture ",
          "value": "future-perfect-venture"
        },
        {
          "label": "General Catalyst",
          "value": "general-catalyst"
        },
        {
          "label": "Kilowatt Capital LLC",
          "value": "kilowatt-capital-llc"
        },
        {
          "label": "Naval Ravikant",
          "value": "naval-ravikant"
        },
        {
          "label": "SV Angel",
          "value": "sv-angel"
        },
        {
          "label": "Nima Capital",
          "value": "nima-capital"
        },
        {
          "label": "Social Capital",
          "value": "social-capital"
        },
        {
          "label": "Version One Ventures",
          "value": "version-one-ventures"
        },
        {
          "label": "Arrington XRP Capital",
          "value": "arrington-xrp-capital"
        },
        {
          "label": "DHVC",
          "value": "dhvc"
        },
        {
          "label": "Elysium Venture Capital",
          "value": "elysium-venture-capital"
        },
        {
          "label": "Signum Capital",
          "value": "signum-capital"
        },
        {
          "label": "Chronicle",
          "value": "chronicle"
        },
        {
          "label": "Global Coin Ventures",
          "value": "global-coin-ventures"
        },
        {
          "label": "imToken",
          "value": "imtoken"
        },
        {
          "label": "IOSG Ventures",
          "value": "iosg-ventures"
        },
        {
          "label": "Zero Knowledge Validation",
          "value": "zero-knowledge-validation"
        },
        {
          "label": "DCG",
          "value": "dcg"
        },
        {
          "label": "Haitao Capital",
          "value": "haitao-capital"
        },
        {
          "label": "Hard Yaka",
          "value": "hard-yaka"
        },
        {
          "label": "Haystack",
          "value": "haystack"
        },
        {
          "label": "Kevin Ding",
          "value": "kevin-ding"
        },
        {
          "label": "Winklevoss Capital",
          "value": "winklevoss-capital"
        },
        {
          "label": "G2H2 Capital",
          "value": "g2h2-capital"
        },
        {
          "label": "James Sowers",
          "value": "james-sowers"
        },
        {
          "label": "Kenetic",
          "value": "kenetic"
        },
        {
          "label": "Y Combinator",
          "value": "y-combinator"
        },
        {
          "label": "RRE Ventures",
          "value": "rre-ventures"
        },
        {
          "label": "TWIN CAPITAL ASSET MANAGEMENT",
          "value": "twin-capital-asset-management"
        },
        {
          "label": "Bain Capital Crypto",
          "value": "bain-capital-crypto"
        },
        {
          "label": "Blockchain Capital",
          "value": "blockchain-capital"
        },
        {
          "label": "Stratos",
          "value": "stratos"
        },
        {
          "label": "Alameda Research",
          "value": "alameda-research"
        },
        {
          "label": "CoinFund",
          "value": "coinfund"
        },
        {
          "label": "Maven 11",
          "value": "maven-11"
        },
        {
          "label": "TRGC",
          "value": "trgc"
        },
        {
          "label": "BlockWall Digital",
          "value": "blockwall-digital"
        },
        {
          "label": "The Spartan Group",
          "value": "the-spartan-group"
        },
        {
          "label": "Dialectic",
          "value": "dialectic"
        },
        {
          "label": "ZMT",
          "value": "zmt"
        },
        {
          "label": "Fenbushi Capital",
          "value": "fenbushi-capital"
        },
        {
          "label": "Origin Capital",
          "value": "origin-capital"
        },
        {
          "label": "AU21 Capital",
          "value": "au21-capital"
        },
        {
          "label": "BCA Fund",
          "value": "bca-fund"
        },
        {
          "label": "Consensus Capital Holdings",
          "value": "consensus-capital-holdings"
        },
        {
          "label": "UniValues Associates",
          "value": "univalues-associates"
        },
        {
          "label": "Framework Ventures",
          "value": "framework-ventures"
        },
        {
          "label": "Raphael Ouzan",
          "value": "raphael-ouzan"
        },
        {
          "label": "Compound Ventures",
          "value": "compound-ventures"
        },
        {
          "label": "Jake Seid",
          "value": "jake-seid"
        },
        {
          "label": "Delphi Digital ",
          "value": "delphi-digital"
        },
        {
          "label": "NFX",
          "value": "nfx"
        },
        {
          "label": "Protocol Labs",
          "value": "protocol-labs"
        },
        {
          "label": "Figment",
          "value": "figment"
        },
        {
          "label": "Balaji Srinivasan",
          "value": "balaji-srinivasan"
        },
        {
          "label": "Eric Wall",
          "value": "eric-wall"
        },
        {
          "label": "Jutta Steiner",
          "value": "jutta-steiner"
        },
        {
          "label": "MH Ventures",
          "value": "mh-ventures"
        },
        {
          "label": "Syncracy Capital",
          "value": "syncracy-capital"
        },
        {
          "label": "Robot Ventures",
          "value": "robot-ventures"
        },
        {
          "label": "Divergence Ventures",
          "value": "divergence-ventures"
        },
        {
          "label": "Dokia Capital",
          "value": "dokia-capital"
        },
        {
          "label": "Cryptium Labs",
          "value": "cryptium-labs"
        },
        {
          "label": "Interchain Foundation",
          "value": "interchain-foundation"
        },
        {
          "label": "KR1",
          "value": "kr1"
        },
        {
          "label": "Michael Ng",
          "value": "michael-ng"
        },
        {
          "label": "Michael Youssefmir",
          "value": "michael-youssefmir"
        },
        {
          "label": "P2P Capital",
          "value": "p2p-capital"
        },
        {
          "label": "Ramsey Khoury",
          "value": "ramsey-khoury"
        },
        {
          "label": "Signature Ventures",
          "value": "signature-ventures"
        },
        {
          "label": "Simon Johnson",
          "value": "simon-johnson"
        },
        {
          "label": "Tokenomy",
          "value": "tokenomy"
        },
        {
          "label": "yield ventures",
          "value": "yield-ventures"
        },
        {
          "label": "Tiger Global Management",
          "value": "tiger-global-management"
        },
        {
          "label": "Wellington Management",
          "value": "wellington-management"
        },
        {
          "label": "Chainfund Capital",
          "value": "chainfund-capital"
        },
        {
          "label": "IVP",
          "value": "ivp"
        },
        {
          "label": "Greylock Partners",
          "value": "greylock-partners"
        },
        {
          "label": "Spark Digital",
          "value": "spark-digital"
        },
        {
          "label": "Section 32",
          "value": "section-32"
        },
        {
          "label": "Battery Ventures",
          "value": "battery-ventures"
        },
        {
          "label": "Fundamental Labs",
          "value": "fundamental-labs"
        },
        {
          "label": "Draper Associates",
          "value": "draper-associates"
        },
        {
          "label": "Vayner",
          "value": "vayner"
        },
        {
          "label": "BBVA Ventures",
          "value": "bbva-ventures"
        },
        {
          "label": "Boost VC",
          "value": "boost-vc"
        },
        {
          "label": "Bobby Goodlatte",
          "value": "bobby-goodlatte"
        },
        {
          "label": "Kindred Ventures",
          "value": "kindred-ventures"
        },
        {
          "label": "DFJ Growth",
          "value": "dfj-growth"
        },
        {
          "label": "Fueled",
          "value": "fueled"
        },
        {
          "label": "Manhattan Venture Partners",
          "value": "manhattan-venture-partners"
        },
        {
          "label": "Nelstone Ventures",
          "value": "nelstone-ventures"
        },
        {
          "label": "TRUE Capital Management",
          "value": "true-capital-management"
        },
        {
          "label": "New York Stock Exchange",
          "value": "new-york-stock-exchange"
        },
        {
          "label": "Propel VC",
          "value": "propel-vc"
        },
        {
          "label": "Reinventure",
          "value": "reinventure"
        },
        {
          "label": "USAA",
          "value": "usaa"
        },
        {
          "label": "Valor Capital Group",
          "value": "valor-capital-group"
        },
        {
          "label": "Mitsubishi UFJ Capital",
          "value": "mitsubishi-ufj-capital"
        },
        {
          "label": "Sozo Ventures",
          "value": "sozo-ventures"
        },
        {
          "label": "Addition Capital",
          "value": "addition-capital"
        },
        {
          "label": "Aditya Agarwal",
          "value": "aditya-agarwal"
        },
        {
          "label": "Cameron Ring",
          "value": "cameron-ring"
        },
        {
          "label": "Chi-Hua Chien",
          "value": "chi-hua-chien"
        },
        {
          "label": "#adm VENTURES",
          "value": "adm-ventures"
        },
        {
          "label": "Aviv Hadar",
          "value": "aviv-hadar"
        },
        {
          "label": "True Capital Management",
          "value": "true-capital-management"
        },
        {
          "label": "Coatue",
          "value": "coatue"
        },
        {
          "label": "Doug Atkin",
          "value": "doug-atkin"
        },
        {
          "label": "Dreamers VC",
          "value": "dreamers-vc"
        },
        {
          "label": "Duncan L. Niederauer",
          "value": "duncan-l-niederauer"
        },
        {
          "label": "James Hong",
          "value": "james-hong"
        },
        {
          "label": "Jay Brown",
          "value": "jay-brown"
        },
        {
          "label": "Jeff Seibert",
          "value": "jeff-seibert"
        },
        {
          "label": "Jerry Yang",
          "value": "jerry-yang"
        },
        {
          "label": "Joey Krug",
          "value": "joey-krug"
        },
        {
          "label": "John Hennessy",
          "value": "john-hennessy"
        },
        {
          "label": "Keisuke Honda",
          "value": "keisuke-honda"
        },
        {
          "label": "Kenetic Capital",
          "value": "kenetic-capital"
        },
        {
          "label": "Kevin Hartz",
          "value": "kevin-hartz"
        },
        {
          "label": "Chris Kelly",
          "value": "chris-kelly"
        },
        {
          "label": "Silver Lake",
          "value": "silver-lake"
        },
        {
          "label": "DFJ",
          "value": "dfj"
        },
        {
          "label": "Time Ventures",
          "value": "time-ventures"
        },
        {
          "label": "Sound Ventures",
          "value": "sound-ventures"
        },
        {
          "label": "Benchmark",
          "value": "benchmark"
        },
        {
          "label": "Sterling.VC",
          "value": "sterlingvc"
        },
        {
          "label": "HSBC",
          "value": "hsbc"
        },
        {
          "label": "MUFG Innovation Partners",
          "value": "mufg-innovation-partners"
        },
        {
          "label": "Temasek",
          "value": "temasek"
        },
        {
          "label": "SoftBank Vision Fund 2",
          "value": "softbank-vision-fund-2"
        },
        {
          "label": "Microsoft",
          "value": "microsoft"
        },
        {
          "label": "Anthos Capital",
          "value": "anthos-capital"
        },
        {
          "label": "Sanctor Capital",
          "value": "sanctor-capital"
        },
        {
          "label": "C Ventures",
          "value": "c-ventures"
        },
        {
          "label": "Marshall Wace",
          "value": "marshall-wace"
        },
        {
          "label": "UTA VC",
          "value": "uta-vc"
        },
        {
          "label": "BLN Capital",
          "value": "bln-capital"
        },
        {
          "label": "DeFiance Capital",
          "value": "defiance-capital"
        },
        {
          "label": "Think Investments",
          "value": "think-investments"
        },
        {
          "label": "Third Point Ventures",
          "value": "third-point-ventures"
        },
        {
          "label": "BlackRock",
          "value": "blackrock"
        },
        {
          "label": "Greater Bay Area Homeland Development Fund",
          "value": "greater-bay-area-homeland-development-fund"
        },
        {
          "label": "JP Morgan Chase",
          "value": "jp-morgan-chase"
        },
        {
          "label": "Liberty City Ventures",
          "value": "liberty-city-ventures"
        },
        {
          "label": "MakerDAO",
          "value": "makerdao"
        },
        {
          "label": "Mastercard",
          "value": "mastercard"
        },
        {
          "label": "Quotidian Ventures",
          "value": "quotidian-ventures"
        },
        {
          "label": "SNZ Capital",
          "value": "snz-capital"
        },
        {
          "label": "The Lao",
          "value": "the-lao"
        },
        {
          "label": "UBS",
          "value": "ubs"
        },
        {
          "label": "CMT Digital",
          "value": "cmt-digital"
        },
        {
          "label": "SK Group",
          "value": "sk-group"
        },
        {
          "label": "David J. Namdar",
          "value": "david-j-namdar"
        },
        {
          "label": "1Confirmation",
          "value": "1confirmation"
        },
        {
          "label": "Abstract Ventures",
          "value": "abstract-ventures"
        },
        {
          "label": "Craft Ventures",
          "value": "craft-ventures"
        },
        {
          "label": "VY Capital",
          "value": "vy-capital"
        },
        {
          "label": "GSR",
          "value": "gsr"
        },
        {
          "label": "RockTree Capital",
          "value": "rocktree-capital"
        },
        {
          "label": "Scalar Capital",
          "value": "scalar-capital"
        },
        {
          "label": "Wintermute Trading",
          "value": "wintermute-trading"
        },
        {
          "label": "Brian Armstrong",
          "value": "brian-armstrong"
        },
        {
          "label": "Caffeinated Capital",
          "value": "caffeinated-capital"
        },
        {
          "label": "Christopher Golda",
          "value": "christopher-golda"
        },
        {
          "label": "David King",
          "value": "david-king"
        },
        {
          "label": "Fred Ehrsam",
          "value": "fred-ehrsam"
        },
        {
          "label": "Jack Herrick",
          "value": "jack-herrick"
        },
        {
          "label": "Scott Belsky",
          "value": "scott-belsky"
        },
        {
          "label": "Reciprocal Ventures",
          "value": "reciprocal-ventures"
        },
        {
          "label": "Fabric Ventures",
          "value": "fabric-ventures"
        },
        {
          "label": "Tally Capital",
          "value": "tally-capital"
        },
        {
          "label": "Tokyo Electric Power",
          "value": "tokyo-electric-power"
        },
        {
          "label": "Signal Ventures",
          "value": "signal-ventures"
        },
        {
          "label": "BitBlock Capital",
          "value": "bitblock-capital"
        },
        {
          "label": "Bitrise Capital",
          "value": "bitrise-capital"
        },
        {
          "label": "Pnyx Ventures",
          "value": "pnyx-ventures"
        },
        {
          "label": "BKEX Global",
          "value": "bkex-global"
        },
        {
          "label": "Snow K",
          "value": "snow-k"
        },
        {
          "label": "Thomas Glocer",
          "value": "thomas-glocer"
        },
        {
          "label": "Amplify Partners",
          "value": "amplify-partners"
        },
        {
          "label": "Folius Ventures",
          "value": "folius-ventures"
        },
        {
          "label": "L1 Digital",
          "value": "l1-digital"
        },
        {
          "label": "Old Fashion Research",
          "value": "old-fashion-research"
        },
        {
          "label": "SCB 10X",
          "value": "scb-10x"
        },
        {
          "label": "Skyfall Ventures",
          "value": "skyfall-ventures"
        },
        {
          "label": "Aleksander Leonard Larsen",
          "value": "aleksander-leonard-larsen"
        },
        {
          "label": "Ana Andrianova",
          "value": "ana-andrianova"
        },
        {
          "label": "Anthony Yoon",
          "value": "anthony-yoon"
        },
        {
          "label": "BlockRock Capital",
          "value": "blockrock-capital"
        },
        {
          "label": "Christian Arita",
          "value": "christian-arita"
        },
        {
          "label": "Christian Printzell Halvorsen",
          "value": "christian-printzell-halvorsen"
        },
        {
          "label": "CTF Capital",
          "value": "ctf-capital"
        },
        {
          "label": "Henrik Langeland",
          "value": "henrik-langeland"
        },
        {
          "label": "Julien Bouteloup",
          "value": "julien-bouteloup"
        },
        {
          "label": "Kevin Hu",
          "value": "kevin-hu"
        },
        {
          "label": "Mechanism Capital",
          "value": "mechanism-capital"
        },
        {
          "label": "Nikolai Heum",
          "value": "nikolai-heum"
        },
        {
          "label": "Nisa Amoils",
          "value": "nisa-amoils"
        },
        {
          "label": "Sergei Chan",
          "value": "sergei-chan"
        },
        {
          "label": "Allen Day",
          "value": "allen-day"
        },
        {
          "label": "Bitscale Capital",
          "value": "bitscale-capital"
        },
        {
          "label": "Darren Lau",
          "value": "darren-lau"
        },
        {
          "label": "Daryl Lau",
          "value": "daryl-lau"
        },
        {
          "label": "DoveyWan",
          "value": "doveywan"
        },
        {
          "label": "imToken Ventures",
          "value": "imtoken-ventures"
        },
        {
          "label": "Jeremy Kerbel",
          "value": "jeremy-kerbel"
        },
        {
          "label": "Joel John",
          "value": "joel-john"
        },
        {
          "label": "Kabeelan",
          "value": "kabeelan"
        },
        {
          "label": "QCP Capital",
          "value": "qcp-capital"
        },
        {
          "label": "Vincent Niu",
          "value": "vincent-niu"
        },
        {
          "label": "Will Price",
          "value": "will-price"
        },
        {
          "label": "YONATAN BEN SHIMON",
          "value": "yonatan-ben-shimon"
        },
        {
          "label": "Jump",
          "value": "jump"
        },
        {
          "label": "Sequoia Capital China",
          "value": "sequoia-capital-china"
        },
        {
          "label": "Pantera",
          "value": "pantera"
        },
        {
          "label": "Nomad Capital",
          "value": "nomad-capital"
        },
        {
          "label": "Presto",
          "value": "presto"
        },
        {
          "label": "LTP",
          "value": "ltp"
        },
        {
          "label": "Manifold",
          "value": "manifold"
        },
        {
          "label": "Origin Protocol",
          "value": "origin-protocol"
        },
        {
          "label": "Laser Digital",
          "value": "laser-digital"
        },
        {
          "label": "CoinDCX Ventures",
          "value": "coindcx-ventures"
        },
        {
          "label": "FJ Labs",
          "value": "fj-labs"
        },
        {
          "label": "Not Boring",
          "value": "not-boring"
        },
        {
          "label": "Shima Capital",
          "value": "shima-capital"
        },
        {
          "label": "Archetype",
          "value": "archetype"
        },
        {
          "label": "Tribe Capital",
          "value": "tribe-capital"
        },
        {
          "label": "RockawayX",
          "value": "rockawayx"
        },
        {
          "label": "Delphi Digital",
          "value": "delphi-digital"
        },
        {
          "label": "A.Capital Ventures",
          "value": "acapital-ventures"
        },
        {
          "label": "Variant Alternative Income Fund",
          "value": "variant-alternative-income-fund"
        },
        {
          "label": "Distributed Global",
          "value": "distributed-global"
        },
        {
          "label": "1confirmation",
          "value": "1confirmation"
        },
        {
          "label": "Blockchange Ventures",
          "value": "blockchange-ventures"
        },
        {
          "label": "Bossanova Investimentos",
          "value": "bossanova-investimentos"
        },
        {
          "label": "Day One Ventures",
          "value": "day-one-ventures"
        },
        {
          "label": "Denis Nazarov",
          "value": "denis-nazarov"
        },
        {
          "label": "Fifty Years",
          "value": "fifty-years"
        },
        {
          "label": "Kinetic Capital",
          "value": "kinetic-capital"
        },
        {
          "label": "Sam Bankman-Fried",
          "value": "sam-bankman-fried"
        },
        {
          "label": "Tim Draper",
          "value": "tim-draper"
        },
        {
          "label": "Creative Destruction Lab",
          "value": "creative-destruction-lab"
        },
        {
          "label": "Eden Block",
          "value": "eden-block"
        },
        {
          "label": "James Simpson",
          "value": "james-simpson"
        },
        {
          "label": "ZBS CAPITAL",
          "value": "zbs-capital"
        },
        {
          "label": "Marwan Alzarouni",
          "value": "marwan-alzarouni"
        },
        {
          "label": "Meher Roy",
          "value": "meher-roy"
        },
        {
          "label": "MiH Ventures",
          "value": "mih-ventures"
        },
        {
          "label": "Outlier Ventures",
          "value": "outlier-ventures"
        },
        {
          "label": "Woodstock Fund",
          "value": "woodstock-fund"
        },
        {
          "label": "Zee Prime Capital",
          "value": "zee-prime-capital"
        },
        {
          "label": "Chorus One Ventures",
          "value": "chorus-one-ventures"
        },
        {
          "label": "Genblock Capital",
          "value": "genblock-capital"
        },
        {
          "label": "High Naut Capital",
          "value": "high-naut-capital"
        },
        {
          "label": "Huobi",
          "value": "huobi"
        },
        {
          "label": "LedgerPrime",
          "value": "ledgerprime"
        },
        {
          "label": "Morningstar Ventures",
          "value": "morningstar-ventures"
        },
        {
          "label": "Prabhakar Reddy",
          "value": "prabhakar-reddy"
        },
        {
          "label": "Primitive Ventures",
          "value": "primitive-ventures"
        },
        {
          "label": "Proof Group",
          "value": "proof-group"
        },
        {
          "label": "Rarestone Capital",
          "value": "rarestone-capital"
        },
        {
          "label": "Arweave",
          "value": "arweave"
        },
        {
          "label": "Ava Labs",
          "value": "ava-labs"
        },
        {
          "label": "NEAR Foundation",
          "value": "near-foundation"
        },
        {
          "label": "Permanent Ventures",
          "value": "permanent-ventures"
        },
        {
          "label": "Solana Foundation",
          "value": "solana-foundation"
        },
        {
          "label": "D1 Ventures",
          "value": "d1-ventures"
        },
        {
          "label": "Illia Polosukhin",
          "value": "illia-polosukhin"
        },
        {
          "label": "Jump Capital",
          "value": "jump-capital"
        },
        {
          "label": "North Island Ventures",
          "value": "north-island-ventures"
        },
        {
          "label": "Cygni Capital",
          "value": "cygni-capital"
        },
        {
          "label": "DCVC",
          "value": "dcvc"
        },
        {
          "label": "Waikit Lau",
          "value": "waikit-lau"
        },
        {
          "label": "Binance X",
          "value": "binance-x"
        },
        {
          "label": "Olive Tree Capital",
          "value": "olive-tree-capital"
        },
        {
          "label": "zeroDAO",
          "value": "zerodao"
        },
        {
          "label": "Node Capital",
          "value": "node-capital"
        },
        {
          "label": "Gokul Rajaram",
          "value": "gokul-rajaram"
        },
        {
          "label": "Hypershere",
          "value": "hypershere"
        },
        {
          "label": "GoldenCoin TS",
          "value": "goldencoin-ts"
        },
        {
          "label": "Happy Walters",
          "value": "happy-walters"
        },
        {
          "label": "IVC",
          "value": "ivc"
        },
        {
          "label": "OKX",
          "value": "okx"
        },
        {
          "label": "Ascensive Assets",
          "value": "ascensive-assets"
        },
        {
          "label": "FireX Capital",
          "value": "firex-capital"
        },
        {
          "label": "Infinity Ventures Crypto",
          "value": "infinity-ventures-crypto"
        },
        {
          "label": "Mentha Partners",
          "value": "mentha-partners"
        },
        {
          "label": "Yield Guild Games",
          "value": "yield-guild-games"
        },
        {
          "label": "Worldcoin",
          "value": "worldcoin"
        },
        {
          "label": "Sei Network",
          "value": "sei-network"
        },
        {
          "label": "Big Brain Holdings",
          "value": "big-brain-holdings"
        },
        {
          "label": "Chapter One",
          "value": "chapter-one"
        },
        {
          "label": "OP Crypto",
          "value": "op-crypto"
        },
        {
          "label": "Salt Fund",
          "value": "salt-fund"
        },
        {
          "label": "Darren Smorgon",
          "value": "darren-smorgon"
        },
        {
          "label": "Emrin Nurovic",
          "value": "emrin-nurovic"
        },
        {
          "label": "Fire Eyes DAO",
          "value": "fire-eyes-dao"
        },
        {
          "label": "Apollo Capital Management",
          "value": "apollo-capital-management"
        },
        {
          "label": "Ripple Labs",
          "value": "ripple-labs"
        },
        {
          "label": "Flex Dapps",
          "value": "flex-dapps"
        },
        {
          "label": "Henrik Andersson",
          "value": "henrik-andersson"
        },
        {
          "label": "Kieran Warwick",
          "value": "kieran-warwick"
        },
        {
          "label": "Marc Woodward",
          "value": "marc-woodward"
        },
        {
          "label": "Koji Capital",
          "value": "koji-capital"
        },
        {
          "label": "Matt Symons",
          "value": "matt-symons"
        },
        {
          "label": "Meld Ventures",
          "value": "meld-ventures"
        },
        {
          "label": "Radek Ostrowski",
          "value": "radek-ostrowski"
        },
        {
          "label": "Ryan Zurrer",
          "value": "ryan-zurrer"
        },
        {
          "label": "Ryon Nixon",
          "value": "ryon-nixon"
        },
        {
          "label": "Alumni Ventures",
          "value": "alumni-ventures"
        },
        {
          "label": "Alameda Ventures",
          "value": "alameda-ventures"
        },
        {
          "label": "Slow Ventures",
          "value": "slow-ventures"
        },
        {
          "label": "Do Kwon",
          "value": "do-kwon"
        },
        {
          "label": "Polygon",
          "value": "polygon"
        },
        {
          "label": "M12",
          "value": "m12"
        },
        {
          "label": "Coin DCX",
          "value": "coin-dcx"
        },
        {
          "label": "Blizzard ",
          "value": "blizzard"
        },
        {
          "label": "Hash Capital",
          "value": "hash-capital"
        },
        {
          "label": "SevenX Ventures",
          "value": "sevenx-ventures"
        },
        {
          "label": "MystenLabs",
          "value": "mystenlabs"
        },
        {
          "label": "FellowsFund",
          "value": "fellowsfund"
        },
        {
          "label": "Hivemind",
          "value": "hivemind"
        },
        {
          "label": "M12 Microsoft Venture Fund",
          "value": "m12-microsoft-venture-fund"
        },
        {
          "label": "F Prime",
          "value": "f-prime"
        },
        {
          "label": "Arrington Capital",
          "value": "arrington-capital"
        },
        {
          "label": "Amex Ventures",
          "value": "amex-ventures"
        },
        {
          "label": "QED Investors",
          "value": "qed-investors"
        },
        {
          "label": "Evolution Equity Partners",
          "value": "evolution-equity-partners"
        },
        {
          "label": "Octopus Ventures",
          "value": "octopus-ventures"
        },
        {
          "label": "3VC",
          "value": "3vc"
        },
        {
          "label": "Tensor Ventures",
          "value": "tensor-ventures"
        },
        {
          "label": "Depo Ventures",
          "value": "depo-ventures"
        },
        {
          "label": "Leadblock Fund",
          "value": "leadblock-fund"
        },
        {
          "label": "Circle",
          "value": "circle"
        },
        {
          "label": "Bitpanda",
          "value": "bitpanda"
        },
        {
          "label": "Blockchain.com",
          "value": "blockchaincom"
        },
        {
          "label": "Blockchain Ventures",
          "value": "blockchain-ventures"
        },
        {
          "label": "Mosaic",
          "value": "mosaic"
        },
        {
          "label": "Saison Capital",
          "value": "saison-capital"
        },
        {
          "label": "Matthew Tan",
          "value": "matthew-tan"
        },
        {
          "label": "Double Peak Group",
          "value": "double-peak-group"
        },
        {
          "label": "Gabby Dizon",
          "value": "gabby-dizon"
        },
        {
          "label": "Nikil Viswanathan",
          "value": "nikil-viswanathan"
        },
        {
          "label": "Fulgur Ventures",
          "value": "fulgur-ventures"
        },
        {
          "label": "Soma Capital",
          "value": "soma-capital"
        },
        {
          "label": "Pioneer Fund",
          "value": "pioneer-fund"
        },
        {
          "label": "Smart Token Labs",
          "value": "smart-token-labs"
        },
        {
          "label": "Lefteris Karapetsas",
          "value": "lefteris-karapetsas"
        },
        {
          "label": "Makoto Inoue",
          "value": "makoto-inoue"
        },
        {
          "label": "Rahul Sethuram",
          "value": "rahul-sethuram"
        },
        {
          "label": "Shopify",
          "value": "shopify"
        },
        {
          "label": "Hayden Adams",
          "value": "hayden-adams"
        },
        {
          "label": "Buckley Ventures",
          "value": "buckley-ventures"
        },
        {
          "label": "Zerion",
          "value": "zerion"
        },
        {
          "label": "Alex Svanevik",
          "value": "alex-svanevik"
        },
        {
          "label": "Vadim Koleoshkin",
          "value": "vadim-koleoshkin"
        },
        {
          "label": "Arjun Bhuptani",
          "value": "arjun-bhuptani"
        },
        {
          "label": "Volt Capital",
          "value": "volt-capital"
        },
        {
          "label": "Weekend Fund",
          "value": "weekend-fund"
        },
        {
          "label": "Anthony Sassano",
          "value": "anthony-sassano"
        },
        {
          "label": "David Hoffmann",
          "value": "david-hoffmann"
        },
        {
          "label": "Calvin Liu",
          "value": "calvin-liu"
        },
        {
          "label": "2L Investments Inc",
          "value": "2l-investments-inc"
        },
        {
          "label": "Portico Ventures",
          "value": "portico-ventures"
        },
        {
          "label": "Struck Crypto",
          "value": "struck-crypto"
        },
        {
          "label": "Zinal Growth",
          "value": "zinal-growth"
        },
        {
          "label": "Zilliqa Capital",
          "value": "zilliqa-capital"
        },
        {
          "label": "First Round Capital",
          "value": "first-round-capital"
        },
        {
          "label": "IA Ventures",
          "value": "ia-ventures"
        },
        {
          "label": "Miyuki Matsumoto",
          "value": "miyuki-matsumoto"
        },
        {
          "label": "Nexo",
          "value": "nexo"
        },
        {
          "label": "Kronos Research",
          "value": "kronos-research"
        },
        {
          "label": "Quantstamp",
          "value": "quantstamp"
        },
        {
          "label": "LocalGlobe",
          "value": "localglobe"
        },
        {
          "label": "SIG",
          "value": "sig"
        },
        {
          "label": "Cap Horn",
          "value": "cap-horn"
        },
        {
          "label": "Alliance Entreprendre",
          "value": "alliance-entreprendre"
        },
        {
          "label": "Ascendant Capital",
          "value": "ascendant-capital"
        },
        {
          "label": "Cardinal Capital Partners",
          "value": "cardinal-capital-partners"
        },
        {
          "label": "Cathay Innovation",
          "value": "cathay-innovation"
        },
        {
          "label": "True Global Ventures",
          "value": "true-global-ventures"
        },
        {
          "label": "Cite Gestion SPV",
          "value": "cite-gestion-spv"
        },
        {
          "label": "VaynerFund",
          "value": "vaynerfund"
        },
        {
          "label": "CapHorn Invest",
          "value": "caphorn-invest"
        },
        {
          "label": "Draper Dragon",
          "value": "draper-dragon"
        },
        {
          "label": "FirstMark Capital",
          "value": "firstmark-capital"
        },
        {
          "label": "GDTRE",
          "value": "gdtre"
        },
        {
          "label": "Molten Ventures",
          "value": "molten-ventures"
        },
        {
          "label": "XAnge",
          "value": "xange"
        },
        {
          "label": "Bpifrance",
          "value": "bpifrance"
        },
        {
          "label": "Crypto.com Capital",
          "value": "cryptocom-capital"
        },
        {
          "label": "CITA Investissement",
          "value": "cita-investissement"
        },
        {
          "label": "AdUX",
          "value": "adux"
        },
        {
          "label": "Alain Tingaud",
          "value": "alain-tingaud"
        },
        {
          "label": "Fred Potter",
          "value": "fred-potter"
        },
        {
          "label": "Nicolas Louvet",
          "value": "nicolas-louvet"
        },
        {
          "label": "Pascal Gauthier",
          "value": "pascal-gauthier"
        },
        {
          "label": "ACI Capita",
          "value": "aci-capita"
        },
        {
          "label": "MIT Investment Managament Company",
          "value": "mit-investment-managament-company"
        },
        {
          "label": "B.lc",
          "value": "blc"
        },
        {
          "label": "Nikesh Arora",
          "value": "nikesh-arora"
        },
        {
          "label": "Inflection.xyz",
          "value": "inflectionxyz"
        },
        {
          "label": "bessemer",
          "value": "bessemer"
        },
        {
          "label": "Paua Ventures",
          "value": "paua-ventures"
        },
        {
          "label": "botv Partners",
          "value": "botv-partners"
        },
        {
          "label": "LionTree",
          "value": "liontree"
        },
        {
          "label": "MoonPay",
          "value": "moonpay"
        },
        {
          "label": "Maelstrom",
          "value": "maelstrom"
        },
        {
          "label": "BackerDAO",
          "value": "backerdao"
        },
        {
          "label": "Black Label Media",
          "value": "black-label-media"
        },
        {
          "label": "Orange DAO",
          "value": "orange-dao"
        },
        {
          "label": "Benqi Finance",
          "value": "benqi-finance"
        },
        {
          "label": "Samara Asset Group",
          "value": "samara-asset-group"
        },
        {
          "label": "Sandeep Nailwal",
          "value": "sandeep-nailwal"
        },
        {
          "label": "Dao5",
          "value": "dao5"
        },
        {
          "label": "Hashkey Capital",
          "value": "hashkey-capital"
        },
        {
          "label": "New Tribe Capital",
          "value": "new-tribe-capital"
        },
        {
          "label": "Rubik Ventures",
          "value": "rubik-ventures"
        },
        {
          "label": "Bo Feng",
          "value": "bo-feng"
        },
        {
          "label": "Yat Siu",
          "value": "yat-siu"
        },
        {
          "label": "Antony Lewis",
          "value": "antony-lewis"
        },
        {
          "label": "CitzenX",
          "value": "citzenx"
        },
        {
          "label": "Mustafa Al-Bassam",
          "value": "mustafa-al-bassam"
        },
        {
          "label": "Zaki Manian",
          "value": "zaki-manian"
        },
        {
          "label": "Joey Santoro",
          "value": "joey-santoro"
        },
        {
          "label": "Spadaboom",
          "value": "spadaboom"
        },
        {
          "label": "Georgios Vlachos",
          "value": "georgios-vlachos"
        },
        {
          "label": "DCF God",
          "value": "dcf-god"
        },
        {
          "label": "Brian Tubergen",
          "value": "brian-tubergen"
        },
        {
          "label": "Lawrence Diao",
          "value": "lawrence-diao"
        },
        {
          "label": "Ashwin Ramachandran",
          "value": "ashwin-ramachandran"
        },
        {
          "label": "CoinShares",
          "value": "coinshares"
        },
        {
          "label": "NxGen Capital",
          "value": "nxgen-capital"
        },
        {
          "label": "Sygnum",
          "value": "sygnum"
        },
        {
          "label": "Anton Bukov",
          "value": "anton-bukov"
        },
        {
          "label": "LAUNCHub Ventures",
          "value": "launchub-ventures"
        },
        {
          "label": "Polymorphic Capital",
          "value": "polymorphic-capital"
        },
        {
          "label": "GCR",
          "value": "gcr"
        },
        {
          "label": "BlueYard Capital",
          "value": "blueyard-capital"
        },
        {
          "label": "Justin Waldron",
          "value": "justin-waldron"
        },
        {
          "label": "James Prestwich",
          "value": "james-prestwich"
        },
        {
          "label": "Ben Leventhal",
          "value": "ben-leventhal"
        },
        {
          "label": "Dan Romero",
          "value": "dan-romero"
        },
        {
          "label": "Tarun Chitra",
          "value": "tarun-chitra"
        },
        {
          "label": "Patricio Worthalter",
          "value": "patricio-worthalter"
        },
        {
          "label": "Linda Xie",
          "value": "linda-xie"
        },
        {
          "label": "Cooper Turley",
          "value": "cooper-turley"
        },
        {
          "label": "Founders Fund",
          "value": "founders-fund"
        },
        {
          "label": "Reverie",
          "value": "reverie"
        },
        {
          "label": "Nathan McCauley",
          "value": "nathan-mccauley"
        },
        {
          "label": "Sina Habibian",
          "value": "sina-habibian"
        },
        {
          "label": "Will Gaybrick",
          "value": "will-gaybrick"
        },
        {
          "label": "Hasu",
          "value": "hasu"
        },
        {
          "label": "Haichen Shen",
          "value": "haichen-shen"
        },
        {
          "label": "Sreeram Kannan",
          "value": "sreeram-kannan"
        },
        {
          "label": "Jez",
          "value": "jez"
        },
        {
          "label": "Andrew Kang",
          "value": "andrew-kang"
        },
        {
          "label": "foobar",
          "value": "foobar"
        },
        {
          "label": "Hsaka",
          "value": "hsaka"
        },
        {
          "label": "CL207",
          "value": "cl207"
        },
        {
          "label": "Loomdart",
          "value": "loomdart"
        },
        {
          "label": "degenspartan",
          "value": "degenspartan"
        },
        {
          "label": "ByWassies",
          "value": "bywassies"
        },
        {
          "label": "Evanss6",
          "value": "evanss6"
        },
        {
          "label": "Manifold Trading",
          "value": "manifold-trading"
        },
        {
          "label": "Gainzy",
          "value": "gainzy"
        },
        {
          "label": "JandX",
          "value": "jandx"
        },
        {
          "label": "Brentsketit",
          "value": "brentsketit"
        },
        {
          "label": "icebergy",
          "value": "icebergy"
        },
        {
          "label": "naniXBT",
          "value": "nanixbt"
        },
        {
          "label": "Cole",
          "value": "cole"
        },
        {
          "label": "Gelato",
          "value": "gelato"
        },
        {
          "label": "Anagram",
          "value": "anagram"
        },
        {
          "label": "Keone",
          "value": "keone"
        },
        {
          "label": "Justin Drake",
          "value": "justin-drake"
        },
        {
          "label": "Mike Neuder",
          "value": "mike-neuder"
        },
        {
          "label": "Ansem",
          "value": "ansem"
        },
        {
          "label": "0xMert",
          "value": "0xmert"
        },
        {
          "label": "Uri Klarman",
          "value": "uri-klarman"
        },
        {
          "label": "Cobie",
          "value": "cobie"
        },
        {
          "label": "White Star Capital",
          "value": "white-star-capital"
        },
        {
          "label": "IOBC Capital",
          "value": "iobc-capital"
        },
        {
          "label": "2TM",
          "value": "2tm"
        },
        {
          "label": "Avon Ventures",
          "value": "avon-ventures"
        },
        {
          "label": "B Capital Group",
          "value": "b-capital-group"
        },
        {
          "label": "Bitstamp",
          "value": "bitstamp"
        },
        {
          "label": "Counterpoint Global",
          "value": "counterpoint-global"
        },
        {
          "label": "DTCP",
          "value": "dtcp"
        },
        {
          "label": "HOF Capital",
          "value": "hof-capital"
        },
        {
          "label": "Mirae Asset Global Investments",
          "value": "mirae-asset-global-investments"
        },
        {
          "label": "Quiet Capital",
          "value": "quiet-capital"
        },
        {
          "label": "StarkWare Industries",
          "value": "starkware-industries"
        },
        {
          "label": "Arkstream",
          "value": "arkstream"
        },
        {
          "label": "Third Kind Venture Capital",
          "value": "third-kind-venture-capital"
        },
        {
          "label": "StarkWare",
          "value": "starkware"
        },
        {
          "label": "OtterSec",
          "value": "ottersec"
        },
        {
          "label": "Aptos Foundation",
          "value": "aptos-foundation"
        },
        {
          "label": "Infstones",
          "value": "infstones"
        },
        {
          "label": "Arche Capital",
          "value": "arche-capital"
        },
        {
          "label": "Breed VC",
          "value": "breed-vc"
        },
        {
          "label": "Block Builders",
          "value": "block-builders"
        },
        {
          "label": "Joe McCann",
          "value": "joe-mccann"
        },
        {
          "label": "Brian Long",
          "value": "brian-long"
        },
        {
          "label": "Geoff Renaud",
          "value": "geoff-renaud"
        },
        {
          "label": "Danish Chaudhry",
          "value": "danish-chaudhry"
        },
        {
          "label": "Rooter",
          "value": "rooter"
        },
        {
          "label": "Jack C Liu",
          "value": "jack-c-liu"
        },
        {
          "label": "Sapphire Ventures",
          "value": "sapphire-ventures"
        },
        {
          "label": "Boldstart Ventures",
          "value": "boldstart-ventures"
        },
        {
          "label": "StepStone Group",
          "value": "stepstone-group"
        },
        {
          "label": "Matrix Capital Management",
          "value": "matrix-capital-management"
        },
        {
          "label": "Lerer Hippeau",
          "value": "lerer-hippeau"
        },
        {
          "label": "Comcast",
          "value": "comcast"
        },
        {
          "label": "Plug and Play",
          "value": "plug-and-play"
        },
        {
          "label": "Boldstart",
          "value": "boldstart"
        },
        {
          "label": "MState",
          "value": "mstate"
        },
        {
          "label": "BlockFi",
          "value": "blockfi"
        },
        {
          "label": "Comcast Ventures",
          "value": "comcast-ventures"
        },
        {
          "label": "Genacast Ventures",
          "value": "genacast-ventures"
        },
        {
          "label": "Heavybit",
          "value": "heavybit"
        },
        {
          "label": "Liquid 2 Ventures",
          "value": "liquid-2-ventures"
        },
        {
          "label": "Semantic Ventures",
          "value": "semantic-ventures"
        },
        {
          "label": "Anthony Pompliano",
          "value": "anthony-pompliano"
        },
        {
          "label": "Crossbeam Venture Partners",
          "value": "crossbeam-venture-partners"
        },
        {
          "label": "SB Opportunity Fund",
          "value": "sb-opportunity-fund"
        },
        {
          "label": "776",
          "value": "776"
        },
        {
          "label": "Oldslip",
          "value": "oldslip"
        },
        {
          "label": "Libertus Capital",
          "value": "libertus-capital"
        },
        {
          "label": "EQT Ventures",
          "value": "eqt-ventures"
        },
        {
          "label": "01 Advisors",
          "value": "01-advisors"
        },
        {
          "label": "Figment Capital",
          "value": "figment-capital"
        },
        {
          "label": "Breyer Capital",
          "value": "breyer-capital"
        },
        {
          "label": "LongLing Capital",
          "value": "longling-capital"
        },
        {
          "label": "Qiming Venture Partners",
          "value": "qiming-venture-partners"
        },
        {
          "label": "Xpring",
          "value": "xpring"
        },
        {
          "label": "Kilowatt Capital",
          "value": "kilowatt-capital"
        },
        {
          "label": "MetaStable",
          "value": "metastable"
        },
        {
          "label": "Chorus.One",
          "value": "chorusone"
        },
        {
          "label": "Alphabit Fund",
          "value": "alphabit-fund"
        },
        {
          "label": "DuckDAO",
          "value": "duckdao"
        },
        {
          "label": "Aglaé Ventures",
          "value": "aglae-ventures"
        },
        {
          "label": "Nurikabe",
          "value": "nurikabe"
        },
        {
          "label": "DBA",
          "value": "dba"
        },
        {
          "label": "Sky9 Capital",
          "value": "sky9-capital"
        },
        {
          "label": "Polygon Studios",
          "value": "polygon-studios"
        },
        {
          "label": "Dapper Labs",
          "value": "dapper-labs"
        },
        {
          "label": "Compound",
          "value": "compound"
        },
        {
          "label": "Devonshire Investors",
          "value": "devonshire-investors"
        },
        {
          "label": "INBlockchain",
          "value": "inblockchain"
        },
        {
          "label": "Limitless Crypto Investments",
          "value": "limitless-crypto-investments"
        },
        {
          "label": "Susquehanna International Group",
          "value": "susquehanna-international-group"
        },
        {
          "label": "Collider",
          "value": "collider"
        },
        {
          "label": "MetaStable Capital",
          "value": "metastable-capital"
        },
        {
          "label": "Asimov Ventures",
          "value": "asimov-ventures"
        },
        {
          "label": "Daniel Curran",
          "value": "daniel-curran"
        },
        {
          "label": "FundersClub",
          "value": "fundersclub"
        },
        {
          "label": "Marc Bell Ventures",
          "value": "marc-bell-ventures"
        },
        {
          "label": "Niraj Mehta",
          "value": "niraj-mehta"
        },
        {
          "label": "Medici Ventures",
          "value": "medici-ventures"
        },
        {
          "label": "Amplo",
          "value": "amplo"
        },
        {
          "label": "Marcos Galperin",
          "value": "marcos-galperin"
        },
        {
          "label": "Martin Migoya",
          "value": "martin-migoya"
        },
        {
          "label": "BnkToTheFuture",
          "value": "bnktothefuture"
        },
        {
          "label": "Ben Franklin Technology Partners of Southeastern Pennsylvania",
          "value": "ben-franklin-technology-partners-of-southeastern-pennsylvania"
        },
        {
          "label": "Robin Hood Ventures",
          "value": "robin-hood-ventures"
        },
        {
          "label": "Scott Becker",
          "value": "scott-becker"
        },
        {
          "label": "Stripe",
          "value": "stripe"
        },
        {
          "label": "Jane Street",
          "value": "jane-street"
        },
        {
          "label": "Julian Koh",
          "value": "julian-koh"
        },
        {
          "label": "Jai Prasad",
          "value": "jai-prasad"
        },
        {
          "label": "Visa",
          "value": "visa"
        },
        {
          "label": "Lux Capital",
          "value": "lux-capital"
        },
        {
          "label": "Indico",
          "value": "indico"
        },
        {
          "label": "KKR",
          "value": "kkr"
        },
        {
          "label": "Delta Blockchain Fund",
          "value": "delta-blockchain-fund"
        },
        {
          "label": "Acequia Capital",
          "value": "acequia-capital"
        },
        {
          "label": "Charlie Songhurst",
          "value": "charlie-songhurst"
        },
        {
          "label": "OrangeDAO",
          "value": "orangedao"
        },
        {
          "label": "Avalanche Foundation",
          "value": "avalanche-foundation"
        },
        {
          "label": "Ashton Kutcher",
          "value": "ashton-kutcher"
        },
        {
          "label": "Global Secure Invest",
          "value": "global-secure-invest"
        },
        {
          "label": "AppWorks",
          "value": "appworks"
        },
        {
          "label": "East Chain Co.",
          "value": "east-chain-co"
        },
        {
          "label": "Argo Ventures",
          "value": "argo-ventures"
        },
        {
          "label": "Aquiline Technology Growth",
          "value": "aquiline-technology-growth"
        },
        {
          "label": "Aquiline Capital Partners",
          "value": "aquiline-capital-partners"
        },
        {
          "label": "Capital Nine",
          "value": "capital-nine"
        },
        {
          "label": "Delta-v Capital",
          "value": "delta-v-capital"
        },
        {
          "label": "G Squared",
          "value": "g-squared"
        },
        {
          "label": "Menlo Ventures",
          "value": "menlo-ventures"
        },
        {
          "label": "Nimble Ventures",
          "value": "nimble-ventures"
        },
        {
          "label": "Heron Rock Fund",
          "value": "heron-rock-fund"
        },
        {
          "label": "Innovation Endeavors",
          "value": "innovation-endeavors"
        },
        {
          "label": "Mosaic Ventures",
          "value": "mosaic-ventures"
        },
        {
          "label": "Reid Hoffman",
          "value": "reid-hoffman"
        },
        {
          "label": "Real Ventures",
          "value": "real-ventures"
        },
        {
          "label": "Kingsway Capital",
          "value": "kingsway-capital"
        },
        {
          "label": "Cohen & Company Capital Markets",
          "value": "cohen-and-company-capital-markets"
        },
        {
          "label": "Horizons Ventures",
          "value": "horizons-ventures"
        },
        {
          "label": "Tencent",
          "value": "tencent"
        },
        {
          "label": "AngelList Talent",
          "value": "angellist-talent"
        },
        {
          "label": "AXA Venture Partners",
          "value": "axa-venture-partners"
        },
        {
          "label": "DG Ventures",
          "value": "dg-ventures"
        },
        {
          "label": "Crypto.com",
          "value": "cryptocom"
        },
        {
          "label": "Road Capital",
          "value": "road-capital"
        },
        {
          "label": "Matrix Port",
          "value": "matrix-port"
        },
        {
          "label": "Genesis One Capital",
          "value": "genesis-one-capital"
        },
        {
          "label": "King River Capital",
          "value": "king-river-capital"
        },
        {
          "label": "AVG",
          "value": "avg"
        },
        {
          "label": "Hoxton Ventures",
          "value": "hoxton-ventures"
        },
        {
          "label": "20VC",
          "value": "20vc"
        },
        {
          "label": "Chalfen Ventures",
          "value": "chalfen-ventures"
        },
        {
          "label": "Momentum 6",
          "value": "momentum-6"
        },
        {
          "label": "Stake Capital Group",
          "value": "stake-capital-group"
        },
        {
          "label": "KR1 plc",
          "value": "kr1-plc"
        },
        {
          "label": "Sunny Aggarwal",
          "value": "sunny-aggarwal"
        },
        {
          "label": "Mudit Gupta",
          "value": "mudit-gupta"
        },
        {
          "label": "Amrit Kumar",
          "value": "amrit-kumar"
        },
        {
          "label": "Aschwin R.",
          "value": "aschwin-r"
        },
        {
          "label": "COIND",
          "value": "coind"
        },
        {
          "label": "Tor Kenz Capital",
          "value": "tor-kenz-capital"
        },
        {
          "label": "Fidelity",
          "value": "fidelity"
        },
        {
          "label": "Faculty Group",
          "value": "faculty-group"
        },
        {
          "label": "Loi Luu",
          "value": "loi-luu"
        },
        {
          "label": "500 Startups",
          "value": "500-startups"
        },
        {
          "label": "Selini Capital",
          "value": "selini-capital"
        },
        {
          "label": "HashKey Capital",
          "value": "hashkey-capital"
        },
        {
          "label": "ParaFi",
          "value": "parafi"
        },
        {
          "label": "Juan Benet",
          "value": "juan-benet"
        },
        {
          "label": "Betty Chen",
          "value": "betty-chen"
        },
        {
          "label": "Bobby Ong",
          "value": "bobby-ong"
        },
        {
          "label": "Coin98",
          "value": "coin98"
        },
        {
          "label": "Jordan Momtazi",
          "value": "jordan-momtazi"
        },
        {
          "label": "Leo Chang",
          "value": "leo-chang"
        },
        {
          "label": "A&T",
          "value": "aandt"
        },
        {
          "label": "Value Internet Fund",
          "value": "value-internet-fund"
        },
        {
          "label": "Smokey The Bera",
          "value": "smokey-the-bera"
        },
        {
          "label": "Ryan Watkins",
          "value": "ryan-watkins"
        },
        {
          "label": "Daniel Cheung",
          "value": "daniel-cheung"
        },
        {
          "label": "GD10 Ventures",
          "value": "gd10-ventures"
        },
        {
          "label": "Master Ventures",
          "value": "master-ventures"
        },
        {
          "label": "Target Global",
          "value": "target-global"
        },
        {
          "label": "Maven Capital",
          "value": "maven-capital"
        },
        {
          "label": "Konvoy Ventures",
          "value": "konvoy-ventures"
        },
        {
          "label": "G20 Ventures",
          "value": "g20-ventures"
        },
        {
          "label": "Varys Capital",
          "value": "varys-capital"
        },
        {
          "label": "Colony",
          "value": "colony"
        },
        {
          "label": "Interop Ventures",
          "value": "interop-ventures"
        },
        {
          "label": "Elixir Capital",
          "value": "elixir-capital"
        },
        {
          "label": "George Lampeth",
          "value": "george-lampeth"
        },
        {
          "label": "Alchemy Ventures",
          "value": "alchemy-ventures"
        },
        {
          "label": "Anurag Arjun",
          "value": "anurag-arjun"
        },
        {
          "label": "Coinflip Canada",
          "value": "coinflip-canada"
        },
        {
          "label": "Aptos Labs",
          "value": "aptos-labs"
        },
        {
          "label": "Cogitent Ventures",
          "value": "cogitent-ventures"
        },
        {
          "label": "Apollo Capital",
          "value": "apollo-capital"
        },
        {
          "label": "Nexus Mutual",
          "value": "nexus-mutual"
        },
        {
          "label": "Hustler Fund",
          "value": "hustler-fund"
        },
        {
          "label": "Spark Capital",
          "value": "spark-capital"
        },
        {
          "label": "Token Bay Capital",
          "value": "token-bay-capital"
        },
        {
          "label": "Uncorrelated Ventures",
          "value": "uncorrelated-ventures"
        },
        {
          "label": "Nextblock",
          "value": "nextblock"
        },
        {
          "label": "Green Visor Capital",
          "value": "green-visor-capital"
        },
        {
          "label": "Collaborative Fund",
          "value": "collaborative-fund"
        },
        {
          "label": "Lynett Capital",
          "value": "lynett-capital"
        },
        {
          "label": "Pardon Makumbe",
          "value": "pardon-makumbe"
        },
        {
          "label": "Bitso",
          "value": "bitso"
        },
        {
          "label": "Charles Delingpole",
          "value": "charles-delingpole"
        },
        {
          "label": "F-Prime Capital",
          "value": "f-prime-capital"
        },
        {
          "label": "Foundry Group",
          "value": "foundry-group"
        },
        {
          "label": "Industry Ventures",
          "value": "industry-ventures"
        },
        {
          "label": "Rho Capital Partners",
          "value": "rho-capital-partners"
        },
        {
          "label": "Ryan Sean Adams",
          "value": "ryan-sean-adams"
        },
        {
          "label": "Taylor Monahan",
          "value": "taylor-monahan"
        },
        {
          "label": "Matchbox DAO",
          "value": "matchbox-dao"
        },
        {
          "label": "Shalom Meckenzie",
          "value": "shalom-meckenzie"
        },
        {
          "label": "Pragma Ventures",
          "value": "pragma-ventures"
        },
        {
          "label": "Avalanche Asia Star Fund",
          "value": "avalanche-asia-star-fund"
        },
        {
          "label": "GBIC",
          "value": "gbic"
        },
        {
          "label": "Ego Death Capital",
          "value": "ego-death-capital"
        },
        {
          "label": "Lightning Ventures",
          "value": "lightning-ventures"
        },
        {
          "label": "Redalpine",
          "value": "redalpine"
        },
        {
          "label": "ACE & Company",
          "value": "ace-and-company"
        },
        {
          "label": "Polytech Ventures",
          "value": "polytech-ventures"
        },
        {
          "label": "Lev Livnev",
          "value": "lev-livnev"
        },
        {
          "label": "Marc Bhargava",
          "value": "marc-bhargava"
        },
        {
          "label": "Lily Liu",
          "value": "lily-liu"
        },
        {
          "label": "Ghaf Capital",
          "value": "ghaf-capital"
        },
        {
          "label": "CSP DAO",
          "value": "csp-dao"
        },
        {
          "label": "Scott Keto",
          "value": "scott-keto"
        },
        {
          "label": "Venrock",
          "value": "venrock"
        },
        {
          "label": "KuCoin Ventures",
          "value": "kucoin-ventures"
        },
        {
          "label": "Gerstenbrot Capital",
          "value": "gerstenbrot-capital"
        },
        {
          "label": "Gemini",
          "value": "gemini"
        },
        {
          "label": "Dunamu",
          "value": "dunamu"
        },
        {
          "label": "Translink Capital",
          "value": "translink-capital"
        },
        {
          "label": "Alice Lloyd George",
          "value": "alice-lloyd-george"
        },
        {
          "label": "Ashley Tyson",
          "value": "ashley-tyson"
        },
        {
          "label": "Biz Stone",
          "value": "biz-stone"
        },
        {
          "label": "Bored Elon",
          "value": "bored-elon"
        },
        {
          "label": "ConsenSys",
          "value": "consensys"
        },
        {
          "label": "Very Early Ventures",
          "value": "very-early-ventures"
        },
        {
          "label": "OKX Ventures",
          "value": "okx-ventures"
        },
        {
          "label": "Fidelity Management",
          "value": "fidelity-management"
        },
        {
          "label": "Flybridge",
          "value": "flybridge"
        },
        {
          "label": "Altimeter Capital",
          "value": "altimeter-capital"
        },
        {
          "label": "Kevin Lin",
          "value": "kevin-lin"
        },
        {
          "label": "SOSV",
          "value": "sosv"
        },
        {
          "label": "Oyster Ventures",
          "value": "oyster-ventures"
        },
        {
          "label": "UpVentures Capital",
          "value": "upventures-capital"
        },
        {
          "label": "Brevan Howard Asset Management",
          "value": "brevan-howard-asset-management"
        },
        {
          "label": "Cabin VC",
          "value": "cabin-vc"
        },
        {
          "label": "George Godula",
          "value": "george-godula"
        },
        {
          "label": "Blue Ivy Ventures",
          "value": "blue-ivy-ventures"
        },
        {
          "label": "Broadhaven Capital Partners",
          "value": "broadhaven-capital-partners"
        },
        {
          "label": "Atreides Management",
          "value": "atreides-management"
        },
        {
          "label": "Diverse Angels",
          "value": "diverse-angels"
        },
        {
          "label": "Holland George Capital Management",
          "value": "holland-george-capital-management"
        },
        {
          "label": "Motley Fool Ventures",
          "value": "motley-fool-ventures"
        },
        {
          "label": "J.A.S Ventures",
          "value": "jas-ventures"
        },
        {
          "label": "Jason Roper",
          "value": "jason-roper"
        },
        {
          "label": "Floodgate",
          "value": "floodgate"
        },
        {
          "label": "Zhuoxun Yin",
          "value": "zhuoxun-yin"
        },
        {
          "label": "Bryan Pellegrino",
          "value": "bryan-pellegrino"
        },
        {
          "label": "Speedinvest",
          "value": "speedinvest"
        },
        {
          "label": "Banter Capital",
          "value": "banter-capital"
        },
        {
          "label": "Anthony Bourbon",
          "value": "anthony-bourbon"
        },
        {
          "label": "Lunar Ventures",
          "value": "lunar-ventures"
        },
        {
          "label": "Metaplanet Holdings",
          "value": "metaplanet-holdings"
        },
        {
          "label": "Vsquared Ventures",
          "value": "vsquared-ventures"
        },
        {
          "label": " Stake Capital",
          "value": "stake-capital"
        },
        {
          "label": "Gavin Wood",
          "value": "gavin-wood"
        },
        {
          "label": "Chorus One",
          "value": "chorus-one"
        },
        {
          "label": "FTX",
          "value": "ftx"
        },
        {
          "label": "John Robinson",
          "value": "john-robinson"
        },
        {
          "label": "Archetype Ventures",
          "value": "archetype-ventures"
        },
        {
          "label": "11.2 Capital",
          "value": "112-capital"
        },
        {
          "label": "Anshu Sharma",
          "value": "anshu-sharma"
        },
        {
          "label": "overtime.vc",
          "value": "overtimevc"
        },
        {
          "label": "XYZ Venture Capital",
          "value": "xyz-venture-capital"
        },
        {
          "label": "XYZ",
          "value": "xyz"
        },
        {
          "label": "Google Ventures",
          "value": "google-ventures"
        },
        {
          "label": "Eric Schmidt",
          "value": "eric-schmidt"
        },
        {
          "label": "Vikram Pandit",
          "value": "vikram-pandit"
        },
        {
          "label": "NAventures",
          "value": "naventures"
        },
        {
          "label": "ING Ventures",
          "value": "ing-ventures"
        },
        {
          "label": "Cross River Digital Ventures",
          "value": "cross-river-digital-ventures"
        },
        {
          "label": "Alloy Labs",
          "value": "alloy-labs"
        },
        {
          "label": "Open Source Software Capital",
          "value": "open-source-software-capital"
        },
        {
          "label": "Bob Young",
          "value": "bob-young"
        },
        {
          "label": "Guillermo Rauch",
          "value": "guillermo-rauch"
        },
        {
          "label": "Comma3 Ventures",
          "value": "comma3-ventures"
        },
        {
          "label": "Amjad Masad",
          "value": "amjad-masad"
        },
        {
          "label": "Ceras Ventures",
          "value": "ceras-ventures"
        },
        {
          "label": "Cointelegraph",
          "value": "cointelegraph"
        },
        {
          "label": "Fusion Labs",
          "value": "fusion-labs"
        },
        {
          "label": "Chainlink",
          "value": "chainlink"
        },
        {
          "label": "Promatrix Capital",
          "value": "promatrix-capital"
        },
        {
          "label": "Prysm Group",
          "value": "prysm-group"
        },
        {
          "label": "Arcanum Capital",
          "value": "arcanum-capital"
        },
        {
          "label": "Dutch Crypto Investors",
          "value": "dutch-crypto-investors"
        },
        {
          "label": "RiskEx LLC",
          "value": "riskex-llc"
        },
        {
          "label": "XBTO Group",
          "value": "xbto-group"
        },
        {
          "label": "Akuna Capital",
          "value": "akuna-capital"
        },
        {
          "label": "Babel Finance",
          "value": "babel-finance"
        },
        {
          "label": "BitDAO",
          "value": "bitdao"
        },
        {
          "label": "Genesis",
          "value": "genesis"
        },
        {
          "label": "IMC Financial Markets",
          "value": "imc-financial-markets"
        },
        {
          "label": "Optiver",
          "value": "optiver"
        },
        {
          "label": "Vectr",
          "value": "vectr"
        },
        {
          "label": "Enjin",
          "value": "enjin"
        },
        {
          "label": "Kronos Ventures",
          "value": "kronos-ventures"
        },
        {
          "label": "O(1) Labs",
          "value": "o1-labs"
        },
        {
          "label": "Raptor Group",
          "value": "raptor-group"
        },
        {
          "label": "Hack VC",
          "value": "hack-vc"
        },
        {
          "label": "Libra Capital Ventures",
          "value": "libra-capital-ventures"
        },
        {
          "label": "Greenoaks Capital",
          "value": "greenoaks-capital"
        },
        {
          "label": "Rune Christensen",
          "value": "rune-christensen"
        },
        {
          "label": "Inevitable Games Fund",
          "value": "inevitable-games-fund"
        },
        {
          "label": "Lattice",
          "value": "lattice"
        },
        {
          "label": "Amber",
          "value": "amber"
        },
        {
          "label": "Antonio Garcia Martinez",
          "value": "antonio-garcia-martinez"
        },
        {
          "label": "Derek Walkush",
          "value": "derek-walkush"
        },
        {
          "label": "Fredrik Haga",
          "value": "fredrik-haga"
        },
        {
          "label": "Jill Carlson",
          "value": "jill-carlson"
        },
        {
          "label": "Mats Olsen",
          "value": "mats-olsen"
        },
        {
          "label": "Richard Chen",
          "value": "richard-chen"
        },
        {
          "label": "Jai Bhavnani",
          "value": "jai-bhavnani"
        },
        {
          "label": "Everstake Capital",
          "value": "everstake-capital"
        },
        {
          "label": "Alven",
          "value": "alven"
        },
        {
          "label": "Karatage",
          "value": "karatage"
        },
        {
          "label": "Ripple",
          "value": "ripple"
        },
        {
          "label": "Blockdaemon",
          "value": "blockdaemon"
        },
        {
          "label": "Forge Ventures",
          "value": "forge-ventures"
        },
        {
          "label": "MassMutual Ventures",
          "value": "massmutual-ventures"
        },
        {
          "label": "Chris McCann",
          "value": "chris-mccann"
        },
        {
          "label": "Cherubic Ventures",
          "value": "cherubic-ventures"
        },
        {
          "label": "Deribit",
          "value": "deribit"
        },
        {
          "label": "BitMEX",
          "value": "bitmex"
        },
        {
          "label": "Tangent",
          "value": "tangent"
        },
        {
          "label": "Maelstrom ",
          "value": "maelstrom"
        },
        {
          "label": "Blockchain Coinvestors",
          "value": "blockchain-coinvestors"
        },
        {
          "label": "Athena Ventures",
          "value": "athena-ventures"
        },
        {
          "label": "NLS Ventures",
          "value": "nls-ventures"
        },
        {
          "label": "Mad World Ventures",
          "value": "mad-world-ventures"
        },
        {
          "label": "Guild Alliance",
          "value": "guild-alliance"
        },
        {
          "label": "Further Ventures",
          "value": "further-ventures"
        },
        {
          "label": "Motive Partners",
          "value": "motive-partners"
        },
        {
          "label": "Chris Adelsbach",
          "value": "chris-adelsbach"
        },
        {
          "label": "Rand Hindi",
          "value": "rand-hindi"
        },
        {
          "label": "Foresight Ventures",
          "value": "foresight-ventures"
        },
        {
          "label": "ABN AMRO & Techstars Future of Finance Accelerator",
          "value": "abn-amro-and-techstars-future-of-finance-accelerator"
        },
        {
          "label": "Generative Ventures",
          "value": "generative-ventures"
        },
        {
          "label": "BAI Capital",
          "value": "bai-capital"
        },
        {
          "label": "Skyland Ventures",
          "value": "skyland-ventures"
        },
        {
          "label": "worthalter",
          "value": "worthalter"
        },
        {
          "label": "Presto Labs",
          "value": "presto-labs"
        },
        {
          "label": "WWVentures",
          "value": "wwventures"
        },
        {
          "label": "SIG DT Investments",
          "value": "sig-dt-investments"
        },
        {
          "label": "Northzone",
          "value": "northzone"
        },
        {
          "label": "Packy McCormick",
          "value": "packy-mccormick"
        },
        {
          "label": "Strangelove",
          "value": "strangelove"
        },
        {
          "label": "01 Binary Holdings",
          "value": "01-binary-holdings"
        },
        {
          "label": "Three Arrows Capital",
          "value": "three-arrows-capital"
        },
        {
          "label": "New Form Capital",
          "value": "new-form-capital"
        },
        {
          "label": "Bitcoin Opportunity Fund",
          "value": "bitcoin-opportunity-fund"
        },
        {
          "label": "Axiom",
          "value": "axiom"
        },
        {
          "label": "RIT Capital Partners",
          "value": "rit-capital-partners"
        },
        {
          "label": "Hongkong Innovation and Technology Fund",
          "value": "hongkong-innovation-and-technology-fund"
        },
        {
          "label": "Metapurse",
          "value": "metapurse"
        },
        {
          "label": "Octava Foundation",
          "value": "octava-foundation"
        },
        {
          "label": "Boyu Capital ",
          "value": "boyu-capital"
        },
        {
          "label": "CGV Capital",
          "value": "cgv-capital"
        },
        {
          "label": "Lympo",
          "value": "lympo"
        },
        {
          "label": "Sun Hung Kai & Co",
          "value": "sun-hung-kai-and-co"
        },
        {
          "label": "M7 Alternative Investment Strategies Asia",
          "value": "m7-alternative-investment-strategies-asia"
        },
        {
          "label": "Mind Fund",
          "value": "mind-fund"
        },
        {
          "label": "Neoteny",
          "value": "neoteny"
        },
        {
          "label": "Simon Clausen",
          "value": "simon-clausen"
        },
        {
          "label": "Startive Ventures",
          "value": "startive-ventures"
        },
        {
          "label": "Smile Group",
          "value": "smile-group"
        },
        {
          "label": "Adit Ventures",
          "value": "adit-ventures"
        },
        {
          "label": "AngelHub",
          "value": "angelhub"
        },
        {
          "label": "Black Anthem",
          "value": "black-anthem"
        },
        {
          "label": "Justin Sun",
          "value": "justin-sun"
        },
        {
          "label": "MSA Novo",
          "value": "msa-novo"
        },
        {
          "label": "Seek Ventures",
          "value": "seek-ventures"
        },
        {
          "label": "Sigitech Holdings",
          "value": "sigitech-holdings"
        },
        {
          "label": "Summer Capital",
          "value": "summer-capital"
        },
        {
          "label": "Tess Ventures",
          "value": "tess-ventures"
        },
        {
          "label": "Mitsu",
          "value": "mitsu"
        },
        {
          "label": "Nonagon Capital",
          "value": "nonagon-capital"
        },
        {
          "label": "Bing Ventures",
          "value": "bing-ventures"
        },
        {
          "label": "Hivemind Ventures",
          "value": "hivemind-ventures"
        },
        {
          "label": "Timechain",
          "value": "timechain"
        },
        {
          "label": "El Zonte Capital",
          "value": "el-zonte-capital"
        },
        {
          "label": "Trammell Venture Partners",
          "value": "trammell-venture-partners"
        },
        {
          "label": "AlphaPoint",
          "value": "alphapoint"
        },
        {
          "label": "Stefano Schiavi",
          "value": "stefano-schiavi"
        },
        {
          "label": "Timo Schlaefer",
          "value": "timo-schlaefer"
        },
        {
          "label": "Wood Investment Partners",
          "value": "wood-investment-partners"
        },
        {
          "label": "Criterion VC",
          "value": "criterion-vc"
        },
        {
          "label": "Decision Tree Ventures",
          "value": "decision-tree-ventures"
        },
        {
          "label": "Evernew Capital",
          "value": "evernew-capital"
        },
        {
          "label": "Polybius Capital",
          "value": "polybius-capital"
        },
        {
          "label": "Zipmex",
          "value": "zipmex"
        },
        {
          "label": "8186 Capital",
          "value": "8186-capital"
        },
        {
          "label": "Akatsuki ",
          "value": "akatsuki"
        },
        {
          "label": "Blockwall Management",
          "value": "blockwall-management"
        },
        {
          "label": "CitizenX Crypto Ventures Fund",
          "value": "citizenx-crypto-ventures-fund"
        },
        {
          "label": "Sneaky Ventures",
          "value": "sneaky-ventures"
        },
        {
          "label": "YOLO Ventures",
          "value": "yolo-ventures"
        },
        {
          "label": "Fabric VC",
          "value": "fabric-vc"
        },
        {
          "label": "Fisher8 Capital",
          "value": "fisher8-capital"
        },
        {
          "label": "Perpetual Protocol",
          "value": "perpetual-protocol"
        },
        {
          "label": "Ledger Cathay Capital",
          "value": "ledger-cathay-capital"
        },
        {
          "label": "Eurazeo",
          "value": "eurazeo"
        },
        {
          "label": "Isai",
          "value": "isai"
        },
        {
          "label": "Bond Capital",
          "value": "bond-capital"
        },
        {
          "label": "Blockchain Builders Fund",
          "value": "blockchain-builders-fund"
        },
        {
          "label": "NYDIG",
          "value": "nydig"
        },
        {
          "label": "Artist Capital Management",
          "value": "artist-capital-management"
        },
        {
          "label": "Deus",
          "value": "deus"
        },
        {
          "label": "Mantle Ecosystem",
          "value": "mantle-ecosystem"
        },
        {
          "label": "Robot Ventures ",
          "value": "robot-ventures"
        },
        {
          "label": "Ying Tong",
          "value": "ying-tong"
        },
        {
          "label": "Carlos Aria",
          "value": "carlos-aria"
        },
        {
          "label": "Ethereum Foundation",
          "value": "ethereum-foundation"
        },
        {
          "label": "Vitalik Buterin",
          "value": "vitalik-buterin"
        },
        {
          "label": "Zcash Co.",
          "value": "zcash-co"
        },
        {
          "label": "Arthur Breitman",
          "value": "arthur-breitman"
        },
        {
          "label": "Da Hongfei",
          "value": "da-hongfei"
        },
        {
          "label": "Atomico",
          "value": "atomico"
        },
        {
          "label": "Symbolic Capital Partners",
          "value": "symbolic-capital-partners"
        },
        {
          "label": "Acrew Capital",
          "value": "acrew-capital"
        },
        {
          "label": "Heartcore web3",
          "value": "heartcore-web3"
        },
        {
          "label": "Safe",
          "value": "safe"
        },
        {
          "label": "Heartcore Capital",
          "value": "heartcore-capital"
        },
        {
          "label": "Cyber",
          "value": "cyber"
        },
        {
          "label": "zksync",
          "value": "zksync"
        },
        {
          "label": "Possible Ventures",
          "value": "possible-ventures"
        },
        {
          "label": "Vertex Ventures",
          "value": "vertex-ventures"
        },
        {
          "label": "Blackdragon Capital",
          "value": "blackdragon-capital"
        },
        {
          "label": "CoinSummer Labs",
          "value": "coinsummer-labs"
        },
        {
          "label": "Third Earth Capital",
          "value": "third-earth-capital"
        },
        {
          "label": "Republic",
          "value": "republic"
        },
        {
          "label": "Casey Caruso",
          "value": "casey-caruso"
        },
        {
          "label": "Tekin Salimi",
          "value": "tekin-salimi"
        },
        {
          "label": "Aaron Buchwald",
          "value": "aaron-buchwald"
        },
        {
          "label": "Saturnin Pugnet",
          "value": "saturnin-pugnet"
        },
        {
          "label": "WSBmod",
          "value": "wsbmod"
        },
        {
          "label": "Alex Lin",
          "value": "alex-lin"
        },
        {
          "label": "Shumo Zhu",
          "value": "shumo-zhu"
        },
        {
          "label": "Yi Tong",
          "value": "yi-tong"
        },
        {
          "label": "Serafund",
          "value": "serafund"
        },
        {
          "label": "Double Peak",
          "value": "double-peak"
        },
        {
          "label": "Stader Ventures",
          "value": "stader-ventures"
        },
        {
          "label": "Sandy Peng",
          "value": "sandy-peng"
        },
        {
          "label": "Kenny Li",
          "value": "kenny-li"
        },
        {
          "label": "Homie Luo",
          "value": "homie-luo"
        },
        {
          "label": "Cyber Fund ",
          "value": "cyber-fund"
        },
        {
          "label": "Digital Garage",
          "value": "digital-garage"
        },
        {
          "label": "Munich Re Ventures",
          "value": "munich-re-ventures"
        },
        {
          "label": "Deutsche Telekom (DTEGY)",
          "value": "deutsche-telekom-dtegy"
        },
        {
          "label": "Coinbase Ventures",
          "value": "coinbase-ventures"
        },
        {
          "label": "Staking Facilities",
          "value": "staking-facilities"
        },
        {
          "label": "a16z crypto",
          "value": "a16z-crypto"
        },
        {
          "label": "Multicoin Capital",
          "value": "multicoin-capital"
        },
        {
          "label": "a16z",
          "value": "a16z"
        },
        {
          "label": "Katie Haun",
          "value": "katie-haun"
        },
        {
          "label": "ParaFi Capital",
          "value": "parafi-capital"
        },
        {
          "label": "IRONGREY",
          "value": "irongrey"
        },
        {
          "label": "Hashed",
          "value": "hashed"
        },
        {
          "label": "Variant Fund",
          "value": "variant-fund"
        },
        {
          "label": "Tiger Global",
          "value": "tiger-global"
        },
        {
          "label": "BlockTower Capital",
          "value": "blocktower-capital"
        },
        {
          "label": "Paxos",
          "value": "paxos"
        },
        {
          "label": "CMS Holdings",
          "value": "cms-holdings"
        },
        {
          "label": "Collab+Currency",
          "value": "collabcurrency"
        },
        {
          "label": "Dragonfly Capital",
          "value": "dragonfly-capital"
        },
        {
          "label": "Lvna Capital",
          "value": "lvna-capital"
        },
        {
          "label": "Polychain",
          "value": "polychain"
        },
        {
          "label": "Republic Crypto",
          "value": "republic-crypto"
        },
        {
          "label": "3AC",
          "value": "3ac"
        },
        {
          "label": "Bitmain",
          "value": "bitmain"
        },
        {
          "label": "Digital Asset Capital Management",
          "value": "digital-asset-capital-management"
        },
        {
          "label": "Galaxy Digital",
          "value": "galaxy-digital"
        },
        {
          "label": "Initialized Capital",
          "value": "initialized-capital"
        },
        {
          "label": "Lemniscap",
          "value": "lemniscap"
        },
        {
          "label": "NGC Ventures",
          "value": "ngc-ventures"
        },
        {
          "label": "Binance Labs",
          "value": "binance-labs"
        },
        {
          "label": "Pantera Capital",
          "value": "pantera-capital"
        },
        {
          "label": "Accel",
          "value": "accel"
        },
        {
          "label": "Nascent",
          "value": "nascent"
        },
        {
          "label": "Paradigm",
          "value": "paradigm"
        },
        {
          "label": "Ideo CoLab",
          "value": "ideo-colab"
        },
        {
          "label": "Leon Hillmann",
          "value": "leon-hillmann"
        },
        {
          "label": "Accomplice",
          "value": "accomplice"
        },
        {
          "label": "Julian Sarokin",
          "value": "julian-sarokin"
        },
        {
          "label": "MGX",
          "value": "mgx"
        },
        {
          "label": "Avichal Garg",
          "value": "avichal-garg"
        },
        {
          "label": "Lightspeed Venture Partners",
          "value": "lightspeed-venture-partners"
        },
        {
          "label": "Mark Cuban",
          "value": "mark-cuban"
        },
        {
          "label": "Redpoint",
          "value": "redpoint"
        },
        {
          "label": "Ribbit Capital",
          "value": "ribbit-capital"
        },
        {
          "label": "Sequoia Capital India",
          "value": "sequoia-capital-india"
        },
        {
          "label": "Galaxy Interactive",
          "value": "galaxy-interactive"
        },
        {
          "label": "Republic Capital",
          "value": "republic-capital"
        },
        {
          "label": "Animoca Brands",
          "value": "animoca-brands"
        },
        {
          "label": "Scopely",
          "value": "scopely"
        },
        {
          "label": "USV",
          "value": "usv"
        },
        {
          "label": "Seven Seven Six",
          "value": "seven-seven-six"
        },
        {
          "label": "Sino Global Capital",
          "value": "sino-global-capital"
        },
        {
          "label": "Standard Crypto",
          "value": "standard-crypto"
        },
        {
          "label": "Blue Pool Capital",
          "value": "blue-pool-capital"
        },
        {
          "label": "Third Point",
          "value": "third-point"
        },
        {
          "label": "SoftBank",
          "value": "softbank"
        },
        {
          "label": "John Lilic",
          "value": "john-lilic"
        },
        {
          "label": "1kx",
          "value": "1kx"
        },
        {
          "label": "Dekrypt Capital",
          "value": "dekrypt-capital"
        },
        {
          "label": "Placeholder",
          "value": "placeholder"
        },
        {
          "label": "Aave Ventures",
          "value": "aave-ventures"
        },
        {
          "label": "Alchemy",
          "value": "alchemy"
        },
        {
          "label": "Blockchain.com Ventures",
          "value": "blockchaincom-ventures"
        },
        {
          "label": "Bybit",
          "value": "bybit"
        },
        {
          "label": "Eric Conner",
          "value": "eric-conner"
        },
        {
          "label": "Gnosis",
          "value": "gnosis"
        },
        {
          "label": "Lido Peninsula Venture Partners",
          "value": "lido-peninsula-venture-partners"
        },
        {
          "label": "OKEx",
          "value": "okex"
        },
        {
          "label": "Rarible",
          "value": "rarible"
        },
        {
          "label": "4RC",
          "value": "4rc"
        },
        {
          "label": "Creandum",
          "value": "creandum"
        },
        {
          "label": "Firstminute Capital",
          "value": "firstminute-capital"
        },
        {
          "label": "Hummingbird Ventures",
          "value": "hummingbird-ventures"
        },
        {
          "label": "Index Ventures",
          "value": "index-ventures"
        },
        {
          "label": "Mattias Ljungman",
          "value": "mattias-ljungman"
        },
        {
          "label": "Proxy Ventures",
          "value": "proxy-ventures"
        },
        {
          "label": "Robert Leshner",
          "value": "robert-leshner"
        },
        {
          "label": "Com2uS",
          "value": "com2us"
        },
        {
          "label": "Gaingels",
          "value": "gaingels"
        },
        {
          "label": "ConsenSys Mesh",
          "value": "consensys-mesh"
        },
        {
          "label": "10T Holdings",
          "value": "10t-holdings"
        },
        {
          "label": "GIC",
          "value": "gic"
        },
        {
          "label": "Blackstone",
          "value": "blackstone"
        },
        {
          "label": "Dragoneer",
          "value": "dragoneer"
        },
        {
          "label": "BNY Mellon",
          "value": "bny-mellon"
        },
        {
          "label": "Point Nine Capital",
          "value": "point-nine-capital"
        },
        {
          "label": "Techstars",
          "value": "techstars"
        },
        {
          "label": "Funders Club",
          "value": "funders-club"
        },
        {
          "label": "Converge VP",
          "value": "converge-vp"
        },
        {
          "label": "Ribit Capital",
          "value": "ribit-capital"
        },
        {
          "label": "Taureon",
          "value": "taureon"
        },
        {
          "label": "TI Capital",
          "value": "ti-capital"
        },
        {
          "label": "YBB Foundation",
          "value": "ybb-foundation"
        },
        {
          "label": "Digital Finance Group",
          "value": "digital-finance-group"
        },
        {
          "label": "FBG Capital",
          "value": "fbg-capital"
        },
        {
          "label": "Genesis Block Ventures",
          "value": "genesis-block-ventures"
        },
        {
          "label": "Hypersphere Ventures",
          "value": "hypersphere-ventures"
        },
        {
          "label": "LD Capital",
          "value": "ld-capital"
        },
        {
          "label": "Sequoia Capital",
          "value": "sequoia-capital"
        },
        {
          "label": "Solana Ventures",
          "value": "solana-ventures"
        },
        {
          "label": "6th Man Ventures",
          "value": "6th-man-ventures"
        },
        {
          "label": "Greylock",
          "value": "greylock"
        },
        {
          "label": "Uncork Capital",
          "value": "uncork-capital"
        },
        {
          "label": "Anthemis Group",
          "value": "anthemis-group"
        },
        {
          "label": "Yann Ranchere",
          "value": "yann-ranchere"
        },
        {
          "label": "Brevan Howard Digital",
          "value": "brevan-howard-digital"
        },
        {
          "label": "Morgan Creek Digital",
          "value": "morgan-creek-digital"
        },
        {
          "label": "Samsung Next",
          "value": "samsung-next"
        },
        {
          "label": "Point72 Ventures",
          "value": "point72-ventures"
        },
        {
          "label": "Kraken Ventures",
          "value": "kraken-ventures"
        },
        {
          "label": "Underscore VC",
          "value": "underscore-vc"
        },
        {
          "label": "Coinbase",
          "value": "coinbase"
        },
        {
          "label": "Anthemis",
          "value": "anthemis"
        },
        {
          "label": "Digital Asset Investment Company",
          "value": "digital-asset-investment-company"
        },
        {
          "label": "Danhua Capital",
          "value": "danhua-capital"
        },
        {
          "label": "Rising Tide",
          "value": "rising-tide"
        },
        {
          "label": "Semantic",
          "value": "semantic"
        },
        {
          "label": "SparkLabs Global",
          "value": "sparklabs-global"
        },
        {
          "label": "Ali Tamaseb",
          "value": "ali-tamaseb"
        },
        {
          "label": "Blockchain Ventures Corp",
          "value": "blockchain-ventures-corp"
        },
        {
          "label": "Gemini Frontier Fund",
          "value": "gemini-frontier-fund"
        },
        {
          "label": "Kraken",
          "value": "kraken"
        },
        {
          "label": "Near",
          "value": "near"
        },
        {
          "label": "Scytale",
          "value": "scytale"
        },
        {
          "label": "HK Trading Limited",
          "value": "hk-trading-limited"
        },
        {
          "label": "Rockaway Blockchain Fund",
          "value": "rockaway-blockchain-fund"
        },
        {
          "label": "FinTech Collective",
          "value": "fintech-collective"
        },
        {
          "label": "Moonwhale",
          "value": "moonwhale"
        },
        {
          "label": "HASH CIB",
          "value": "hash-cib"
        },
        {
          "label": "Mariano Conti",
          "value": "mariano-conti"
        },
        {
          "label": "Stani Kulechov",
          "value": "stani-kulechov"
        },
        {
          "label": "Kain Warwick",
          "value": "kain-warwick"
        },
        {
          "label": "Brian Crain",
          "value": "brian-crain"
        },
        {
          "label": "Edessa Capital",
          "value": "edessa-capital"
        },
        {
          "label": "ProtoCap",
          "value": "protocap"
        },
        {
          "label": "Bloccelerate",
          "value": "bloccelerate"
        },
        {
          "label": "Skynet Trading",
          "value": "skynet-trading"
        },
        {
          "label": "Stake Capital",
          "value": "stake-capital"
        },
        {
          "label": "Borderless Capital",
          "value": "borderless-capital"
        },
        {
          "label": "Spartan Capital",
          "value": "spartan-capital"
        },
        {
          "label": "RE7Capital",
          "value": "re7capital"
        },
        {
          "label": "Modular Capital",
          "value": "modular-capital"
        },
        {
          "label": "Wintermute",
          "value": "wintermute"
        },
        {
          "label": "Stefan George",
          "value": "stefan-george"
        },
        {
          "label": "Lyuben Belov",
          "value": "lyuben-belov"
        },
        {
          "label": "Ausvic Capital",
          "value": "ausvic-capital"
        },
        {
          "label": "Foothill Ventures",
          "value": "foothill-ventures"
        },
        {
          "label": "IDG Capital",
          "value": "idg-capital"
        },
        {
          "label": "Lenovo",
          "value": "lenovo"
        },
        {
          "label": "Wing Venture Capital",
          "value": "wing-venture-capital"
        },
        {
          "label": "Shunwei Capital",
          "value": "shunwei-capital"
        },
        {
          "label": "Hillhouse Capital Group",
          "value": "hillhouse-capital-group"
        },
        {
          "label": "Wing",
          "value": "wing"
        },
        {
          "label": "Ethereal Ventures",
          "value": "ethereal-ventures"
        },
        {
          "label": "Polygon Ventures",
          "value": "polygon-ventures"
        },
        {
          "label": "a_capital",
          "value": "acapital"
        },
        {
          "label": "No Limit Holdings",
          "value": "no-limit-holdings"
        },
        {
          "label": "Huobi Capital",
          "value": "huobi-capital"
        },
        {
          "label": "Block Dream Fund",
          "value": "block-dream-fund"
        },
        {
          "label": "eGirl Capital",
          "value": "egirl-capital"
        },
        {
          "label": "Larry Cermak",
          "value": "larry-cermak"
        },
        {
          "label": "Dfinity Beacon Fund",
          "value": "dfinity-beacon-fund"
        },
        {
          "label": "Zola Global Investors",
          "value": "zola-global-investors"
        },
        {
          "label": "Meltem Demirors",
          "value": "meltem-demirors"
        },
        {
          "label": "Terra",
          "value": "terra"
        },
        {
          "label": "Terraform Labs",
          "value": "terraform-labs"
        },
        {
          "label": "Delphi Ventures",
          "value": "delphi-ventures"
        },
        {
          "label": "Variant",
          "value": "variant"
        },
        {
          "label": "Uniswap Labs Ventures",
          "value": "uniswap-labs-ventures"
        },
        {
          "label": "Not3Lau Capital",
          "value": "not3lau-capital"
        },
        {
          "label": "Keyboard Monkey",
          "value": "keyboard-monkey"
        },
        {
          "label": "Mirae Asset",
          "value": "mirae-asset"
        },
        {
          "label": "Declaration Partners",
          "value": "declaration-partners"
        },
        {
          "label": "Tencent Holdings",
          "value": "tencent-holdings"
        },
        {
          "label": "BH Digital",
          "value": "bh-digital"
        },
        {
          "label": "Axia8 Ventures",
          "value": "axia8-ventures"
        },
        {
          "label": "Bitlink Capital",
          "value": "bitlink-capital"
        },
        {
          "label": "Innovating Capital",
          "value": "innovating-capital"
        },
        {
          "label": "K42",
          "value": "k42"
        },
        {
          "label": "Tioga Capital",
          "value": "tioga-capital"
        },
        {
          "label": "Cherry Ventures",
          "value": "cherry-ventures"
        },
        {
          "label": "Veris Ventures",
          "value": "veris-ventures"
        },
        {
          "label": "Cluster Capital",
          "value": "cluster-capital"
        },
        {
          "label": "Nascent ",
          "value": "nascent"
        },
        {
          "label": "IEX",
          "value": "iex"
        },
        {
          "label": "Stakely.vc",
          "value": "stakelyvc"
        },
        {
          "label": "Kukis Global",
          "value": "kukis-global"
        },
        {
          "label": "Swiss Staking",
          "value": "swiss-staking"
        },
        {
          "label": "Blockscape Lab",
          "value": "blockscape-lab"
        },
        {
          "label": "DSRV",
          "value": "dsrv"
        },
        {
          "label": "Dylan Field",
          "value": "dylan-field"
        },
        {
          "label": "gumi Cryptos Capital",
          "value": "gumi-cryptos-capital"
        },
        {
          "label": "StartX",
          "value": "startx"
        },
        {
          "label": "Lightspeed Faction",
          "value": "lightspeed-faction"
        },
        {
          "label": "Arca",
          "value": "arca"
        },
        {
          "label": "Placeholder VC",
          "value": "placeholder-vc"
        },
        {
          "label": "Redbeard Ventures",
          "value": "redbeard-ventures"
        },
        {
          "label": "Metaplanet",
          "value": "metaplanet"
        },
        {
          "label": "Two Sigma Ventures",
          "value": "two-sigma-ventures"
        },
        {
          "label": "Jane Street Capital",
          "value": "jane-street-capital"
        },
        {
          "label": "Hudson River Trading",
          "value": "hudson-river-trading"
        },
        {
          "label": "Flow Traders",
          "value": "flow-traders"
        },
        {
          "label": "GoldenTree Asset Management",
          "value": "goldentree-asset-management"
        },
        {
          "label": "Alphalab Capital",
          "value": "alphalab-capital"
        },
        {
          "label": "Cumberland DRW",
          "value": "cumberland-drw"
        },
        {
          "label": "C2 Ventures",
          "value": "c2-ventures"
        },
        {
          "label": "Cardinia Ventures",
          "value": "cardinia-ventures"
        },
        {
          "label": "Founders' Co-op",
          "value": "founders-co-op"
        },
        {
          "label": "Geek Ventures",
          "value": "geek-ventures"
        },
        {
          "label": "Ihar Mahaniok",
          "value": "ihar-mahaniok"
        },
        {
          "label": "Madrona Venture Group",
          "value": "madrona-venture-group"
        },
        {
          "label": "Mark Russinovich",
          "value": "mark-russinovich"
        },
        {
          "label": "Nat Friedman",
          "value": "nat-friedman"
        },
        {
          "label": "Picus Capital",
          "value": "picus-capital"
        },
        {
          "label": "Protoscale Capital",
          "value": "protoscale-capital"
        },
        {
          "label": "TA Ventures",
          "value": "ta-ventures"
        },
        {
          "label": "Third Prime Ventures",
          "value": "third-prime-ventures"
        },
        {
          "label": "Lattice Capital",
          "value": "lattice-capital"
        },
        {
          "label": "BitScale",
          "value": "bitscale"
        },
        {
          "label": "Blueprint Forest",
          "value": "blueprint-forest"
        },
        {
          "label": "BR Capital",
          "value": "br-capital"
        },
        {
          "label": "IDEO CoLab Ventures",
          "value": "ideo-colab-ventures"
        },
        {
          "label": "OpenSea Ventures",
          "value": "opensea-ventures"
        },
        {
          "label": "A Capital",
          "value": "a-capital"
        },
        {
          "label": "Frances Haugen",
          "value": "frances-haugen"
        },
        {
          "label": "Ryan Selkis",
          "value": "ryan-selkis"
        },
        {
          "label": "Joel Thorstensson",
          "value": "joel-thorstensson"
        },
        {
          "label": "Matias Woloski",
          "value": "matias-woloski"
        },
        {
          "label": "Scott Moore",
          "value": "scott-moore"
        },
        {
          "label": "Spencer Yang",
          "value": "spencer-yang"
        },
        {
          "label": "Han Hua",
          "value": "han-hua"
        },
        {
          "label": "Jin Chung",
          "value": "jin-chung"
        },
        {
          "label": "Mike Demerais",
          "value": "mike-demerais"
        },
        {
          "label": "Christian Baroni",
          "value": "christian-baroni"
        },
        {
          "label": "Bruno Barbieri",
          "value": "bruno-barbieri"
        },
        {
          "label": "Alexander Salnikov",
          "value": "alexander-salnikov"
        },
        {
          "label": "Viktor Bunin",
          "value": "viktor-bunin"
        },
        {
          "label": "Mara Schmiedt",
          "value": "mara-schmiedt"
        },
        {
          "label": "Wayne Chang",
          "value": "wayne-chang"
        },
        {
          "label": "Gregory Rocco",
          "value": "gregory-rocco"
        },
        {
          "label": "Anna Rose",
          "value": "anna-rose"
        },
        {
          "label": "Ajit Tripathi",
          "value": "ajit-tripathi"
        },
        {
          "label": "Alex Harley",
          "value": "alex-harley"
        },
        {
          "label": "Roham Gharegozlou",
          "value": "roham-gharegozlou"
        },
        {
          "label": "Korelya Capital",
          "value": "korelya-capital"
        },
        {
          "label": "Castle Island Ventures",
          "value": "castle-island-ventures"
        },
        {
          "label": "Illuminate Financial",
          "value": "illuminate-financial"
        },
        {
          "label": "Notation Capital",
          "value": "notation-capital"
        },
        {
          "label": "PayPal Ventures",
          "value": "paypal-ventures"
        },
        {
          "label": "Franklin Templeton Investments",
          "value": "franklin-templeton-investments"
        },
        {
          "label": "Village Global",
          "value": "village-global"
        },
        {
          "label": "Protocol Ventures",
          "value": "protocol-ventures"
        },
        {
          "label": "Kima Ventures",
          "value": "kima-ventures"
        },
        {
          "label": "Libertas Capital",
          "value": "libertas-capital"
        },
        {
          "label": "The Whittemore Collection",
          "value": "the-whittemore-collection"
        },
        {
          "label": "Wicklow Capital",
          "value": "wicklow-capital"
        },
        {
          "label": "Abby Adlerman",
          "value": "abby-adlerman"
        },
        {
          "label": "Adam Nash",
          "value": "adam-nash"
        },
        {
          "label": "Alison Davis",
          "value": "alison-davis"
        },
        {
          "label": "Asha Sharma",
          "value": "asha-sharma"
        },
        {
          "label": "Ashley Yuki",
          "value": "ashley-yuki"
        },
        {
          "label": "Benjamin Stein",
          "value": "benjamin-stein"
        },
        {
          "label": "C.J. Fitzgerald",
          "value": "cj-fitzgerald"
        },
        {
          "label": "Carolyn Everson",
          "value": "carolyn-everson"
        },
        {
          "label": "Carrie Pomerantz",
          "value": "carrie-pomerantz"
        },
        {
          "label": "Charles Goldman",
          "value": "charles-goldman"
        },
        {
          "label": "Daniel Saul Sundheim",
          "value": "daniel-saul-sundheim"
        },
        {
          "label": "Dave Fogel",
          "value": "dave-fogel"
        },
        {
          "label": "David McCormick",
          "value": "david-mccormick"
        },
        {
          "label": "Adam Ludwin",
          "value": "adam-ludwin"
        },
        {
          "label": "Eric Wu",
          "value": "eric-wu"
        },
        {
          "label": "Khosla Ventures",
          "value": "khosla-ventures"
        },
        {
          "label": "Ryan Petersen",
          "value": "ryan-petersen"
        },
        {
          "label": "Suna Said",
          "value": "suna-said"
        },
        {
          "label": "Highlight Capital",
          "value": "highlight-capital"
        },
        {
          "label": "Doug Colkitt",
          "value": "doug-colkitt"
        },
        {
          "label": "Cumberland",
          "value": "cumberland"
        },
        {
          "label": "Brevan Howard",
          "value": "brevan-howard"
        },
        {
          "label": "IOSG",
          "value": "iosg"
        },
        {
          "label": "L1D",
          "value": "l1d"
        },
        {
          "label": "Mirana Ventures",
          "value": "mirana-ventures"
        },
        {
          "label": "Cherry Crypto",
          "value": "cherry-crypto"
        },
        {
          "label": "LeadBlock Partners",
          "value": "leadblock-partners"
        },
        {
          "label": "zkValidator",
          "value": "zkvalidator"
        },
        {
          "label": "Kora Management",
          "value": "kora-management"
        },
        {
          "label": "Sea Capital",
          "value": "sea-capital"
        },
        {
          "label": "Superscrypt",
          "value": "superscrypt"
        },
        {
          "label": "Perridon Ventures",
          "value": "perridon-ventures"
        },
        {
          "label": "Theta Capital",
          "value": "theta-capital"
        },
        {
          "label": "Three Point Capital",
          "value": "three-point-capital"
        },
        {
          "label": "Abra",
          "value": "abra"
        },
        {
          "label": "Amber Group",
          "value": "amber-group"
        },
        {
          "label": "Bankless Ventures",
          "value": "bankless-ventures"
        },
        {
          "label": "Collider Ventures",
          "value": "collider-ventures"
        },
        {
          "label": "MrBlock",
          "value": "mrblock"
        },
        {
          "label": "Bitfinex",
          "value": "bitfinex"
        },
        {
          "label": "Legion Capital",
          "value": "legion-capital"
        },
        {
          "label": "Gate Labs",
          "value": "gate-labs"
        },
        {
          "label": "Moonrock Capital",
          "value": "moonrock-capital"
        },
        {
          "label": "CoinGecko",
          "value": "coingecko"
        },
        {
          "label": "Ankr",
          "value": "ankr"
        },
        {
          "label": "Bolt",
          "value": "bolt"
        },
        {
          "label": "Deep Ventures",
          "value": "deep-ventures"
        },
        {
          "label": "Inflection",
          "value": "inflection"
        },
        {
          "label": "Inflection Venture Partners",
          "value": "inflection-venture-partners"
        },
        {
          "label": "Massachusetts Avenue Capital",
          "value": "massachusetts-avenue-capital"
        },
        {
          "label": "Unpopular Ventures",
          "value": "unpopular-ventures"
        },
        {
          "label": "Warburg Serres Investments",
          "value": "warburg-serres-investments"
        },
        {
          "label": "Celo Ecosystem Fund",
          "value": "celo-ecosystem-fund"
        },
        {
          "label": "GreenHouse Capital",
          "value": "greenhouse-capital"
        },
        {
          "label": "Square",
          "value": "square"
        },
        {
          "label": "Valar Ventures",
          "value": "valar-ventures"
        },
        {
          "label": "AngelDAO",
          "value": "angeldao"
        },
        {
          "label": "D64 Ventures",
          "value": "d64-ventures"
        },
        {
          "label": "Alexander Pack",
          "value": "alexander-pack"
        },
        {
          "label": "Kosmos Ventures",
          "value": "kosmos-ventures"
        },
        {
          "label": "Haun Ventures",
          "value": "haun-ventures"
        },
        {
          "label": "PAKA",
          "value": "paka"
        },
        {
          "label": "Altonomy",
          "value": "altonomy"
        },
        {
          "label": "East Ventures",
          "value": "east-ventures"
        },
        {
          "label": "SNZ Holding",
          "value": "snz-holding"
        },
        {
          "label": "Pillar VC",
          "value": "pillar-vc"
        },
        {
          "label": "Josh Cincinnati",
          "value": "josh-cincinnati"
        },
        {
          "label": "Lisa bunin",
          "value": "lisa-bunin"
        },
        {
          "label": "Citi",
          "value": "citi"
        },
        {
          "label": "Goldman Sachs",
          "value": "goldman-sachs"
        },
        {
          "label": "VMware",
          "value": "vmware"
        },
        {
          "label": "ArkStream Capital",
          "value": "arkstream-capital"
        },
        {
          "label": "Incuba Alpha",
          "value": "incuba-alpha"
        },
        {
          "label": "LuneX Ventures",
          "value": "lunex-ventures"
        },
        {
          "label": "Boston Seed Capital",
          "value": "boston-seed-capital"
        },
        {
          "label": "CVP Management",
          "value": "cvp-management"
        },
        {
          "label": "Founder Collective",
          "value": "founder-collective"
        },
        {
          "label": "Resolute Ventures",
          "value": "resolute-ventures"
        },
        {
          "label": "TCG",
          "value": "tcg"
        },
        {
          "label": "True Ventures",
          "value": "true-ventures"
        },
        {
          "label": "Foundation Capital",
          "value": "foundation-capital"
        },
        {
          "label": "GGV Capital",
          "value": "ggv-capital"
        },
        {
          "label": "ZhenFund",
          "value": "zhenfund"
        },
        {
          "label": "George Burke",
          "value": "george-burke"
        },
        {
          "label": "Buck Stash",
          "value": "buck-stash"
        },
        {
          "label": "Infinite Capital",
          "value": "infinite-capital"
        },
        {
          "label": "Gary Vaynerchuk",
          "value": "gary-vaynerchuk"
        },
        {
          "label": "Presight Capital",
          "value": "presight-capital"
        },
        {
          "label": "Bixin Ventures",
          "value": "bixin-ventures"
        },
        {
          "label": "MapleBlock Capital",
          "value": "mapleblock-capital"
        },
        {
          "label": "BoxOne Ventures",
          "value": "boxone-ventures"
        },
        {
          "label": "Diagram Ventures",
          "value": "diagram-ventures"
        },
        {
          "label": "Intel Capital",
          "value": "intel-capital"
        },
        {
          "label": "Panache Ventures",
          "value": "panache-ventures"
        },
        {
          "label": "Richard Reiner",
          "value": "richard-reiner"
        },
        {
          "label": "The Graph",
          "value": "the-graph"
        },
        {
          "label": "T3E",
          "value": "t3e"
        },
        {
          "label": "PrimeBlock Ventures",
          "value": "primeblock-ventures"
        },
        {
          "label": "GBV Capital",
          "value": "gbv-capital"
        },
        {
          "label": "Paribus Ventures",
          "value": "paribus-ventures"
        },
        {
          "label": "Solidity Ventures",
          "value": "solidity-ventures"
        },
        {
          "label": "Ratio Finance",
          "value": "ratio-finance"
        },
        {
          "label": "MEXC Labs",
          "value": "mexc-labs"
        },
        {
          "label": "40 North Ventures",
          "value": "40-north-ventures"
        },
        {
          "label": "Anchorage",
          "value": "anchorage"
        },
        {
          "label": "Bonfire Ventures",
          "value": "bonfire-ventures"
        },
        {
          "label": "Finality Capital Partners",
          "value": "finality-capital-partners"
        },
        {
          "label": "GFT Ventures",
          "value": "gft-ventures"
        },
        {
          "label": "JPK Capital",
          "value": "jpk-capital"
        },
        {
          "label": "Senator Investment Group",
          "value": "senator-investment-group"
        },
        {
          "label": "BKCM",
          "value": "bkcm"
        },
        {
          "label": "XDL Capital Group",
          "value": "xdl-capital-group"
        },
        {
          "label": "Spencer Noon",
          "value": "spencer-noon"
        },
        {
          "label": "Crowd Venture Capital",
          "value": "crowd-venture-capital"
        },
        {
          "label": "Jsquare",
          "value": "jsquare"
        },
        {
          "label": "Mask Network",
          "value": "mask-network"
        },
        {
          "label": "Blizzard Fund",
          "value": "blizzard-fund"
        },
        {
          "label": "Fernando Martinelli",
          "value": "fernando-martinelli"
        },
        {
          "label": "Future Money Group",
          "value": "future-money-group"
        },
        {
          "label": "Token Metrics Ventures",
          "value": "token-metrics-ventures"
        },
        {
          "label": "EV3",
          "value": "ev3"
        },
        {
          "label": "Waterdrip Capital",
          "value": "waterdrip-capital"
        },
        {
          "label": "Aaron Batalion",
          "value": "aaron-batalion"
        },
        {
          "label": "Alexander Taub",
          "value": "alexander-taub"
        },
        {
          "label": "Alexis Ohanian",
          "value": "alexis-ohanian"
        },
        {
          "label": "Alison Grigonis",
          "value": "alison-grigonis"
        },
        {
          "label": "Atelier Ventures",
          "value": "atelier-ventures"
        },
        {
          "label": "Austin Rief",
          "value": "austin-rief"
        },
        {
          "label": "Betaworks",
          "value": "betaworks"
        },
        {
          "label": "Josh Fraser",
          "value": "josh-fraser"
        },
        {
          "label": "Offline Ventures",
          "value": "offline-ventures"
        },
        {
          "label": "Baillie Gifford",
          "value": "baillie-gifford"
        },
        {
          "label": "DG Lab",
          "value": "dg-lab"
        },
        {
          "label": "AME Cloud Ventures",
          "value": "ame-cloud-ventures"
        },
        {
          "label": "Danny Hillis",
          "value": "danny-hillis"
        },
        {
          "label": "Embrase",
          "value": "embrase"
        },
        {
          "label": "Flight Ventures",
          "value": "flight-ventures"
        },
        {
          "label": "Cadenza Ventures",
          "value": "cadenza-ventures"
        },
        {
          "label": "Champion Hill Ventures",
          "value": "champion-hill-ventures"
        },
        {
          "label": "DWF Labs",
          "value": "dwf-labs"
        },
        {
          "label": "dlab",
          "value": "dlab"
        },
        {
          "label": "CMS",
          "value": "cms"
        },
        {
          "label": "Exor",
          "value": "exor"
        },
        {
          "label": "Bo Shen",
          "value": "bo-shen"
        },
        {
          "label": "Engage",
          "value": "engage"
        },
        {
          "label": "Blockchain Founders Fund",
          "value": "blockchain-founders-fund"
        },
        {
          "label": "Emurgo Ventures",
          "value": "emurgo-ventures"
        },
        {
          "label": "Sora Ventures",
          "value": "sora-ventures"
        },
        {
          "label": "Parachain Ventures",
          "value": "parachain-ventures"
        },
        {
          "label": "Next Web Capital",
          "value": "next-web-capital"
        },
        {
          "label": "Tim Beiko",
          "value": "tim-beiko"
        },
        {
          "label": "Vinny Lingham",
          "value": "vinny-lingham"
        },
        {
          "label": "Alexis Berthoud",
          "value": "alexis-berthoud"
        },
        {
          "label": "K3 Ventures",
          "value": "k3-ventures"
        },
        {
          "label": "Krypital Group",
          "value": "krypital-group"
        },
        {
          "label": "UOB Venture Management",
          "value": "uob-venture-management"
        },
        {
          "label": "Boris Wertz",
          "value": "boris-wertz"
        },
        {
          "label": "Credo Ventures",
          "value": "credo-ventures"
        },
        {
          "label": "Initial Capital",
          "value": "initial-capital"
        },
        {
          "label": "Nyca Partners",
          "value": "nyca-partners"
        },
        {
          "label": "Bessemer Venture Partners",
          "value": "bessemer-venture-partners"
        },
        {
          "label": "American Express Ventures",
          "value": "american-express-ventures"
        },
        {
          "label": "DRW Venture Capital",
          "value": "drw-venture-capital"
        },
        {
          "label": "Credibly Neutral",
          "value": "credibly-neutral"
        },
        {
          "label": "Robert Miller",
          "value": "robert-miller"
        },
        {
          "label": "Ludwig Petterson",
          "value": "ludwig-petterson"
        },
        {
          "label": " Guillaume Poncin",
          "value": "guillaume-poncin"
        },
        {
          "label": "Joshua Ma",
          "value": "joshua-ma"
        },
        {
          "label": " Lakshman Sankar",
          "value": "lakshman-sankar"
        },
        {
          "label": "ConsenSys Ventures",
          "value": "consensys-ventures"
        },
        {
          "label": "Ben Davenport",
          "value": "ben-davenport"
        },
        {
          "label": "4490 Ventures",
          "value": "4490-ventures"
        },
        {
          "label": "Good Growth Capital",
          "value": "good-growth-capital"
        },
        {
          "label": "Ray Rothrock",
          "value": "ray-rothrock"
        },
        {
          "label": "Rise of the Rest seed fund",
          "value": "rise-of-the-rest-seed-fund"
        },
        {
          "label": "Kyros Ventures",
          "value": "kyros-ventures"
        },
        {
          "label": "PreAngel",
          "value": "preangel"
        },
        {
          "label": "Spaceship DAO",
          "value": "spaceship-dao"
        },
        {
          "label": "Backed VC",
          "value": "backed-vc"
        },
        {
          "label": "Coinhako",
          "value": "coinhako"
        },
        {
          "label": "Portofino",
          "value": "portofino"
        },
        {
          "label": "0x Ventures",
          "value": "0x-ventures"
        },
        {
          "label": "mgnr.io",
          "value": "mgnrio"
        },
        {
          "label": "Solana",
          "value": "solana"
        },
        {
          "label": "The General Partnership",
          "value": "the-general-partnership"
        },
        {
          "label": "Flourish Ventures",
          "value": "flourish-ventures"
        },
        {
          "label": "AlphaGrep",
          "value": "alphagrep"
        },
        {
          "label": "Anchorage Digital",
          "value": "anchorage-digital"
        },
        {
          "label": "Chainanalysis",
          "value": "chainanalysis"
        },
        {
          "label": "Quicknode",
          "value": "quicknode"
        },
        {
          "label": "Merkle Science",
          "value": "merkle-science"
        },
        {
          "label": "Mistral Venture Partners",
          "value": "mistral-venture-partners"
        },
        {
          "label": "Anwar Jeffrey",
          "value": "anwar-jeffrey"
        },
        {
          "label": "David Au-Yeung",
          "value": "david-au-yeung"
        },
        {
          "label": "Kal Vepuri",
          "value": "kal-vepuri"
        },
        {
          "label": "Robinson Burkey",
          "value": "robinson-burkey"
        },
        {
          "label": "Luca Netz",
          "value": "luca-netz"
        },
        {
          "label": "Saquon Barkley",
          "value": "saquon-barkley"
        },
        {
          "label": "inversebrah",
          "value": "inversebrah"
        },
        {
          "label": "Coral DeFi",
          "value": "coral-defi"
        },
        {
          "label": "Spearhead",
          "value": "spearhead"
        },
        {
          "label": "Stepan Simkin",
          "value": "stepan-simkin"
        },
        {
          "label": "Bollinger Investment Group",
          "value": "bollinger-investment-group"
        },
        {
          "label": "Asymmetric",
          "value": "asymmetric"
        },
        {
          "label": "Cosmostation",
          "value": "cosmostation"
        },
        {
          "label": "Citadel.one",
          "value": "citadelone"
        },
        {
          "label": "Forbole",
          "value": "forbole"
        },
        {
          "label": "Martin Varsavsky",
          "value": "martin-varsavsky"
        },
        {
          "label": "Harsh Rajat",
          "value": "harsh-rajat"
        },
        {
          "label": "GFS Ventures",
          "value": "gfs-ventures"
        },
        {
          "label": "Mayfield",
          "value": "mayfield"
        },
        {
          "label": "SBI Group",
          "value": "sbi-group"
        },
        {
          "label": "Maverick Silicon",
          "value": "maverick-silicon"
        },
        {
          "label": "PremjiInvest",
          "value": "premjiinvest"
        },
        {
          "label": "Samsung Catalyst Fund",
          "value": "samsung-catalyst-fund"
        },
        {
          "label": "Mara Holdings",
          "value": "mara-holdings"
        },
        {
          "label": "GSBackers",
          "value": "gsbackers"
        },
        {
          "label": "Celesta Capital",
          "value": "celesta-capital"
        },
        {
          "label": "Marathon Digital Holdings",
          "value": "marathon-digital-holdings"
        },
        {
          "label": "Cota Capital",
          "value": "cota-capital"
        },
        {
          "label": "Stanford University",
          "value": "stanford-university"
        },
        {
          "label": "Play Ventures",
          "value": "play-ventures"
        },
        {
          "label": "La Poste Ventures",
          "value": "la-poste-ventures"
        },
        {
          "label": "O1ex",
          "value": "o1ex"
        },
        {
          "label": "Hanaco Ventures",
          "value": "hanaco-ventures"
        },
        {
          "label": "Jerusalem Venture Partners",
          "value": "jerusalem-venture-partners"
        },
        {
          "label": "KCK Capital",
          "value": "kck-capital"
        },
        {
          "label": "Blue Run Ventures",
          "value": "blue-run-ventures"
        },
        {
          "label": "Enabling Future",
          "value": "enabling-future"
        },
        {
          "label": "kaonavi",
          "value": "kaonavi"
        },
        {
          "label": "XTech Ventures",
          "value": "xtech-ventures"
        },
        {
          "label": "Kesha Ventures",
          "value": "kesha-ventures"
        },
        {
          "label": "Zac Prince",
          "value": "zac-prince"
        },
        {
          "label": "Ulu Ventures",
          "value": "ulu-ventures"
        },
        {
          "label": "Communitas Asset Management",
          "value": "communitas-asset-management"
        },
        {
          "label": "Highland Capital Partners",
          "value": "highland-capital-partners"
        },
        {
          "label": "Stacks",
          "value": "stacks"
        },
        {
          "label": "Grupo Salinas",
          "value": "grupo-salinas"
        },
        {
          "label": "Plan B Fund",
          "value": "plan-b-fund"
        },
        {
          "label": "NxGen",
          "value": "nxgen"
        },
        {
          "label": "Samsung Next Ventures",
          "value": "samsung-next-ventures"
        },
        {
          "label": "UVM Signum Blockchain Fund",
          "value": "uvm-signum-blockchain-fund"
        },
        {
          "label": "Sony Network",
          "value": "sony-network"
        },
        {
          "label": "Sony",
          "value": "sony"
        },
        {
          "label": "Big Brain Ventures",
          "value": "big-brain-ventures"
        },
        {
          "label": "Monke Ventures",
          "value": "monke-ventures"
        },
        {
          "label": "Liu Jang",
          "value": "liu-jang"
        },
        {
          "label": "Sarah Guo",
          "value": "sarah-guo"
        },
        {
          "label": "ACME Capital",
          "value": "acme-capital"
        },
        {
          "label": "Point Nine",
          "value": "point-nine"
        },
        {
          "label": "Eight Roads",
          "value": "eight-roads"
        },
        {
          "label": "Charlie Lee",
          "value": "charlie-lee"
        },
        {
          "label": "Felix Bengtsson",
          "value": "felix-bengtsson"
        },
        {
          "label": "Tether",
          "value": "tether"
        },
        {
          "label": "Kartik Talwar",
          "value": "kartik-talwar"
        },
        {
          "label": "Cypherpunk Holdings Inc",
          "value": "cypherpunk-holdings-inc"
        },
        {
          "label": "imec.istart",
          "value": "imecistart"
        },
        {
          "label": "ABCDE",
          "value": "abcde"
        },
        {
          "label": "BECO Capital",
          "value": "beco-capital"
        },
        {
          "label": "Darrow Holdings",
          "value": "darrow-holdings"
        },
        {
          "label": "500 StartUps APAC and US",
          "value": "500-startups-apac-and-us"
        },
        {
          "label": "Aspen Digital",
          "value": "aspen-digital"
        },
        {
          "label": "Lucy Gazmararian",
          "value": "lucy-gazmararian"
        },
        {
          "label": "Immersion Partners",
          "value": "immersion-partners"
        },
        {
          "label": "Sabrina Hahn",
          "value": "sabrina-hahn"
        },
        {
          "label": "AltLayer",
          "value": "altlayer"
        },
        {
          "label": "IN Venture",
          "value": "in-venture"
        },
        {
          "label": "Tenaya Capital",
          "value": "tenaya-capital"
        },
        {
          "label": "Cyberstarts",
          "value": "cyberstarts"
        },
        {
          "label": "Cedar Hill Capital",
          "value": "cedar-hill-capital"
        },
        {
          "label": "Stripes",
          "value": "stripes"
        },
        {
          "label": "SVB Capital",
          "value": "svb-capital"
        },
        {
          "label": "Supernode Global",
          "value": "supernode-global"
        },
        {
          "label": "Active Partners",
          "value": "active-partners"
        },
        {
          "label": "Founders Factory",
          "value": "founders-factory"
        },
        {
          "label": "Immutable X",
          "value": "immutable-x"
        },
        {
          "label": "Nalu Capital",
          "value": "nalu-capital"
        },
        {
          "label": "Marc Benioff",
          "value": "marc-benioff"
        },
        {
          "label": "Parallel Studio",
          "value": "parallel-studio"
        },
        {
          "label": "Investmeows",
          "value": "investmeows"
        },
        {
          "label": "Acet Capital",
          "value": "acet-capital"
        },
        {
          "label": "Paul Desmerais",
          "value": "paul-desmerais"
        },
        {
          "label": "Chop Chop",
          "value": "chop-chop"
        },
        {
          "label": "0xMaki",
          "value": "0xmaki"
        },
        {
          "label": "Mark Zeller",
          "value": "mark-zeller"
        },
        {
          "label": "280 Capital",
          "value": "280-capital"
        },
        {
          "label": "UTXO",
          "value": "utxo"
        },
        {
          "label": "Web3Port Foundation",
          "value": "web3port-foundation"
        },
        {
          "label": "Pivot Global",
          "value": "pivot-global"
        },
        {
          "label": "Quotient",
          "value": "quotient"
        },
        {
          "label": "Comma Ventures",
          "value": "comma-ventures"
        },
        {
          "label": "RPC Ventures",
          "value": "rpc-ventures"
        },
        {
          "label": "Dan Held",
          "value": "dan-held"
        },
        {
          "label": "Dan Mcardle",
          "value": "dan-mcardle"
        },
        {
          "label": "Dyma",
          "value": "dyma"
        },
        {
          "label": "Thanh Le",
          "value": "thanh-le"
        },
        {
          "label": "SCB Limited",
          "value": "scb-limited"
        },
        {
          "label": "Metalpha",
          "value": "metalpha"
        },
        {
          "label": "FalconX",
          "value": "falconx"
        },
        {
          "label": "tbv",
          "value": "tbv"
        },
        {
          "label": "Optic Capital",
          "value": "optic-capital"
        },
        {
          "label": "TPC",
          "value": "tpc"
        },
        {
          "label": "Cryptonite Capital",
          "value": "cryptonite-capital"
        },
        {
          "label": "A/V",
          "value": "av"
        },
        {
          "label": "Jets Capital Investment Fund",
          "value": "jets-capital-investment-fund"
        },
        {
          "label": "Cryptoverse Ventures",
          "value": "cryptoverse-ventures"
        },
        {
          "label": "Revelo Ventures",
          "value": "revelo-ventures"
        },
        {
          "label": " Token Metrics",
          "value": "token-metrics"
        },
        {
          "label": "Seed Club",
          "value": "seed-club"
        },
        {
          "label": "Eva Beylin",
          "value": "eva-beylin"
        },
        {
          "label": "Liam Horne",
          "value": "liam-horne"
        },
        {
          "label": "Flow Desk",
          "value": "flow-desk"
        },
        {
          "label": "BitFury Capital",
          "value": "bitfury-capital"
        },
        {
          "label": "Cyber Fund",
          "value": "cyber-fund"
        },
        {
          "label": "Stanford Builders Fund",
          "value": "stanford-builders-fund"
        },
        {
          "label": "Stanford Blockchain",
          "value": "stanford-blockchain"
        },
        {
          "label": "Orrick",
          "value": "orrick"
        },
        {
          "label": "Joe Lau",
          "value": "joe-lau"
        },
        {
          "label": "Legend Capital",
          "value": "legend-capital"
        },
        {
          "label": "Sway Ventures",
          "value": "sway-ventures"
        },
        {
          "label": "UP2398",
          "value": "up2398"
        },
        {
          "label": "Anil D. Aggarwal",
          "value": "anil-d-aggarwal"
        },
        {
          "label": "Bloomberg Beta",
          "value": "bloomberg-beta"
        },
        {
          "label": "Rubicon Venture Capital",
          "value": "rubicon-venture-capital"
        },
        {
          "label": "Stoic Capital",
          "value": "stoic-capital"
        },
        {
          "label": "The Fund",
          "value": "the-fund"
        },
        {
          "label": "Algorand Foundation",
          "value": "algorand-foundation"
        },
        {
          "label": " EMURGO Ventures",
          "value": "emurgo-ventures"
        },
        {
          "label": "Offchain Labs",
          "value": "offchain-labs"
        },
        {
          "label": "Geometry Research",
          "value": "geometry-research"
        },
        {
          "label": "StillMark",
          "value": "stillmark"
        },
        {
          "label": "John Pfeffer",
          "value": "john-pfeffer"
        },
        {
          "label": "Charles Cascarilla",
          "value": "charles-cascarilla"
        },
        {
          "label": "Emoote",
          "value": "emoote"
        },
        {
          "label": "Cameron McLain",
          "value": "cameron-mclain"
        },
        {
          "label": "Synchrony",
          "value": "synchrony"
        },
        {
          "label": "Kx Technology Fund ",
          "value": "kx-technology-fund"
        },
        {
          "label": "Marc Tillement",
          "value": "marc-tillement"
        },
        {
          "label": "TN Lee",
          "value": "tn-lee"
        },
        {
          "label": "Zano Sherwani",
          "value": "zano-sherwani"
        },
        {
          "label": "Time Research",
          "value": "time-research"
        },
        {
          "label": "Riverside Hedge",
          "value": "riverside-hedge"
        }
      ],
      "paramKey": "investors"
    },
    "communities": {
      "position": 3,
      "label": "Communities",
      "show": false,
      "googleAnalyticsEventName": "filter_joblist_communities",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "AA Mafia",
          "value": "AA Mafia"
        },
        {
          "label": "Privy Ecosystem",
          "value": "Privy Ecosystem"
        }
      ],
      "paramKey": "communities"
    },
    "ecosystems": {
      "position": 16,
      "label": "Ecosystems",
      "show": false,
      "googleAnalyticsEventName": "filter_joblist_ecosystems",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [],
      "paramKey": "ecosystems"
    },
    "organizations": {
      "position": 14,
      "label": "Organizations",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_organizations",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "Aptos Labs",
          "value": "aptos-labs"
        },
        {
          "label": "Ava Labs",
          "value": "ava-labs"
        },
        {
          "label": "Oasis Labs",
          "value": "oasis-labs"
        },
        {
          "label": "OP Labs",
          "value": "op-labs"
        },
        {
          "label": "Solana Labs",
          "value": "solana-labs"
        },
        {
          "label": "Cardano Foundation",
          "value": "cardano-foundation"
        },
        {
          "label": "Binance",
          "value": "binance"
        },
        {
          "label": "Uniswap Foundation",
          "value": "uniswap-foundation"
        },
        {
          "label": "Cronos Labs",
          "value": "cronos-labs"
        },
        {
          "label": "Gnosis",
          "value": "gnosis"
        },
        {
          "label": "Aurora Labs",
          "value": "aurora-labs"
        },
        {
          "label": "Ethereum Foundation",
          "value": "ethereum-foundation"
        },
        {
          "label": "Filecoin Foundation",
          "value": "filecoin-foundation"
        },
        {
          "label": "Fuel Labs",
          "value": "fuel-labs"
        },
        {
          "label": "Harmony",
          "value": "harmony"
        },
        {
          "label": "MultiversX",
          "value": "multiversx"
        },
        {
          "label": "Offchain Labs",
          "value": "offchain-labs"
        },
        {
          "label": "Algorand Foundation",
          "value": "algorand-foundation"
        },
        {
          "label": "Matter Labs",
          "value": "matter-labs"
        },
        {
          "label": "Celestia Labs",
          "value": "celestia-labs"
        },
        {
          "label": "Coinbase",
          "value": "coinbase"
        },
        {
          "label": "Alchemy",
          "value": "alchemy"
        },
        {
          "label": "Argent",
          "value": "argent"
        },
        {
          "label": "Chainalysis",
          "value": "chainalysis"
        },
        {
          "label": "Clearmatics",
          "value": "clearmatics"
        },
        {
          "label": "ConsenSys Software Inc.",
          "value": "consensys-software-inc"
        },
        {
          "label": "dFinity Foundation",
          "value": "dfinity-foundation"
        },
        {
          "label": "dYdX Trading Inc.",
          "value": "dydx-trading-inc"
        },
        {
          "label": "econetwork",
          "value": "econetwork"
        },
        {
          "label": "Energy Web Foundation",
          "value": "energy-web-foundation"
        },
        {
          "label": "Equilibrium",
          "value": "equilibrium"
        },
        {
          "label": "Forta",
          "value": "forta"
        },
        {
          "label": "Gala Games",
          "value": "gala-games"
        },
        {
          "label": "EigenLayer",
          "value": "eigenlayer"
        },
        {
          "label": "Euclid Lab",
          "value": "euclid-lab"
        },
        {
          "label": "Messari",
          "value": "messari"
        },
        {
          "label": "Mirror",
          "value": "mirror"
        },
        {
          "label": "Nansen",
          "value": "nansen"
        },
        {
          "label": "Nethermind",
          "value": "nethermind"
        },
        {
          "label": "Orderly Network",
          "value": "orderly-network"
        },
        {
          "label": "Parcl",
          "value": "parcl"
        },
        {
          "label": "Phantom Technologies Inc",
          "value": "phantom-technologies-inc"
        },
        {
          "label": "Reserve Protocol",
          "value": "reserve-protocol"
        },
        {
          "label": "Risczero",
          "value": "risczero"
        },
        {
          "label": "Shardeum Foundation",
          "value": "shardeum-foundation"
        },
        {
          "label": "Uniswap Labs",
          "value": "uniswap-labs"
        },
        {
          "label": "Worldcoin",
          "value": "worldcoin"
        },
        {
          "label": "Zora Labs",
          "value": "zora-labs"
        },
        {
          "label": "Avara",
          "value": "avara"
        },
        {
          "label": "Biconomy",
          "value": "biconomy"
        },
        {
          "label": "Centrifuge",
          "value": "centrifuge"
        },
        {
          "label": "CertiK",
          "value": "certik"
        },
        {
          "label": "clabs",
          "value": "clabs"
        },
        {
          "label": "CoinGecko",
          "value": "coingecko"
        },
        {
          "label": "Enso Finance",
          "value": "enso-finance"
        },
        {
          "label": "Espresso Systems",
          "value": "espresso-systems"
        },
        {
          "label": "ETHGlobal",
          "value": "ethglobal"
        },
        {
          "label": "Horizon",
          "value": "horizon"
        },
        {
          "label": "Abacus Works",
          "value": "abacus-works"
        },
        {
          "label": "Immutable",
          "value": "immutable"
        },
        {
          "label": "Injective Labs",
          "value": "injective-labs"
        },
        {
          "label": "Matters",
          "value": "matters"
        },
        {
          "label": "Newton Foundation",
          "value": "newton-foundation"
        },
        {
          "label": "DV Labs",
          "value": "dv-labs"
        },
        {
          "label": "Ondo Finance",
          "value": "ondo-finance"
        },
        {
          "label": "OpenSea",
          "value": "opensea"
        },
        {
          "label": "Risk Labs",
          "value": "risk-labs"
        },
        {
          "label": "sprucesystems",
          "value": "sprucesystems"
        },
        {
          "label": "volume-finance",
          "value": "volume-finance"
        },
        {
          "label": "Warbler Labs",
          "value": "warbler-labs"
        },
        {
          "label": "Artory",
          "value": "artory"
        },
        {
          "label": "Axelar",
          "value": "axelar"
        },
        {
          "label": "BreederDAO",
          "value": "breederdao"
        },
        {
          "label": "Gelato",
          "value": "gelato"
        },
        {
          "label": "Nillion",
          "value": "nillion"
        },
        {
          "label": "Futureverse",
          "value": "futureverse"
        },
        {
          "label": "ParaSwap",
          "value": "paraswap"
        },
        {
          "label": "prePO",
          "value": "prepo"
        },
        {
          "label": "stakefish",
          "value": "stakefish"
        },
        {
          "label": "WeatherXM",
          "value": "weatherxm"
        },
        {
          "label": "C3",
          "value": "c3"
        },
        {
          "label": "Spice AI",
          "value": "spice-ai"
        },
        {
          "label": "Immunefi",
          "value": "immunefi"
        },
        {
          "label": "Lit Protocol",
          "value": "lit-protocol"
        },
        {
          "label": "Space and Time",
          "value": "space-and-time"
        },
        {
          "label": "Blowfish",
          "value": "blowfish"
        },
        {
          "label": "Blackbird",
          "value": "blackbird"
        },
        {
          "label": "Tatum",
          "value": "tatum"
        },
        {
          "label": "Zerion",
          "value": "zerion"
        },
        {
          "label": "Notebook Labs",
          "value": "notebook-labs"
        },
        {
          "label": "WalletConnect",
          "value": "walletconnect"
        },
        {
          "label": "LayerZero",
          "value": "layerzero"
        },
        {
          "label": "Parity Technologies Ltd",
          "value": "parity-technologies-ltd"
        },
        {
          "label": "Snickerdoodle Labs",
          "value": "snickerdoodle-labs"
        },
        {
          "label": "Queueco",
          "value": "queueco"
        },
        {
          "label": "Gauntlet",
          "value": "gauntlet"
        },
        {
          "label": "OpenZeppelin",
          "value": "openzeppelin"
        },
        {
          "label": "Alkimiya",
          "value": "alkimiya"
        },
        {
          "label": "KG Financial Techologies",
          "value": "kg-financial-techologies"
        },
        {
          "label": "Ostium Labs",
          "value": "ostium-labs"
        },
        {
          "label": "Mantle",
          "value": "mantle"
        },
        {
          "label": "Ledger",
          "value": "ledger"
        },
        {
          "label": "Bitwise",
          "value": "bitwise"
        },
        {
          "label": "Kodex",
          "value": "kodex"
        },
        {
          "label": "Cere",
          "value": "cere"
        },
        {
          "label": "Otterspace",
          "value": "otterspace"
        },
        {
          "label": "Analog",
          "value": "analog"
        },
        {
          "label": "Berachain",
          "value": "berachain"
        },
        {
          "label": "RWA",
          "value": "rwa"
        },
        {
          "label": "Staking Rewards",
          "value": "staking-rewards"
        },
        {
          "label": "Nil;Foundation",
          "value": "nilfoundation"
        },
        {
          "label": "Resolv Labs Ltd",
          "value": "resolv-labs-ltd"
        },
        {
          "label": "Frax Finance",
          "value": "frax-finance"
        },
        {
          "label": "Privy",
          "value": "privy"
        },
        {
          "label": "Llama",
          "value": "llama"
        },
        {
          "label": "Skip",
          "value": "skip"
        },
        {
          "label": "Safe",
          "value": "safe"
        },
        {
          "label": "Eiger",
          "value": "eiger"
        },
        {
          "label": "Mina Foundation",
          "value": "mina-foundation"
        },
        {
          "label": "IG",
          "value": "ig"
        },
        {
          "label": "Blast",
          "value": "blast"
        },
        {
          "label": "Shadow",
          "value": "shadow"
        },
        {
          "label": "Gevulot",
          "value": "gevulot"
        },
        {
          "label": "Ellipsis Labs",
          "value": "ellipsis-labs"
        },
        {
          "label": "Mangrove",
          "value": "mangrove"
        },
        {
          "label": "Delphi Labs",
          "value": "delphi-labs"
        },
        {
          "label": "Morpho Labs",
          "value": "morpho-labs"
        },
        {
          "label": "Wonderland",
          "value": "wonderland"
        },
        {
          "label": "Wintermute",
          "value": "wintermute"
        },
        {
          "label": "Aleo",
          "value": "aleo"
        },
        {
          "label": "Seam Social",
          "value": "seam-social"
        },
        {
          "label": "Douro Labs",
          "value": "douro-labs"
        },
        {
          "label": "AminoChain",
          "value": "aminochain"
        },
        {
          "label": "LI.FI",
          "value": "lifi"
        },
        {
          "label": "Caddi",
          "value": "caddi"
        },
        {
          "label": "Rotki Solutions GmbH",
          "value": "rotki-solutions-gmbh"
        },
        {
          "label": "Icebreaker",
          "value": "icebreaker"
        },
        {
          "label": "Optimism Foundation",
          "value": "optimism-foundation"
        },
        {
          "label": "Find Satoshi Lab",
          "value": "find-satoshi-lab"
        },
        {
          "label": "Gora Network",
          "value": "gora-network"
        },
        {
          "label": "defi.app",
          "value": "defiapp"
        },
        {
          "label": "megaton.fi",
          "value": "megatonfi"
        },
        {
          "label": "Aptos Foundation",
          "value": "aptos-foundation"
        },
        {
          "label": "Foundation",
          "value": "foundation"
        },
        {
          "label": "Yellow Card",
          "value": "yellow-card"
        },
        {
          "label": "deBridge Finance",
          "value": "debridge-finance"
        },
        {
          "label": "Privacy & Scaling Explorations",
          "value": "privacy-and-scaling-explorations"
        },
        {
          "label": "High Fidelity",
          "value": "high-fidelity"
        },
        {
          "label": "Farcaster",
          "value": "farcaster"
        },
        {
          "label": "Penumbra",
          "value": "penumbra"
        },
        {
          "label": "Monetha",
          "value": "monetha"
        },
        {
          "label": "Tally",
          "value": "tally"
        },
        {
          "label": "Reservoir",
          "value": "reservoir"
        },
        {
          "label": "Thesis Inc.",
          "value": "thesis-inc"
        },
        {
          "label": "Mysterium Network",
          "value": "mysterium-network"
        },
        {
          "label": "Fluence Project",
          "value": "fluence-project"
        },
        {
          "label": "Commonwealth",
          "value": "commonwealth"
        },
        {
          "label": "Neon Foundation",
          "value": "neon-foundation"
        },
        {
          "label": "MATRYX",
          "value": "matryx"
        },
        {
          "label": "Flipside Crypto",
          "value": "flipside-crypto"
        },
        {
          "label": "harmony-one",
          "value": "harmony-one"
        },
        {
          "label": "Taurus SA",
          "value": "taurus-sa"
        },
        {
          "label": "Provenance",
          "value": "provenance"
        },
        {
          "label": "PancakeSwap",
          "value": "pancakeswap"
        },
        {
          "label": "Synthetix",
          "value": "synthetix"
        },
        {
          "label": "Thala Labs",
          "value": "thala-labs"
        },
        {
          "label": "thirdweb",
          "value": "thirdweb"
        },
        {
          "label": "HUMAN Protocol",
          "value": "human-protocol"
        },
        {
          "label": "IX Swap",
          "value": "ix-swap"
        },
        {
          "label": "Cryptopay Limited",
          "value": "cryptopay-limited"
        },
        {
          "label": "Couger, Inc.",
          "value": "couger-inc"
        },
        {
          "label": "Quantstamp",
          "value": "quantstamp"
        },
        {
          "label": "Datachain",
          "value": "datachain"
        },
        {
          "label": "StreamingFast",
          "value": "streamingfast"
        },
        {
          "label": "OtterSec",
          "value": "ottersec"
        },
        {
          "label": "Streamflow",
          "value": "streamflow"
        },
        {
          "label": "RMRK Team",
          "value": "rmrk-team"
        },
        {
          "label": "LimeChain",
          "value": "limechain"
        },
        {
          "label": "Dash",
          "value": "dash"
        },
        {
          "label": "Bolt Labs",
          "value": "bolt-labs"
        },
        {
          "label": "Figment",
          "value": "figment"
        },
        {
          "label": "Eluvio",
          "value": "eluvio"
        },
        {
          "label": "Transak",
          "value": "transak"
        },
        {
          "label": "Switchboard",
          "value": "switchboard"
        },
        {
          "label": "Dune",
          "value": "dune"
        },
        {
          "label": "Blockdaemon",
          "value": "blockdaemon"
        },
        {
          "label": "Certora",
          "value": "certora"
        },
        {
          "label": "QuickNode",
          "value": "quicknode"
        },
        {
          "label": "Flare Foundation",
          "value": "flare-foundation"
        },
        {
          "label": "Input Output",
          "value": "input-output"
        },
        {
          "label": "Ackee Blockchain",
          "value": "ackee-blockchain"
        },
        {
          "label": "Moralis",
          "value": "moralis"
        },
        {
          "label": "Constellation Labs",
          "value": "constellation-labs"
        },
        {
          "label": "MLabs",
          "value": "mlabs"
        },
        {
          "label": "Nomic Foundation",
          "value": "nomic-foundation"
        },
        {
          "label": "Agoric",
          "value": "agoric"
        },
        {
          "label": "Trailofbits.",
          "value": "trailofbits"
        },
        {
          "label": "Hiro Systems PBC",
          "value": "hiro-systems-pbc"
        },
        {
          "label": "Ethersphere",
          "value": "ethersphere"
        },
        {
          "label": "Astria",
          "value": "astria"
        },
        {
          "label": "CyberConnect",
          "value": "cyberconnect"
        },
        {
          "label": "Kadena",
          "value": "kadena"
        },
        {
          "label": "Dialect Labs",
          "value": "dialect-labs"
        },
        {
          "label": "Ripio",
          "value": "ripio"
        },
        {
          "label": "Perpetual Protocol",
          "value": "perpetual-protocol"
        },
        {
          "label": "PolySwarm",
          "value": "polyswarm"
        },
        {
          "label": "Soramitsu",
          "value": "soramitsu"
        },
        {
          "label": "Vancelian",
          "value": "vancelian"
        },
        {
          "label": "AlphaPoint",
          "value": "alphapoint"
        },
        {
          "label": "Stellar Development Foundation",
          "value": "stellar-development-foundation"
        },
        {
          "label": "Nexus Mutual",
          "value": "nexus-mutual"
        },
        {
          "label": "Web3 Foundation",
          "value": "web3-foundation"
        },
        {
          "label": "Cata Labs, Inc.",
          "value": "cata-labs-inc"
        },
        {
          "label": "Persistence One",
          "value": "persistence-one"
        },
        {
          "label": "Anchorage Digital",
          "value": "anchorage-digital"
        },
        {
          "label": "Anima",
          "value": "anima"
        },
        {
          "label": "Onramper",
          "value": "onramper"
        },
        {
          "label": "Auros",
          "value": "auros"
        },
        {
          "label": "BitPay",
          "value": "bitpay"
        },
        {
          "label": "Archimedes Finance",
          "value": "archimedes-finance"
        },
        {
          "label": "Backed Finance",
          "value": "backed-finance"
        },
        {
          "label": "CoinStats",
          "value": "coinstats"
        },
        {
          "label": "Cozy Finance",
          "value": "cozy-finance"
        },
        {
          "label": "Questbook",
          "value": "questbook"
        },
        {
          "label": "Pera Wallet",
          "value": "pera-wallet"
        },
        {
          "label": "fortmatic",
          "value": "fortmatic"
        },
        {
          "label": "Paloma",
          "value": "paloma"
        },
        {
          "label": "Bitfarms Ltd.",
          "value": "bitfarms-ltd"
        },
        {
          "label": "Mysten Labs",
          "value": "mysten-labs"
        },
        {
          "label": "Bitpowr",
          "value": "bitpowr"
        },
        {
          "label": "MachineFi Lab",
          "value": "machinefi-lab"
        },
        {
          "label": "XMTP",
          "value": "xmtp"
        },
        {
          "label": "Blockstream",
          "value": "blockstream"
        },
        {
          "label": "Blocto",
          "value": "blocto"
        },
        {
          "label": "RSS3",
          "value": "rss3"
        },
        {
          "label": "Braavos",
          "value": "braavos"
        },
        {
          "label": "01node",
          "value": "01node"
        },
        {
          "label": "Decentraland Foundation",
          "value": "decentraland-foundation"
        },
        {
          "label": "Aztec",
          "value": "aztec"
        },
        {
          "label": "ChainSecurity",
          "value": "chainsecurity"
        },
        {
          "label": "Deblock",
          "value": "deblock"
        },
        {
          "label": "Arbitrum Foundation",
          "value": "arbitrum-foundation"
        },
        {
          "label": "Avail",
          "value": "avail"
        },
        {
          "label": "XLabs",
          "value": "xlabs"
        },
        {
          "label": "Casa",
          "value": "casa"
        },
        {
          "label": "Coinradar",
          "value": "coinradar"
        },
        {
          "label": "Copper",
          "value": "copper"
        },
        {
          "label": "Connecting Food",
          "value": "connecting-food"
        },
        {
          "label": "Creatify",
          "value": "creatify"
        },
        {
          "label": "Cryptio",
          "value": "cryptio"
        },
        {
          "label": "D2X Group N.V.",
          "value": "d2x-group-nv"
        },
        {
          "label": "Eco",
          "value": "eco"
        },
        {
          "label": "FLock.io",
          "value": "flockio"
        },
        {
          "label": "Chainstack",
          "value": "chainstack"
        },
        {
          "label": "Freatic",
          "value": "freatic"
        },
        {
          "label": "Amberdata",
          "value": "amberdata"
        },
        {
          "label": "Grayscale",
          "value": "grayscale"
        },
        {
          "label": "GigaStar",
          "value": "gigastar"
        },
        {
          "label": "Hashflow",
          "value": "hashflow"
        },
        {
          "label": "Indicio",
          "value": "indicio"
        },
        {
          "label": "Impossible Finance",
          "value": "impossible-finance"
        },
        {
          "label": "InfStones",
          "value": "infstones"
        },
        {
          "label": "Irys",
          "value": "irys"
        },
        {
          "label": "InvestaX",
          "value": "investax"
        },
        {
          "label": "Human",
          "value": "human"
        },
        {
          "label": "Fire",
          "value": "fire"
        },
        {
          "label": "Tide Protocol",
          "value": "tide-protocol"
        },
        {
          "label": "Klink Finance",
          "value": "klink-finance"
        },
        {
          "label": "Magic Square",
          "value": "magic-square"
        },
        {
          "label": "Me Protocol",
          "value": "me-protocol"
        },
        {
          "label": "Kinetic",
          "value": "kinetic"
        },
        {
          "label": "Mercuryo",
          "value": "mercuryo"
        },
        {
          "label": "Mint Town",
          "value": "mint-town"
        },
        {
          "label": "Movement Labs",
          "value": "movement-labs"
        },
        {
          "label": "Prometheus Research Labs",
          "value": "prometheus-research-labs"
        },
        {
          "label": "MPCH",
          "value": "mpch"
        },
        {
          "label": "Northern Data Group",
          "value": "northern-data-group"
        },
        {
          "label": "Native",
          "value": "native"
        },
        {
          "label": "Noble",
          "value": "noble"
        },
        {
          "label": "NUMEUS",
          "value": "numeus"
        },
        {
          "label": "Springworks",
          "value": "springworks"
        },
        {
          "label": "Notabene",
          "value": "notabene"
        },
        {
          "label": "Omni Network",
          "value": "omni-network"
        },
        {
          "label": "p0xeidon labs",
          "value": "p0xeidon-labs"
        },
        {
          "label": "Openfabric AI",
          "value": "openfabric-ai"
        },
        {
          "label": "Pixel Vault",
          "value": "pixel-vault"
        },
        {
          "label": "Blocknative",
          "value": "blocknative"
        },
        {
          "label": "Plutus",
          "value": "plutus"
        },
        {
          "label": "Polybase Labs",
          "value": "polybase-labs"
        },
        {
          "label": "Dymension",
          "value": "dymension"
        },
        {
          "label": "Pontem Network",
          "value": "pontem-network"
        },
        {
          "label": "Relai",
          "value": "relai"
        },
        {
          "label": "Renegade",
          "value": "renegade"
        },
        {
          "label": "Bluejay",
          "value": "bluejay"
        },
        {
          "label": "OVER",
          "value": "over"
        },
        {
          "label": "Securitize LLC",
          "value": "securitize-llc"
        },
        {
          "label": "Shakepay",
          "value": "shakepay"
        },
        {
          "label": "Sindri",
          "value": "sindri"
        },
        {
          "label": "Rarible Inc.",
          "value": "rarible-inc"
        },
        {
          "label": "Subspace Network",
          "value": "subspace-network"
        },
        {
          "label": "Terra",
          "value": "terra"
        },
        {
          "label": "GAMEE",
          "value": "gamee"
        },
        {
          "label": "Coinranking",
          "value": "coinranking"
        },
        {
          "label": "Trustblock",
          "value": "trustblock"
        },
        {
          "label": "Waterfall",
          "value": "waterfall"
        },
        {
          "label": "FalconX",
          "value": "falconx"
        },
        {
          "label": "Republic",
          "value": "republic"
        },
        {
          "label": "nChain",
          "value": "nchain"
        },
        {
          "label": "Checkmate",
          "value": "checkmate"
        },
        {
          "label": "Blockworks",
          "value": "blockworks"
        },
        {
          "label": "Conduit",
          "value": "conduit"
        },
        {
          "label": "Status",
          "value": "status"
        },
        {
          "label": "Zama",
          "value": "zama"
        },
        {
          "label": "Zero Hash LLC",
          "value": "zero-hash-llc"
        },
        {
          "label": "Fluree",
          "value": "fluree"
        },
        {
          "label": "ZetaChain",
          "value": "zetachain"
        },
        {
          "label": "XREX",
          "value": "xrex"
        },
        {
          "label": "Vendia",
          "value": "vendia"
        },
        {
          "label": "Syndica",
          "value": "syndica"
        },
        {
          "label": "Staging Labs",
          "value": "staging-labs"
        },
        {
          "label": "SpruceID",
          "value": "spruceid"
        },
        {
          "label": "Sound.xyz",
          "value": "soundxyz"
        },
        {
          "label": "Sky Mavis",
          "value": "sky-mavis"
        },
        {
          "label": "Sei Network",
          "value": "sei-network"
        },
        {
          "label": "Saga",
          "value": "saga"
        },
        {
          "label": "S1SEVEN",
          "value": "s1seven"
        },
        {
          "label": "Sardine",
          "value": "sardine"
        },
        {
          "label": "ResearchHub",
          "value": "researchhub"
        },
        {
          "label": "Puma",
          "value": "puma"
        },
        {
          "label": "Polymer",
          "value": "polymer"
        },
        {
          "label": "Polynomial Protocol",
          "value": "polynomial-protocol"
        },
        {
          "label": "Pop Social",
          "value": "pop-social"
        },
        {
          "label": "Paradigm",
          "value": "paradigm"
        },
        {
          "label": "O(1) Labs",
          "value": "o1-labs"
        },
        {
          "label": "One Click Crypto",
          "value": "one-click-crypto"
        },
        {
          "label": "Monad",
          "value": "monad"
        },
        {
          "label": "Meld Universal Inc.",
          "value": "meld-universal-inc"
        },
        {
          "label": "Marathon Digital Holdings",
          "value": "marathon-digital-holdings"
        },
        {
          "label": "LUKSO",
          "value": "lukso"
        },
        {
          "label": "Layer3",
          "value": "layer3"
        },
        {
          "label": "Headquarters",
          "value": "headquarters"
        },
        {
          "label": "Helius",
          "value": "helius"
        },
        {
          "label": "GodmodeHQ",
          "value": "godmodehq"
        },
        {
          "label": "Floki",
          "value": "floki"
        },
        {
          "label": "Filancore GmbH",
          "value": "filancore-gmbh"
        },
        {
          "label": "FANtium",
          "value": "fantium"
        },
        {
          "label": "Ethena",
          "value": "ethena"
        },
        {
          "label": "Earn Alliance",
          "value": "earn-alliance"
        },
        {
          "label": "Diamante Blockchain",
          "value": "diamante-blockchain"
        },
        {
          "label": "Dexify",
          "value": "dexify"
        },
        {
          "label": "Dfns",
          "value": "dfns"
        },
        {
          "label": "Daylight Studios, Inc.",
          "value": "daylight-studios-inc"
        },
        {
          "label": "Perun",
          "value": "perun"
        },
        {
          "label": "textile.io",
          "value": "textileio"
        },
        {
          "label": "Madfish",
          "value": "madfish"
        },
        {
          "label": "IQ.wiki",
          "value": "iqwiki"
        },
        {
          "label": "Taiko",
          "value": "taiko"
        },
        {
          "label": "Neutron",
          "value": "neutron"
        },
        {
          "label": "Open Earth Foundation",
          "value": "open-earth-foundation"
        },
        {
          "label": "Noir",
          "value": "noir"
        },
        {
          "label": "SwissBorg",
          "value": "swissborg"
        },
        {
          "label": "Windranger",
          "value": "windranger"
        },
        {
          "label": "NEAR Foundation",
          "value": "near-foundation"
        },
        {
          "label": "L2BEAT",
          "value": "l2beat"
        },
        {
          "label": "StableUnit DAO",
          "value": "stableunit-dao"
        },
        {
          "label": "Seedify",
          "value": "seedify"
        },
        {
          "label": "Distributed Crafts",
          "value": "distributed-crafts"
        },
        {
          "label": "DKODA Labs",
          "value": "dkoda-labs"
        },
        {
          "label": "Teritori",
          "value": "teritori"
        },
        {
          "label": "OP Games",
          "value": "op-games"
        },
        {
          "label": "ECAD Labs Inc.",
          "value": "ecad-labs-inc"
        },
        {
          "label": "Zondax",
          "value": "zondax"
        },
        {
          "label": "HashEx",
          "value": "hashex"
        },
        {
          "label": "Flow",
          "value": "flow"
        },
        {
          "label": "Ajuna Network",
          "value": "ajuna-network"
        },
        {
          "label": "Pendle",
          "value": "pendle"
        },
        {
          "label": "BitDegree",
          "value": "bitdegree"
        },
        {
          "label": "SCRIB3",
          "value": "scrib3"
        },
        {
          "label": "Peanut Protocol",
          "value": "peanut-protocol"
        },
        {
          "label": "AOTO COIN",
          "value": "aoto-coin"
        },
        {
          "label": "Arkham Intelligence",
          "value": "arkham-intelligence"
        },
        {
          "label": "Animoca Brands",
          "value": "animoca-brands"
        },
        {
          "label": "3-shake Inc.",
          "value": "3-shake-inc"
        },
        {
          "label": "Balance",
          "value": "balance"
        },
        {
          "label": "AnChain.AI",
          "value": "anchainai"
        },
        {
          "label": "Neon EVM",
          "value": "neon-evm"
        },
        {
          "label": "Wirex",
          "value": "wirex"
        },
        {
          "label": "Argus Labs",
          "value": "argus-labs"
        },
        {
          "label": "Auradine",
          "value": "auradine"
        },
        {
          "label": "Bipa",
          "value": "bipa"
        },
        {
          "label": "BTSE",
          "value": "btse"
        },
        {
          "label": "Cofinex",
          "value": "cofinex"
        },
        {
          "label": "IOTA Foundation",
          "value": "iota-foundation"
        },
        {
          "label": "Hacken",
          "value": "hacken"
        },
        {
          "label": "Blockpit",
          "value": "blockpit"
        },
        {
          "label": "bloXroute Labs",
          "value": "bloxroute-labs"
        },
        {
          "label": "Bluefin",
          "value": "bluefin"
        },
        {
          "label": "Brighty app",
          "value": "brighty-app"
        },
        {
          "label": "Carbonable",
          "value": "carbonable"
        },
        {
          "label": "Cashaa",
          "value": "cashaa"
        },
        {
          "label": "Chain Reaction",
          "value": "chain-reaction"
        },
        {
          "label": "ChainPatrol",
          "value": "chainpatrol"
        },
        {
          "label": "Change",
          "value": "change"
        },
        {
          "label": "DeFiner",
          "value": "definer"
        },
        {
          "label": "CleanSpark",
          "value": "cleanspark"
        },
        {
          "label": "CloudTech Group",
          "value": "cloudtech-group"
        },
        {
          "label": "Communitio",
          "value": "communitio"
        },
        {
          "label": "Compass Mining",
          "value": "compass-mining"
        },
        {
          "label": "WOO",
          "value": "woo"
        },
        {
          "label": "Coin Metrics",
          "value": "coin-metrics"
        },
        {
          "label": "CoinsPaid",
          "value": "coinspaid"
        },
        {
          "label": "CoinTracker",
          "value": "cointracker"
        },
        {
          "label": "Common Computer Inc.",
          "value": "common-computer-inc"
        },
        {
          "label": "Cryptowalkers",
          "value": "cryptowalkers"
        },
        {
          "label": "CV VC",
          "value": "cv-vc"
        },
        {
          "label": "Crystal Blockchain B.V.",
          "value": "crystal-blockchain-bv"
        },
        {
          "label": "dFarm, Inc.",
          "value": "dfarm-inc"
        },
        {
          "label": "Galoy",
          "value": "galoy"
        },
        {
          "label": "Earlyworks Co., Ltd.",
          "value": "earlyworks-co-ltd"
        },
        {
          "label": "Dynasty Studios",
          "value": "dynasty-studios"
        },
        {
          "label": "Everyrealm",
          "value": "everyrealm"
        },
        {
          "label": "Ex Populus",
          "value": "ex-populus"
        },
        {
          "label": "Flowdesk",
          "value": "flowdesk"
        },
        {
          "label": "Genies",
          "value": "genies"
        },
        {
          "label": "GoSats",
          "value": "gosats"
        },
        {
          "label": "GEODNET",
          "value": "geodnet"
        },
        {
          "label": "Horizen Labs",
          "value": "horizen-labs"
        },
        {
          "label": "JAN3",
          "value": "jan3"
        },
        {
          "label": "Swaps.io ",
          "value": "swapsio"
        },
        {
          "label": "Kigo",
          "value": "kigo"
        },
        {
          "label": "Luxor Technology",
          "value": "luxor-technology"
        },
        {
          "label": "Joepegs",
          "value": "joepegs"
        },
        {
          "label": "Napier Finance",
          "value": "napier-finance"
        },
        {
          "label": "OpenCover",
          "value": "opencover"
        },
        {
          "label": "Satoshi Energy Corp.",
          "value": "satoshi-energy-corp"
        },
        {
          "label": "Scroll",
          "value": "scroll"
        },
        {
          "label": "StarkWare",
          "value": "starkware"
        },
        {
          "label": "Snarkify",
          "value": "snarkify"
        },
        {
          "label": "Sunscreen",
          "value": "sunscreen"
        },
        {
          "label": "Startale Labs",
          "value": "startale-labs"
        },
        {
          "label": "Santiment",
          "value": "santiment"
        },
        {
          "label": "TipLink",
          "value": "tiplink"
        },
        {
          "label": "Syndr",
          "value": "syndr"
        },
        {
          "label": "The Open Network Foundation",
          "value": "the-open-network-foundation"
        },
        {
          "label": "Unchained Capital, Inc.",
          "value": "unchained-capital-inc"
        },
        {
          "label": "Addressable",
          "value": "addressable"
        },
        {
          "label": "Kakarot Labs",
          "value": "kakarot-labs"
        },
        {
          "label": "AltLayer",
          "value": "altlayer"
        },
        {
          "label": "SatoshiLabs",
          "value": "satoshilabs"
        },
        {
          "label": "Kaiko",
          "value": "kaiko"
        },
        {
          "label": "Bitrefill",
          "value": "bitrefill"
        },
        {
          "label": "Shardeum",
          "value": "shardeum"
        },
        {
          "label": "Rhinestone",
          "value": "rhinestone"
        },
        {
          "label": "Blockaid LTD",
          "value": "blockaid-ltd"
        },
        {
          "label": "Celer Network",
          "value": "celer-network"
        },
        {
          "label": "Zenus Bank",
          "value": "zenus-bank"
        },
        {
          "label": "Navigator",
          "value": "navigator"
        },
        {
          "label": "VeeFriends",
          "value": "veefriends"
        },
        {
          "label": "NGRAVE",
          "value": "ngrave"
        },
        {
          "label": "Merkle Science",
          "value": "merkle-science"
        },
        {
          "label": "Lagrange Labs Inc.",
          "value": "lagrange-labs-inc"
        },
        {
          "label": "Halliday",
          "value": "halliday"
        },
        {
          "label": "HaHa",
          "value": "haha"
        },
        {
          "label": "GK8",
          "value": "gk8"
        },
        {
          "label": "Fireblocks",
          "value": "fireblocks"
        },
        {
          "label": "Eterlast",
          "value": "eterlast"
        },
        {
          "label": "DLC.Link, Inc.",
          "value": "dlclink-inc"
        },
        {
          "label": "Oraichain",
          "value": "oraichain"
        },
        {
          "label": "Blockscout",
          "value": "blockscout"
        },
        {
          "label": "Relay",
          "value": "relay"
        },
        {
          "label": "Nibiru Chain",
          "value": "nibiru-chain"
        },
        {
          "label": "General Magic",
          "value": "general-magic"
        },
        {
          "label": "Polymarket",
          "value": "polymarket"
        },
        {
          "label": "Overclock Labs",
          "value": "overclock-labs"
        },
        {
          "label": "Arrakis Finance",
          "value": "arrakis-finance"
        },
        {
          "label": "Unlock Labs",
          "value": "unlock-labs"
        },
        {
          "label": "De.Fi",
          "value": "defi"
        },
        {
          "label": "Octav",
          "value": "octav"
        },
        {
          "label": "CELL Studio",
          "value": "cell-studio"
        },
        {
          "label": "Bitlayer",
          "value": "bitlayer"
        },
        {
          "label": "Legitimate, Inc.",
          "value": "legitimate-inc"
        },
        {
          "label": "Agora",
          "value": "agora"
        },
        {
          "label": "Right Curve Research",
          "value": "right-curve-research"
        },
        {
          "label": "Phylax",
          "value": "phylax"
        },
        {
          "label": "Pluto",
          "value": "pluto"
        },
        {
          "label": "Radarblock",
          "value": "radarblock"
        },
        {
          "label": "Chainflip Labs GmbH",
          "value": "chainflip-labs-gmbh"
        },
        {
          "label": "Rage Trade",
          "value": "rage-trade"
        },
        {
          "label": "Astrona",
          "value": "astrona"
        },
        {
          "label": "1inch",
          "value": "1inch"
        },
        {
          "label": "Grass",
          "value": "grass"
        },
        {
          "label": "Tonk",
          "value": "tonk"
        },
        {
          "label": "Hyperbolic",
          "value": "hyperbolic"
        },
        {
          "label": "Magpie Protocol",
          "value": "magpie-protocol"
        },
        {
          "label": "TokenLogic",
          "value": "tokenlogic"
        },
        {
          "label": "Turbofish",
          "value": "turbofish"
        },
        {
          "label": "Chaos Labs",
          "value": "chaos-labs"
        },
        {
          "label": "Spire Labs",
          "value": "spire-labs"
        },
        {
          "label": "Exponent",
          "value": "exponent"
        },
        {
          "label": "Synergy Labs",
          "value": "synergy-labs"
        },
        {
          "label": "dev.fun",
          "value": "devfun"
        },
        {
          "label": "Predicate",
          "value": "predicate"
        },
        {
          "label": "GSR Markets",
          "value": "gsr-markets"
        },
        {
          "label": "Synnax",
          "value": "synnax"
        },
        {
          "label": "KYEX Labs",
          "value": "kyex-labs"
        },
        {
          "label": "Seamless Protocol",
          "value": "seamless-protocol"
        },
        {
          "label": "Decasonic",
          "value": "decasonic"
        },
        {
          "label": "Nova Labs",
          "value": "nova-labs"
        },
        {
          "label": "Chainbound",
          "value": "chainbound"
        },
        {
          "label": "YeagerAI",
          "value": "yeagerai"
        },
        {
          "label": "0G Labs",
          "value": "0g-labs"
        },
        {
          "label": "Toku",
          "value": "toku"
        },
        {
          "label": "Hub",
          "value": "hub"
        },
        {
          "label": "The Block",
          "value": "the-block"
        },
        {
          "label": "Spectarium Games",
          "value": "spectarium-games"
        },
        {
          "label": "Fabric Cryptography",
          "value": "fabric-cryptography"
        },
        {
          "label": "Everclear",
          "value": "everclear"
        },
        {
          "label": "Concrete",
          "value": "concrete"
        },
        {
          "label": "Carry1st",
          "value": "carry1st"
        },
        {
          "label": "ARPA",
          "value": "arpa"
        },
        {
          "label": "Alpen Labs",
          "value": "alpen-labs"
        },
        {
          "label": "Polychain",
          "value": "polychain"
        },
        {
          "label": "Helix",
          "value": "helix"
        },
        {
          "label": "Alluvial",
          "value": "alluvial"
        },
        {
          "label": "Serotonin",
          "value": "serotonin"
        },
        {
          "label": "TACo",
          "value": "taco"
        },
        {
          "label": "Baton Corporation",
          "value": "baton-corporation"
        },
        {
          "label": "Definitive",
          "value": "definitive"
        },
        {
          "label": "Magic Labs",
          "value": "magic-labs"
        },
        {
          "label": "cyber•Fund",
          "value": "cyberfund"
        },
        {
          "label": "vlayer",
          "value": "vlayer"
        },
        {
          "label": "Hashgraph",
          "value": "hashgraph"
        },
        {
          "label": "Heliax",
          "value": "heliax"
        },
        {
          "label": "Enjoyoors",
          "value": "enjoyoors"
        },
        {
          "label": "Moonshot",
          "value": "moonshot"
        },
        {
          "label": "1delta Labs",
          "value": "1delta-labs"
        },
        {
          "label": "Octane",
          "value": "octane"
        },
        {
          "label": "Trojan",
          "value": "trojan"
        },
        {
          "label": "Legend Labs, Inc.",
          "value": "legend-labs-inc"
        },
        {
          "label": "Raiku",
          "value": "raiku"
        },
        {
          "label": "aPriori",
          "value": "apriori"
        },
        {
          "label": "Nascent",
          "value": "nascent"
        },
        {
          "label": "Oasis",
          "value": "oasis"
        },
        {
          "label": "SynFutures",
          "value": "synfutures"
        },
        {
          "label": "Arbius",
          "value": "arbius"
        }
      ],
      "paramKey": "organizations"
    },
    "chains": {
      "position": 13,
      "label": "Chains",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_chains",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "XDC",
          "value": "xdc"
        },
        {
          "label": "Near",
          "value": "near"
        },
        {
          "label": "Aptos",
          "value": "aptos"
        },
        {
          "label": "Avalanche",
          "value": "avalanche"
        },
        {
          "label": "Ethereum",
          "value": "ethereum"
        },
        {
          "label": "Bitcoin",
          "value": "bitcoin"
        },
        {
          "label": "Tron",
          "value": "tron"
        },
        {
          "label": "Arbitrum",
          "value": "arbitrum"
        },
        {
          "label": "Optimism",
          "value": "optimism"
        },
        {
          "label": "Polygon",
          "value": "polygon"
        },
        {
          "label": "zkSync Era",
          "value": "zksync-era"
        },
        {
          "label": "Metis",
          "value": "metis"
        },
        {
          "label": "Osmosis",
          "value": "osmosis"
        },
        {
          "label": "Binance",
          "value": "binance"
        },
        {
          "label": "Fantom",
          "value": "fantom"
        },
        {
          "label": "Polkadot",
          "value": "polkadot"
        },
        {
          "label": "xDai",
          "value": "xdai"
        },
        {
          "label": "Terra",
          "value": "terra"
        },
        {
          "label": "Moonbeam",
          "value": "moonbeam"
        },
        {
          "label": "Solana",
          "value": "solana"
        },
        {
          "label": "Celo",
          "value": "celo"
        },
        {
          "label": "Base",
          "value": "base"
        },
        {
          "label": "Harmony",
          "value": "harmony"
        },
        {
          "label": "Evmos",
          "value": "evmos"
        },
        {
          "label": "Boba",
          "value": "boba"
        },
        {
          "label": "Kujira",
          "value": "kujira"
        },
        {
          "label": "Cosmos",
          "value": "cosmos"
        },
        {
          "label": "Terra2",
          "value": "terra2"
        },
        {
          "label": "Injective",
          "value": "injective"
        },
        {
          "label": "Secret",
          "value": "secret"
        },
        {
          "label": "Stargaze",
          "value": "stargaze"
        },
        {
          "label": "Juno",
          "value": "juno"
        },
        {
          "label": "Crescent",
          "value": "crescent"
        },
        {
          "label": "Persistence",
          "value": "persistence"
        },
        {
          "label": "Umee",
          "value": "umee"
        },
        {
          "label": "Comdex",
          "value": "comdex"
        },
        {
          "label": "Kava",
          "value": "kava"
        },
        {
          "label": "Carbon",
          "value": "carbon"
        },
        {
          "label": "Mantle",
          "value": "mantle"
        },
        {
          "label": "Aurora",
          "value": "aurora"
        },
        {
          "label": "Hemi",
          "value": "hemi"
        },
        {
          "label": "Chainflip",
          "value": "chainflip"
        },
        {
          "label": "Saga",
          "value": "saga"
        },
        {
          "label": "Manta",
          "value": "manta"
        },
        {
          "label": "Taiko",
          "value": "taiko"
        },
        {
          "label": "Sei",
          "value": "sei"
        },
        {
          "label": "Noble",
          "value": "noble"
        },
        {
          "label": "Cardano",
          "value": "cardano"
        },
        {
          "label": "Algorand",
          "value": "algorand"
        },
        {
          "label": "Doge",
          "value": "doge"
        },
        {
          "label": "Starknet",
          "value": "starknet"
        },
        {
          "label": "Tezos",
          "value": "tezos"
        },
        {
          "label": "XPLA",
          "value": "xpla"
        },
        {
          "label": "Fraxtal",
          "value": "fraxtal"
        },
        {
          "label": "Hedera",
          "value": "hedera"
        },
        {
          "label": "zkLink",
          "value": "zklink"
        },
        {
          "label": "BOB",
          "value": "bob"
        },
        {
          "label": "Hyperliquid",
          "value": "hyperliquid"
        },
        {
          "label": "Immutable zkEVM",
          "value": "immutable-zkevm"
        },
        {
          "label": "TON",
          "value": "ton"
        },
        {
          "label": "Heco",
          "value": "heco"
        },
        {
          "label": "Interlay",
          "value": "interlay"
        },
        {
          "label": "OKExChain",
          "value": "okexchain"
        },
        {
          "label": "Genshiro",
          "value": "genshiro"
        },
        {
          "label": "Op_Bnb",
          "value": "opbnb"
        },
        {
          "label": "ZetaChain",
          "value": "zetachain"
        },
        {
          "label": "ICP",
          "value": "icp"
        },
        {
          "label": "LightLink",
          "value": "lightlink"
        },
        {
          "label": "Stellar",
          "value": "stellar"
        },
        {
          "label": "Chiliz",
          "value": "chiliz"
        },
        {
          "label": "Kintsugi",
          "value": "kintsugi"
        },
        {
          "label": "Archway",
          "value": "archway"
        },
        {
          "label": "Manta Atlantic",
          "value": "manta-atlantic"
        },
        {
          "label": "Celestia",
          "value": "celestia"
        },
        {
          "label": "Neutron",
          "value": "neutron"
        },
        {
          "label": "Ronin",
          "value": "ronin"
        },
        {
          "label": "Equilibrium",
          "value": "equilibrium"
        },
        {
          "label": "Regen",
          "value": "regen"
        },
        {
          "label": "Migaloo",
          "value": "migaloo"
        },
        {
          "label": "Chihuahua",
          "value": "chihuahua"
        },
        {
          "label": "Dymension",
          "value": "dymension"
        },
        {
          "label": "Stride",
          "value": "stride"
        },
        {
          "label": "ZKsync Era",
          "value": "zksync-era"
        },
        {
          "label": "Polynomial",
          "value": "polynomial"
        },
        {
          "label": "Lisk",
          "value": "lisk"
        },
        {
          "label": "Hyperliquid L1",
          "value": "hyperliquid-l1"
        },
        {
          "label": "World Chain",
          "value": "world-chain"
        },
        {
          "label": "Litecoin",
          "value": "litecoin"
        },
        {
          "label": "Ripple",
          "value": "ripple"
        },
        {
          "label": "Linea",
          "value": "linea"
        },
        {
          "label": "Zora",
          "value": "zora"
        },
        {
          "label": "RSK",
          "value": "rsk"
        },
        {
          "label": "Filecoin",
          "value": "filecoin"
        },
        {
          "label": "Scroll",
          "value": "scroll"
        },
        {
          "label": "Blast",
          "value": "blast"
        },
        {
          "label": "Sui",
          "value": "sui"
        },
        {
          "label": "Polygon zkEVM",
          "value": "polygon-zkevm"
        },
        {
          "label": "Astar",
          "value": "astar"
        },
        {
          "label": "IoTeX",
          "value": "iotex"
        },
        {
          "label": "Berachain",
          "value": "berachain"
        },
        {
          "label": "Unichain",
          "value": "unichain"
        },
        {
          "label": "Agoric",
          "value": "agoric"
        },
        {
          "label": "Goat",
          "value": "goat"
        },
        {
          "label": "Corn",
          "value": "corn"
        },
        {
          "label": "Sonic",
          "value": "sonic"
        },
        {
          "label": "Babylon Genesis",
          "value": "babylon-genesis"
        }
      ],
      "paramKey": "chains"
    },
    "projects": {
      "position": 15,
      "label": "Projects",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_projects",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "Aptos",
          "value": "aptos"
        },
        {
          "label": "Avalanche",
          "value": "avalanche"
        },
        {
          "label": "Oasis",
          "value": "oasis"
        },
        {
          "label": "Optimism",
          "value": "optimism"
        },
        {
          "label": "Solana",
          "value": "solana"
        },
        {
          "label": "Cardano",
          "value": "cardano"
        },
        {
          "label": "BNB Smart Chain",
          "value": "bnb-smart-chain"
        },
        {
          "label": "Binance CEX",
          "value": "binance-cex"
        },
        {
          "label": "Binance staked ETH",
          "value": "binance-staked-eth"
        },
        {
          "label": "Cronos",
          "value": "cronos"
        },
        {
          "label": "xDai",
          "value": "xdai"
        },
        {
          "label": "Gnosis DAO",
          "value": "gnosis-dao"
        },
        {
          "label": "Gnosis Protocol v1",
          "value": "gnosis-protocol-v1"
        },
        {
          "label": "Aurora",
          "value": "aurora"
        },
        {
          "label": "Ethereum",
          "value": "ethereum"
        },
        {
          "label": "Go Ethereum",
          "value": "go-ethereum"
        },
        {
          "label": "Fuel",
          "value": "fuel"
        },
        {
          "label": "Harmony",
          "value": "harmony"
        },
        {
          "label": "MultiversX",
          "value": "multiversx"
        },
        {
          "label": "Ad-Astra Bridge",
          "value": "ad-astra-bridge"
        },
        {
          "label": "Arbitrum Nova",
          "value": "arbitrum-nova"
        },
        {
          "label": "Arbitrum One",
          "value": "arbitrum-one"
        },
        {
          "label": "Arbitrum Bridge",
          "value": "arbitrum-bridge"
        },
        {
          "label": "Arbitrum DAO",
          "value": "arbitrum-dao"
        },
        {
          "label": "Arbitrum Nova Bridge",
          "value": "arbitrum-nova-bridge"
        },
        {
          "label": "Algorand",
          "value": "algorand"
        },
        {
          "label": "zkSync",
          "value": "zksync"
        },
        {
          "label": "zkSync Era",
          "value": "zksync-era"
        },
        {
          "label": "Celestia",
          "value": "celestia"
        },
        {
          "label": "Base",
          "value": "base"
        },
        {
          "label": "Coinbase Wrapped Staked ETH",
          "value": "coinbase-wrapped-staked-eth"
        },
        {
          "label": "Coinbase Commerce",
          "value": "coinbase-commerce"
        },
        {
          "label": "Argent X",
          "value": "argent-x"
        },
        {
          "label": "Internet Computer",
          "value": "internet-computer"
        },
        {
          "label": "dYdX Protocol",
          "value": "dydx-protocol"
        },
        {
          "label": "dYdX V3",
          "value": "dydx-v3"
        },
        {
          "label": "Genshiro",
          "value": "genshiro"
        },
        {
          "label": "Equilibrium Lending",
          "value": "equilibrium-lending"
        },
        {
          "label": "Forta Network",
          "value": "forta-network"
        },
        {
          "label": "Eigenlayer",
          "value": "eigenlayer"
        },
        {
          "label": "Magic Eden",
          "value": "magic-eden"
        },
        {
          "label": "Mirror",
          "value": "mirror"
        },
        {
          "label": "Surge.wtf",
          "value": "surgewtf"
        },
        {
          "label": "OrderlyNetwork",
          "value": "orderlynetwork"
        },
        {
          "label": "Orderly Network",
          "value": "orderly-network"
        },
        {
          "label": "Parcl",
          "value": "parcl"
        },
        {
          "label": "Phantom Wallet",
          "value": "phantom-wallet"
        },
        {
          "label": "rPay",
          "value": "rpay"
        },
        {
          "label": "Reserve Protocol",
          "value": "reserve-protocol"
        },
        {
          "label": "Uniswap V1",
          "value": "uniswap-v1"
        },
        {
          "label": "Uniswap V2",
          "value": "uniswap-v2"
        },
        {
          "label": "Uniswap V3",
          "value": "uniswap-v3"
        },
        {
          "label": "Worldcoin",
          "value": "worldcoin"
        },
        {
          "label": "zora",
          "value": "zora"
        },
        {
          "label": "AAVE V2",
          "value": "aave-v2"
        },
        {
          "label": "AAVE V3",
          "value": "aave-v3"
        },
        {
          "label": "AAVE V1",
          "value": "aave-v1"
        },
        {
          "label": "Aave Arc",
          "value": "aave-arc"
        },
        {
          "label": "Hyphen",
          "value": "hyphen"
        },
        {
          "label": "Biconomy",
          "value": "biconomy"
        },
        {
          "label": "Centrifuge",
          "value": "centrifuge"
        },
        {
          "label": "Enso",
          "value": "enso"
        },
        {
          "label": "ETHGlobal",
          "value": "ethglobal"
        },
        {
          "label": "Hyperlane Protocol",
          "value": "hyperlane-protocol"
        },
        {
          "label": "Immutable zkEVM",
          "value": "immutable-zkevm"
        },
        {
          "label": "ImmutableX",
          "value": "immutablex"
        },
        {
          "label": "Injective Protocol",
          "value": "injective-protocol"
        },
        {
          "label": "Injective Bridge",
          "value": "injective-bridge"
        },
        {
          "label": "Newton",
          "value": "newton"
        },
        {
          "label": "Obol",
          "value": "obol"
        },
        {
          "label": "Flux Finance",
          "value": "flux-finance"
        },
        {
          "label": "Ondo Funds",
          "value": "ondo-funds"
        },
        {
          "label": "Ondo Finance",
          "value": "ondo-finance"
        },
        {
          "label": "Ondo v1 (Legacy)",
          "value": "ondo-v1-legacy"
        },
        {
          "label": "Opensea",
          "value": "opensea"
        },
        {
          "label": "Across",
          "value": "across"
        },
        {
          "label": "Uma",
          "value": "uma"
        },
        {
          "label": "Goldfinch",
          "value": "goldfinch"
        },
        {
          "label": "Axelar",
          "value": "axelar"
        },
        {
          "label": "Paraswap",
          "value": "paraswap"
        },
        {
          "label": "Prepo",
          "value": "prepo"
        },
        {
          "label": "C3 Exchange",
          "value": "c3-exchange"
        },
        {
          "label": "Zerion Wallet",
          "value": "zerion-wallet"
        },
        {
          "label": "Polkadot",
          "value": "polkadot"
        },
        {
          "label": "Aera Finance",
          "value": "aera-finance"
        },
        {
          "label": "Alkimiya",
          "value": "alkimiya"
        },
        {
          "label": "Ostium Labs",
          "value": "ostium-labs"
        },
        {
          "label": "Mantle",
          "value": "mantle"
        },
        {
          "label": "Mantle Staked ETH",
          "value": "mantle-staked-eth"
        },
        {
          "label": "Mantle Treasury",
          "value": "mantle-treasury"
        },
        {
          "label": "Boyco",
          "value": "boyco"
        },
        {
          "label": "Staking Rewards",
          "value": "staking-rewards"
        },
        {
          "label": "srEth",
          "value": "sreth"
        },
        {
          "label": "Staking Rewards srETH",
          "value": "staking-rewards-sreth"
        },
        {
          "label": "Resolv Labs",
          "value": "resolv-labs"
        },
        {
          "label": "Resolv",
          "value": "resolv"
        },
        {
          "label": "Fraxchain",
          "value": "fraxchain"
        },
        {
          "label": "Frax",
          "value": "frax"
        },
        {
          "label": "FPI",
          "value": "fpi"
        },
        {
          "label": "frxETH",
          "value": "frxeth"
        },
        {
          "label": "Fraxswap",
          "value": "fraxswap"
        },
        {
          "label": "Fraxlend",
          "value": "fraxlend"
        },
        {
          "label": "Fraxferry",
          "value": "fraxferry"
        },
        {
          "label": "Frax FPI",
          "value": "frax-fpi"
        },
        {
          "label": "Safe",
          "value": "safe"
        },
        {
          "label": "Mina Protocol",
          "value": "mina-protocol"
        },
        {
          "label": "Blast Bridge",
          "value": "blast-bridge"
        },
        {
          "label": "Blast pre-launch Farm",
          "value": "blast-pre-launch-farm"
        },
        {
          "label": "Phoenix",
          "value": "phoenix"
        },
        {
          "label": "Mangrove",
          "value": "mangrove"
        },
        {
          "label": "Morpho",
          "value": "morpho"
        },
        {
          "label": "Morpho Aave",
          "value": "morpho-aave"
        },
        {
          "label": "Morpho Compound",
          "value": "morpho-compound"
        },
        {
          "label": "Morpho Aave V3",
          "value": "morpho-aave-v3"
        },
        {
          "label": "Pyth",
          "value": "pyth"
        },
        {
          "label": "Jumper Exchange",
          "value": "jumper-exchange"
        },
        {
          "label": "rotki",
          "value": "rotki"
        },
        {
          "label": "IceBreaker",
          "value": "icebreaker"
        },
        {
          "label": "Mooar",
          "value": "mooar"
        },
        {
          "label": "Gashero",
          "value": "gashero"
        },
        {
          "label": "Gora Network",
          "value": "gora-network"
        },
        {
          "label": "defi.app",
          "value": "defiapp"
        },
        {
          "label": "Megaton Finance",
          "value": "megaton-finance"
        },
        {
          "label": "Foundation",
          "value": "foundation"
        },
        {
          "label": "deBridge",
          "value": "debridge"
        },
        {
          "label": "Threshold Network",
          "value": "threshold-network"
        },
        {
          "label": "Mezo Network",
          "value": "mezo-network"
        },
        {
          "label": "Embody",
          "value": "embody"
        },
        {
          "label": "Taho",
          "value": "taho"
        },
        {
          "label": "Fold Inc.",
          "value": "fold-inc"
        },
        {
          "label": "Necto Labs",
          "value": "necto-labs"
        },
        {
          "label": "PancakeSwap AMM",
          "value": "pancakeswap-amm"
        },
        {
          "label": "PancakeSwap AMM V3",
          "value": "pancakeswap-amm-v3"
        },
        {
          "label": "PancakeSwap AMM V1",
          "value": "pancakeswap-amm-v1"
        },
        {
          "label": "Synthetix",
          "value": "synthetix"
        },
        {
          "label": "Thala veTHL",
          "value": "thala-vethl"
        },
        {
          "label": "Thala LSD",
          "value": "thala-lsd"
        },
        {
          "label": "ThalaSwap",
          "value": "thalaswap"
        },
        {
          "label": "IXSwap RWA",
          "value": "ixswap-rwa"
        },
        {
          "label": "Streamflow",
          "value": "streamflow"
        },
        {
          "label": "RMRK",
          "value": "rmrk"
        },
        {
          "label": "Singular",
          "value": "singular"
        },
        {
          "label": "Sky breach",
          "value": "sky-breach"
        },
        {
          "label": "HeliSwap",
          "value": "heliswap"
        },
        {
          "label": "Dune Catalyst",
          "value": "dune-catalyst"
        },
        {
          "label": "Integrated Staking",
          "value": "integrated-staking"
        },
        {
          "label": "Daedalus",
          "value": "daedalus"
        },
        {
          "label": "lace",
          "value": "lace"
        },
        {
          "label": "project catalyst",
          "value": "project-catalyst"
        },
        {
          "label": "Marlowe",
          "value": "marlowe"
        },
        {
          "label": "Nami",
          "value": "nami"
        },
        {
          "label": "Hardhat",
          "value": "hardhat"
        },
        {
          "label": "Swarm",
          "value": "swarm"
        },
        {
          "label": "CyberConnect",
          "value": "cyberconnect"
        },
        {
          "label": "Perpetual Protocol",
          "value": "perpetual-protocol"
        },
        {
          "label": "Nexus Mutual",
          "value": "nexus-mutual"
        },
        {
          "label": "Persistence DEX",
          "value": "persistence-dex"
        },
        {
          "label": "pSTAKE Finance",
          "value": "pstake-finance"
        },
        {
          "label": "Archimedes Finance",
          "value": "archimedes-finance"
        },
        {
          "label": "BackedFi",
          "value": "backedfi"
        },
        {
          "label": "Palomabot",
          "value": "palomabot"
        },
        {
          "label": "Sui Foundation",
          "value": "sui-foundation"
        },
        {
          "label": "IoTube",
          "value": "iotube"
        },
        {
          "label": "IoTeX",
          "value": "iotex"
        },
        {
          "label": "BloctoSwap",
          "value": "bloctoswap"
        },
        {
          "label": "Crossbell",
          "value": "crossbell"
        },
        {
          "label": "RSS3",
          "value": "rss3"
        },
        {
          "label": "Decentraland",
          "value": "decentraland"
        },
        {
          "label": "Aztec",
          "value": "aztec"
        },
        {
          "label": "Avail Block Explorer",
          "value": "avail-block-explorer"
        },
        {
          "label": "Hashflow",
          "value": "hashflow"
        },
        {
          "label": "Impossible Finance",
          "value": "impossible-finance"
        },
        {
          "label": "Native Lend",
          "value": "native-lend"
        },
        {
          "label": "Omni Network",
          "value": "omni-network"
        },
        {
          "label": "Manta Network",
          "value": "manta-network"
        },
        {
          "label": "Manta Atlantic Stake",
          "value": "manta-atlantic-stake"
        },
        {
          "label": "Manta CeDeFi",
          "value": "manta-cedefi"
        },
        {
          "label": "Manta Pacific",
          "value": "manta-pacific"
        },
        {
          "label": "Dymension",
          "value": "dymension"
        },
        {
          "label": "LiquidSwap",
          "value": "liquidswap"
        },
        {
          "label": "OVR",
          "value": "ovr"
        },
        {
          "label": "Terra Bridge",
          "value": "terra-bridge"
        },
        {
          "label": "ZetaChain",
          "value": "zetachain"
        },
        {
          "label": "Axie Infinity",
          "value": "axie-infinity"
        },
        {
          "label": "Sei",
          "value": "sei"
        },
        {
          "label": "Saga",
          "value": "saga"
        },
        {
          "label": "Polynomial Earn",
          "value": "polynomial-earn"
        },
        {
          "label": "Monad",
          "value": "monad"
        },
        {
          "label": "Ethena",
          "value": "ethena"
        },
        {
          "label": "QuipuSwap V3",
          "value": "quipuswap-v3"
        },
        {
          "label": "Yupana",
          "value": "yupana"
        },
        {
          "label": "BrainDAO",
          "value": "braindao"
        },
        {
          "label": "SwissBorg",
          "value": "swissborg"
        },
        {
          "label": "NEAR",
          "value": "near"
        },
        {
          "label": "L2BEAT",
          "value": "l2beat"
        },
        {
          "label": "Seedify",
          "value": "seedify"
        },
        {
          "label": "Interlay",
          "value": "interlay"
        },
        {
          "label": "Interlay Staking",
          "value": "interlay-staking"
        },
        {
          "label": "Interlay Dex",
          "value": "interlay-dex"
        },
        {
          "label": "Kintsugi",
          "value": "kintsugi"
        },
        {
          "label": "BOB Fusion",
          "value": "bob-fusion"
        },
        {
          "label": "BOB",
          "value": "bob"
        },
        {
          "label": "Pendle",
          "value": "pendle"
        },
        {
          "label": "Arkham",
          "value": "arkham"
        },
        {
          "label": "BTSE",
          "value": "btse"
        },
        {
          "label": "IOTA Pico",
          "value": "iota-pico"
        },
        {
          "label": "bloXroute",
          "value": "bloxroute"
        },
        {
          "label": "Bluefin",
          "value": "bluefin"
        },
        {
          "label": "Carbonable",
          "value": "carbonable"
        },
        {
          "label": "DeFiner",
          "value": "definer"
        },
        {
          "label": "WOOFi Swap",
          "value": "woofi-swap"
        },
        {
          "label": "Geodnet",
          "value": "geodnet"
        },
        {
          "label": "Napier Finance",
          "value": "napier-finance"
        },
        {
          "label": "Scroll",
          "value": "scroll"
        },
        {
          "label": "Scroll Bridge",
          "value": "scroll-bridge"
        },
        {
          "label": "Astar",
          "value": "astar"
        },
        {
          "label": "Soneium",
          "value": "soneium"
        },
        {
          "label": "Santiment",
          "value": "santiment"
        },
        {
          "label": "SanR",
          "value": "sanr"
        },
        {
          "label": "The Open Network",
          "value": "the-open-network"
        },
        {
          "label": "Kakarot",
          "value": "kakarot"
        },
        {
          "label": "AltLayer",
          "value": "altlayer"
        },
        {
          "label": "Trezor",
          "value": "trezor"
        },
        {
          "label": "dlcBTC",
          "value": "dlcbtc"
        },
        {
          "label": "OraiChain",
          "value": "oraichain"
        },
        {
          "label": "Polymarket",
          "value": "polymarket"
        },
        {
          "label": "Unlock",
          "value": "unlock"
        },
        {
          "label": "Chainflip",
          "value": "chainflip"
        },
        {
          "label": "Rage Trade",
          "value": "rage-trade"
        },
        {
          "label": "Rage Trade v1 (Deprecated)",
          "value": "rage-trade-v1-deprecated"
        },
        {
          "label": "1inch Network",
          "value": "1inch-network"
        },
        {
          "label": "Magpie Protocol",
          "value": "magpie-protocol"
        },
        {
          "label": "SynergyAI",
          "value": "synergyai"
        },
        {
          "label": "Synnax",
          "value": "synnax"
        },
        {
          "label": "KYEX Swap",
          "value": "kyex-swap"
        },
        {
          "label": "Everclear",
          "value": "everclear"
        },
        {
          "label": "HELIX Finance",
          "value": "helix-finance"
        },
        {
          "label": "TACo",
          "value": "taco"
        },
        {
          "label": "Magic Newton",
          "value": "magic-newton"
        },
        {
          "label": "SynFutures V1",
          "value": "synfutures-v1"
        }
      ],
      "paramKey": "projects"
    },
    "classifications": {
      "position": 1,
      "label": "Category",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_classifications",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "Finance",
          "value": "finance"
        },
        {
          "label": "Legal",
          "value": "legal"
        },
        {
          "label": "Partnerships",
          "value": "partnerships"
        },
        {
          "label": "Research",
          "value": "research"
        },
        {
          "label": "Engineering",
          "value": "engineering"
        },
        {
          "label": "Product",
          "value": "product"
        },
        {
          "label": "Operations",
          "value": "operations"
        },
        {
          "label": "Marketing",
          "value": "marketing"
        },
        {
          "label": "Events",
          "value": "events"
        },
        {
          "label": "Management",
          "value": "management"
        },
        {
          "label": "Devrel",
          "value": "devrel"
        },
        {
          "label": "Bizdev",
          "value": "bizdev"
        },
        {
          "label": "Other",
          "value": "other"
        },
        {
          "label": "Community",
          "value": "community"
        },
        {
          "label": "Product Management",
          "value": "productmanagement"
        },
        {
          "label": "Growth",
          "value": "growth"
        },
        {
          "label": "Cybersecurity",
          "value": "cybersecurity"
        },
        {
          "label": "Devops",
          "value": "devops"
        },
        {
          "label": "Design",
          "value": "design"
        },
        {
          "label": "Backend",
          "value": "backend"
        },
        {
          "label": "Frontend",
          "value": "frontend"
        },
        {
          "label": "People",
          "value": "people"
        },
        {
          "label": "Customer Support",
          "value": "customersupport"
        },
        {
          "label": "Data Science",
          "value": "datascience"
        },
        {
          "label": "Project Management",
          "value": "projectmanagement"
        },
        {
          "label": "Technical Writing",
          "value": "technicalwriting"
        },
        {
          "label": "Human Resources",
          "value": "humanresources"
        },
        {
          "label": "Accounting",
          "value": "accounting"
        },
        {
          "label": "Sales",
          "value": "sales"
        },
        {
          "label": "Fullstack",
          "value": "fullstack"
        },
        {
          "label": "Trading",
          "value": "trading"
        },
        {
          "label": "Smart Contracts",
          "value": "smartcontracts"
        },
        {
          "label": "Auditing",
          "value": "auditing"
        }
      ],
      "paramKey": "classifications"
    },
    "commitments": {
      "position": 2,
      "label": "Commitment",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_commitments",
      "kind": "MULTI_SELECT_WITH_SEARCH",
      "options": [
        {
          "label": "Full Time",
          "value": "fulltime"
        },
        {
          "label": "Part Time",
          "value": "parttime"
        },
        {
          "label": "Contract",
          "value": "contract"
        },
        {
          "label": "Internship",
          "value": "internship"
        }
      ],
      "paramKey": "commitments"
    },
    "tvl": {
      "position": 17,
      "label": "TVL",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_tvl",
      "kind": "RANGE",
      "prefix": "$",
      "value": {
        "lowest": {
          "value": 0,
          "paramKey": "minTvl"
        },
        "highest": {
          "value": 99772190068.2955,
          "paramKey": "maxTvl"
        }
      }
    },
    "monthlyVolume": {
      "position": 18,
      "label": "Volume/mo",
      "show": false,
      "googleAnalyticsEventName": "filter_joblist_monthly_volume",
      "kind": "RANGE",
      "prefix": "$",
      "value": {
        "lowest": {
          "value": 0,
          "paramKey": "minMonthlyVolume"
        },
        "highest": {
          "value": 0,
          "paramKey": "maxMonthlyVolume"
        }
      }
    },
    "monthlyFees": {
      "position": 19,
      "label": "Fees/mo",
      "show": false,
      "googleAnalyticsEventName": "filter_joblist_monthly_fees",
      "kind": "RANGE",
      "prefix": "$",
      "value": {
        "lowest": {
          "value": 0,
          "paramKey": "minMonthlyFees"
        },
        "highest": {
          "value": 0,
          "paramKey": "maxMonthlyFees"
        }
      }
    },
    "monthlyRevenue": {
      "position": 20,
      "label": "Revenue/mo",
      "show": false,
      "googleAnalyticsEventName": "filter_joblist_monthly_revenue",
      "kind": "RANGE",
      "prefix": "$",
      "value": {
        "lowest": {
          "value": 0,
          "paramKey": "minMonthlyRevenue"
        },
        "highest": {
          "value": 0,
          "paramKey": "maxMonthlyRevenue"
        }
      }
    },
    "audits": {
      "position": 11,
      "label": "Audits",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_audits",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "Has Audits",
          "value": true
        },
        {
          "label": "Has No Audits",
          "value": false
        }
      ],
      "paramKey": "audits"
    },
    "hacks": {
      "position": 12,
      "label": "Hacks",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_hacks",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "Has been hacked",
          "value": true
        },
        {
          "label": "Has not been hacked",
          "value": false
        }
      ],
      "paramKey": "hacks"
    },
    "token": {
      "position": 21,
      "label": "Has Token",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_has_token",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "Has Token",
          "value": true
        },
        {
          "label": "Has No Token",
          "value": false
        }
      ],
      "paramKey": "token"
    },
    "onboardIntoWeb3": {
      "position": 22,
      "label": "Web3 Beginner Friendly",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_onboard_into_web3",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "Web3 Beginner Friendly",
          "value": true
        },
        {
          "label": "Not Web3 Beginner Friendly",
          "value": false
        }
      ],
      "paramKey": "onboardIntoWeb3"
    },
    "order": {
      "position": 24,
      "label": "Order",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_order",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "A-Z",
          "value": "asc"
        },
        {
          "label": "Z-A",
          "value": "desc"
        }
      ],
      "paramKey": "order"
    },
    "orderBy": {
      "position": 23,
      "label": "Order By",
      "show": true,
      "googleAnalyticsEventName": "filter_joblist_order_by",
      "kind": "SINGLE_SELECT",
      "options": [
        {
          "label": "Funding Date",
          "value": "fundingDate"
        },
        {
          "label": "Head Count",
          "value": "headcountEstimate"
        },
        {
          "label": "Monthly Fees",
          "value": "monthlyFees"
        },
        {
          "label": "Monthly Revenue",
          "value": "monthlyRevenue"
        },
        {
          "label": "Monthly Volume",
          "value": "monthlyVolume"
        },
        {
          "label": "Number of Audits",
          "value": "audits"
        },
        {
          "label": "Number of Chains",
          "value": "chains"
        },
        {
          "label": "Number of Hacks",
          "value": "hacks"
        },
        {
          "label": "Publication Date",
          "value": "publicationDate"
        },
        {
          "label": "Salary",
          "value": "salary"
        },
        {
          "label": "TVL",
          "value": "tvl"
        },
        {
          "label": "Team Size",
          "value": "teamSize"
        }
      ],
      "paramKey": "orderBy"
    }
  }