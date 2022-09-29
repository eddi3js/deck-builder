import React from 'react';
import ColorPicker from './colorPicker';
import Header from './header';
import RangeSlider from './range';
import Ratios from './ratios';

export default function DefaultCardFields() {
    return (
        <div className="flex flex-col">
            <Header />
            <Ratios />
            <RangeSlider type="radius" />
            <ColorPicker />
        </div>
    );
}
