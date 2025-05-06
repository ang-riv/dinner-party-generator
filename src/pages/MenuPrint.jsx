import React, { useContext } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { StylingContext } from "../components/contexts/StylingContext";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
function LemonEmoji(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        fill="#77a836"
        d="M28.2 4.6C21 1.3 16 11.5 16 11.5s2.1 4.7 5.3 5.7c11.6 3.5 21.6-12 21.6-12s-7.6 2.7-14.7-.6"
      ></path>
      <path
        fill="#947151"
        d="M9 7.9c-.4 0-.5 1.5-.1 1.5c6.4 1.4 9 6.1 9.2 7c.3 1.2 2.1-.1 1.5-1.6c-.2-.2-3.9-6.1-10.6-6.9"
      ></path>
      <path
        fill="#64892f"
        d="M57.8 57.8c.3.3 1.5.6 2.1 0s.3-1.9 0-2.2s-1 0-1.5.6c-.6.7-.8 1.4-.6 1.6"
      ></path>
      <path
        fill="#ffe62e"
        d="M17.3 19.1c-.5-.7.1-2.3 1.5-3.8c1.4-1.4 3-2.1 3.7-1.6c8.4-5.4 21.2-2.9 30.4 6.6c8.2 8.5 11.1 20 7.8 28.6c1.6 2.1 1.1 5.7-1.4 8.3s-6 3.2-8 1.5c-8.3 3.3-19.4.4-27.6-8.1C14.5 41 12 27.8 17.3 19.1"
      ></path>
      <path
        fill="#8cc63e"
        d="M18.7 16.1C17.2 11.9 11 9.5 11 9.5s-12.6 7.1-8 16.3C7.5 34.9 4.6 45 4.6 45s19.2-14 14.1-28.9"
      ></path>
      <path
        fill="#7fb539"
        d="M11 9.5c-.9 1.2-1.7 2.5-2.3 3.9s-1 3-1.2 4.6c-.4 3.2 0 6.3.2 9.4c.3 3 .3 6.1-.2 9.1s-1.6 5.9-2.9 8.6c.8-1.2 1.5-2.6 2.2-4c.6-1.4 1.1-2.9 1.5-4.4c.7-3.2.7-6.4.4-9.5S8 21 8.3 18c.2-3 1.3-5.9 2.7-8.5"
      ></path>
    </svg>
  );
}
const printStyles = StyleSheet.create({
  document: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 841.89, // Approx. A4 height in pt (or set a large enough number)
    width: "100%",
    paddingTop: 136, // pt-34 → 34 * 4 = 136px
    paddingBottom: 20, // pb-5 → 5 * 4 = 20px
  },
  page: {
    width: 320,
    maxWidth: 384,
    paddingVertical: 24,
    backgroundColor: "#93c5fd",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSection: {
    width: "91.6667%", // w-11/12 = 91.6667%
    minHeight: "91.6667%", // min-h-11/12 = 91.6667%
    backgroundColor: "#ffffff", // bg-white
    borderTopLeftRadius: 9999, // rounded-t-full → use a large value
    borderTopRightRadius: 9999,
    borderWidth: 3, // outline-3
    borderColor: "#60a5fa", // outline-blue-400 = Tailwind blue-400 = #60a5fa
    paddingTop: 40, // pt-10 = 2.5rem = 40px
  },
  title: {
    color: "#60a5fa", // text-blue-400
    fontSize: 55, // text-[55px]
    lineHeight: 1, // leading-none (or 1: equal to fontSize)
    textAlign: "center", // text-center
    marginBottom: 32, // mb-8 = 2rem = 32px
  },
  emojiDiv: {
    display: "relative",
    top: "-3",
    bottom: "2",
  },
});
const MenuPrint = () => (
  <Document>
    <Page size="A4" style={printStyles.page}>
      <View style={printStyles.innerSection}>
        <Text style={printStyles.title}>Dinner Party Generator</Text>
      </View>
    </Page>
  </Document>
);

export default MenuPrint;
