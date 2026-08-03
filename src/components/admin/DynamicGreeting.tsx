"use client"

import React, { useEffect, useState } from 'react'

export function DynamicGreeting() {
    const [greeting, setGreeting] = useState("Good Morning");

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good Morning");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []);

    // Return the greeting text, letting the client update it based on local time
    return <span>{greeting},</span>;
}
