const fontStacks = {
  body: "Arial, Helvetica, sans-serif",
  script: "'Helvetica', cursive",
} as const;


export const emailStyles = {
  body: {
    backgroundColor: "#c07c3f",    
    backgroundImage: "linear-gradient(135deg, #a8dfab 0%, #ca4382 100%)",
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "32px 12px",
  },

  container: {
    backgroundColor: "#ffffff",
    border: "4px solid #a52e0d",
    borderStyle: "outset",
    borderRadius: "14px",
    maxWidth: "640px",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#ffece0",
    backgroundImage: "linear-gradient(135deg, #e051bc 0%, #d8ac79 100%)",
    borderBottom: "4px solid #fae0d9",
    padding: "10px 26px",
    
  },

  logo: {
    display: "block",
    margin: "0 auto 5px",
  },

  brandLabel: {
    color: "#6f4d37",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    margin: "0 0 6px",
    textTransform: "uppercase" as const,
    textAlign: "center",
    fontFamily: fontStacks.script,
  },

  brandName: {
    color: "#6f4d37",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "28px",
    margin: "0",
    textAlign: "center",
    fontFamily: fontStacks.script,
  },

  content: {
    padding: "32px 28px 28px",
  },

  heading: {
    color: "#6f4d37",
    fontSize: "28px",
    fontWeight: "800",
    lineHeight: "34px",
    margin: "0 0 18px",
  },

  text: {
    color: "#1f2937",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 14px",
  },

  card: {
    backgroundColor: "#ffece0",
    border: "1px solid #e051bc",
    borderRadius: "10px",
    padding: "18px",
    margin: "20px 0",
  },

  itemCard: {
    backgroundColor: "#ffd2ad",
    border: "1px solid #bfdbfe",
    borderRadius: "10px",
    padding: "14px 16px",
    margin: "12px 0",
  },

  sectionTitle: {
    color: "#e051bc",
    fontSize: "16px",
    fontWeight: "800",
    lineHeight: "22px",
    margin: "0 0 12px",
  },

  detailText: {
    color: "#2b394d",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0 0 8px",
  },

  divider: {
    borderColor: "#fdba74",
    margin: "20px 0",
  },

  button: {
    display: "inline-block",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    padding: "12px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    marginTop: "14px",
  },

  footerText: {
    fontSize: "12px",
    lineHeight: "20px",
    color: "#475569",
    margin: "0",
  },

  footer: {
    backgroundColor: "#ecfdf5",
    borderTop: "1px solid #e051bc",
    padding: "20px 28px",
  },

  mutedText: {
    color: "#475569",
  },

  alertBox: {
    backgroundColor: "#fef3c7",
    border: "1px solid #f59e0b",
    borderRadius: "8px",
    padding: "14px 16px",
    margin: "16px 0",
  },
  // fontScript: {
  //   fontFamily: "'Dancing Script', cursive",
  // },
} as const;
