"use client";

import React from 'react';
import { useEffect, useState } from 'react';

export const Typewriter = ({ text, speed = 20, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");
    const words = text; // Split the text into an array of words
    const [index, setIndex] = useState(0); // Keep track of the current word index

    useEffect(() => {
        if (index < words) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + (prev ? ' ' : '') + words[index]);
                setIndex(index + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, words, speed, onComplete]);

    return <span>{displayedText}</span>;
};
