"use client";

import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider"

const UiSlider = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (value) => {
        setSliderValue(value); // Assuming the slider returns an array of values
    };

    const calculatedValue = sliderValue * 2;

    return (
        <div>
            <Slider defaultValue={[50]} max={100} step={1} onValueChange={handleSliderChange} />
            <p>{sliderValue}</p>
        </div>
    );
};

export default UiSlider;