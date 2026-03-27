import React, { useEffect, useState } from "react";
import { Slider, Stack, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useIsMount } from "../first-render-useeffect-controller/useIsMount";

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-rail": {
    height: "5px",
    backgroundColor: theme.palette.neutral[600],
  },
  "& .MuiSlider-mark": {
    display: "none",
  },
  "& .MuiSlider-thumb": {
    backgroundColor: theme.palette.neutral[100],
    border: `4px solid ${theme.palette.primary.main}`,
    boxShadow: "0px 2px 4px rgba(9, 87, 203, 0.15)",
  },
}));

const CustomSlider = ({
                        handleChangePrice,
                        minMax,
                        priceFilterRange,
                        store,
                        rentalPriceFilterRange,
                      }) => {
  const { filterData } = useSelector((state) => state.searchFilterStore);
  const sanitizeRange = (range, fallback = [0, 20000]) => {
    const parsed = Array.isArray(range) ? range.map(Number) : fallback;
    let [start, end] = parsed;
    if (!Number.isFinite(start)) start = fallback[0];
    if (!Number.isFinite(end)) end = fallback[1];
    if (end < start) [start, end] = [end, start];
    return [start, end];
  };

  const clampRange = (range, min, max) => {
    const [rawStart, rawEnd] = sanitizeRange(range, [min, max]);
    const start = Math.max(min, Math.min(rawStart, max));
    const end = Math.max(min, Math.min(rawEnd, max));
    return start <= end ? [start, end] : [end, start];
  };

  const [value, setValue] = useState(() => sanitizeRange(rentalPriceFilterRange || minMax));
  const minDistance = 1;
  const isMount = useIsMount();

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleChangeCommitted = (event, newValue) => {
    handleChangePrice(newValue);
  };

  const [computedMin, computedMax] = sanitizeRange(rentalPriceFilterRange, [0, 20000]);
  const min = computedMin;
  const max = computedMax;

  useEffect(() => {
    setValue(clampRange(minMax, min, max));
  }, [minMax, min, max]);

  return (
    <Stack
      direction="row"
      sx={{ mb: 1 }}
      alignItems="center"
      spacing={1}
      px=".7rem"
    >
      <StyledSlider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"

        min={min}
        max={max}
        marks={[
          { value: min },
          { value: max },
        ]}
        disableSwap
      />
    </Stack>
  );
};

export default CustomSlider;
