export const emailStyles = {
  body: {
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "32px 12px",
  },

  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e051bc",
    borderRadius: "14px",
    maxWidth: "640px",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#ffffff",
    borderBottom: "6px solid #e051bc",
    padding: "26px 28px",
  },

  logo: {
    display: "block",
    marginBottom: "14px",
  },

  brandLabel: {
    color: "#e051bc",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    margin: "0 0 6px",
    textTransform: "uppercase" as const,
  },

  brandName: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    lineHeight: "28px",
    margin: "0",
  },

  content: {
    padding: "32px 28px 28px",
  },

  heading: {
    color: "#ffffff",
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
    backgroundColor: "#fafafa",
    border: "1px solid #e051bc",
    borderRadius: "10px",
    padding: "18px",
    margin: "20px 0",
  },

  itemCard: {
    backgroundColor: "#ffffff",
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
} as const;
