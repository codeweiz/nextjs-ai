import type { PropsWithChildren } from "react";
import "./globals.css";
import "@microboat/meet/config"

export default function RootLayout({ children }: PropsWithChildren) {
	return children;
}
