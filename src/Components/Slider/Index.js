import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import { View, Text } from "react-native";

import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";
import { useEffect } from "react";

const RangeSlider = ({ from, to, distance = () => { }, step, unit='m' }) => {
  // const RangeSlider = () => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value+unit} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      console.log({newLow});
      console.log({newHigh});
      setLow(newLow);
      setHigh(newHigh);
      distance(newLow)
    },[setLow, setHigh]
  );

  useEffect(()=>{
    handleValueChange()
  },[])

  return (
    <>
      <RangeSliderRN
        min={from}
        max={to}
        step={step}
        // floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        disableRange
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
        
      />
    </>
  );
};

export default RangeSlider;
