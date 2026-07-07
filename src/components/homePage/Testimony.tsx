'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IoStarSharp } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/constants';

/** Returns the index of the card whose centre is closest to the viewport centre. */
function getNearestIndex(el: HTMLDivElement): number {
    const cards = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
}

const Testimony = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // True while a programmatic scroll (auto/arrow/dot) is in progress
    const isProgrammatic = useRef(false);
    // Debounce timer for detecting end of user scroll
    const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const total = testimonials.length;

    /** Smoothly scroll to a card index without treating it as user interaction. */
    const scrollToIndex = useCallback((index: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const card = el.children[index] as HTMLElement | undefined;
        if (!card) return;
        isProgrammatic.current = true;
        el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
        // Reset flag after the smooth scroll animation finishes (~500 ms is enough)
        setTimeout(() => { isProgrammatic.current = false; }, 600);
    }, []);

    // Sync currentIndex with the scroll position for any scroll source (touch, trackpad, mouse drag)
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const onScroll = () => {
            // Update the dot indicator in real time regardless of scroll source
            const idx = getNearestIndex(el);
            setCurrentIndex(idx);

            // Update arrow boundary state from actual scroll position
            setCanScrollLeft(el.scrollLeft > 1);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);

            // Only treat as user interaction if scroll wasn't triggered programmatically
            if (!isProgrammatic.current) {
                // After user stops scrolling, snap-mandatory will snap; just update index
                if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
                scrollEndTimer.current = setTimeout(() => {
                    setCurrentIndex(getNearestIndex(el));
                }, 200);
            }
        };

        // Set initial boundary state after mount
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);

        el.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            el.removeEventListener('scroll', onScroll);
            if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
        };
    }, []);

    const goTo = (index: number) => {
        const clamped = Math.max(0, Math.min(index, total - 1));
        setCurrentIndex(clamped);
        scrollToIndex(clamped);
    };

    // Mouse drag — disable smooth scroll-behavior during drag so movement is instant
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);

    const onMouseDown = (e: React.MouseEvent) => {
        const el = scrollRef.current;
        if (!el) return;
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragScrollLeft.current = el.scrollLeft;
        el.style.cursor = 'grabbing';
        el.style.scrollBehavior = 'auto';
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        const dx = e.clientX - dragStartX.current;
        scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
    };

    const stopDrag = () => {
        const el = scrollRef.current;
        if (!isDragging.current || !el) return;
        isDragging.current = false;
        el.style.cursor = 'grab';
        // Restore smooth scroll-behavior after drag ends
        el.style.scrollBehavior = 'smooth';
    };

    return (
        <div className='w-full pb-8 pt-16'>
            <div className='w-[90%] mx-auto px-4'>
                {/* Header */}
                <div className='mb-12'>
                    <p className='font-inter text-sm font-medium text-primary uppercase tracking-wider mb-2'>
                        TESTIMONIALS
                    </p>
                    <h2 className='font-instrument-serif text-3xl md:text-5xl lg:text-7xl font-normal text-foreground mb-4'>
                        What Our Patients Say
                    </h2>
                    <p className='font-inter text-base md:text-lg font-normal text-muted-foreground max-w-2xl'>
                        Real experiences from our valued patients who trust us with their dental care
                    </p>
                </div>

                {/* Carousel Container */}
                <div className='flex items-center gap-3'>
                    {/* Left Arrow */}
                    <motion.button
                        onClick={() => goTo(currentIndex - 1)}
                        disabled={!canScrollLeft}
                        aria-label="Previous testimonial"
                        className='flex-none flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border shadow-md hover:bg-muted hover:border-primary transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                    >
                        <ChevronLeft className='w-5 h-5 text-foreground' />
                    </motion.button>

                    {/* Scrollable track */}
                    <div
                        ref={scrollRef}
                        className='flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 cursor-grab select-none overscroll-x-contain flex-1'
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollBehavior: 'smooth',
                        } as React.CSSProperties}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={stopDrag}
                        onMouseLeave={stopDrag}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={`${testimonial.name}-${index}`}
                                className='min-w-[300px] md:min-w-[350px] snap-start rounded-xl p-6 shadow-sm border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col justify-between'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.04 }}
                            >
                                {/* Stars */}
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-1 mb-2'>
                                        {[...Array(testimonial.stars)].map((_, idx) => (
                                            <IoStarSharp key={idx} className='text-secondary' size={16} />
                                        ))}
                                    </div>

                                    {/* Review Text */}
                                    <p className='font-inter text-base font-normal text-foreground leading-relaxed'>
                                        {testimonial.text}
                                    </p>
                                </div>

                                {/* Author */}
                                <div className='flex items-center gap-3 mt-6'>
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={40}
                                        height={40}
                                        className='w-10 h-10 rounded-full object-cover'
                                    />
                                    <div>
                                        <p className='font-inter text-sm font-medium text-foreground'>{testimonial.name}</p>
                                        <p className='font-inter text-xs font-normal text-muted-foreground'>{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <motion.button
                        onClick={() => goTo(currentIndex + 1)}
                        disabled={!canScrollRight}
                        aria-label="Next testimonial"
                        className='flex-none flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border shadow-md hover:bg-muted hover:border-primary transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                    >
                        <ChevronRight className='w-5 h-5 text-foreground' />
                    </motion.button>
                </div>

                {/* Pagination Dots */}
                <div className='flex justify-center gap-2 mt-8'>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={`rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'w-6 h-2 bg-primary'
                                    : 'w-2 h-2 bg-border hover:bg-muted-foreground'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimony;
