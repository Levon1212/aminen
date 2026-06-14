"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";

async function loadSettings(): Promise<Record<string, string>> {
    try {
        const base = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/").replace(/\/$/, "");
        const res = await fetch(`${base}/settings`);
        if (!res.ok) return {};
        const json = await res.json();
        return json.data || {};
    } catch {
        return {};
    }
}

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        loadSettings().then(setSettings);
    }, []);

    const footerSettings = {
        logoSrc: settings.footer_logo,
        tagline: settings.footer_tagline,
        email: settings.footer_email,
        telegram: settings.social_telegram || undefined,
        instagram: settings.social_instagram || undefined,
        youtube: settings.social_youtube || undefined,
        facebook: settings.social_facebook || undefined,
    };

    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <AuthProvider>
                <Lines />
                <Header />
                <ToasterContext />
                {children}
                <Footer settings={footerSettings} />
                <ScrollToTop />
            </AuthProvider>
        </ThemeProvider>
    );
}
