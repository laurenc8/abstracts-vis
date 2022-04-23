import React, { useState } from 'react';
import { BarStackHorizontal } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { withTooltip } from '@visx/tooltip';
import { PatternLines } from '@visx/pattern';

const barColor = '#000000';
const unusedColor = '#000000';
export const textColor = '#727272';
export const background = '#F9F9F9';
const defaultMargin = { top: 20, left: 200, right: 40, bottom: 20 };

export default withTooltip(
  ({
    width,
    height,
    data,
    events = false,
    margin = defaultMargin,
    // tooltipOpen,
    // tooltipLeft,
    // tooltipTop,
    // tooltipData,
    // hideTooltip,
    // showTooltip,
  }) => {
    const keys = ["frequency"]

    // accessors
    const getCategory = (d) => d.category;

    // scales
    const frequencyScale = scaleLinear({
      domain: [0, Math.max.apply(null, data.map((d) => d.frequency))],
      nice: true,
    });
    const categoryScale = scaleBand({
      domain: data.map(getCategory),
      padding: 0.2,
    });
    const colorScale = scaleOrdinal({
      domain: keys,
      range: [barColor, unusedColor, textColor],
    });

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    frequencyScale.rangeRound([0, xMax]);
    categoryScale.rangeRound([yMax, 0]);
    
    return width < 10 ? null : (
      <div>
        <svg width={width} height={height}>
          <PatternLines
            id="lines"
            height={5}
            width={5}
            stroke={'black'}
            strokeWidth={1}
            orientation={['diagonal']}
          />
          <rect width={width} height={height} fill={background} rx={14} />
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={getCategory}
              xScale={frequencyScale}
              yScale={categoryScale}
              color={colorScale}
            >
              {barStacks =>
                barStacks.map(barStack =>
                  barStack.bars.map(bar => (
                    <Group>
                      <rect
                        key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={"url('#lines')"}
                        stroke="black"
                      />
                      <text x={bar.x + bar.width + 10} y={bar.y + bar.height/2 + 6} style={{fill: textColor, fontFamily: 'Calibre, sans-serif', fontSize: 18}}>
                        {bar.bar[1]}
                      </text>
                    </Group>
                  )),
                )
              }
            </BarStackHorizontal>
            <AxisLeft
              hideAxisLine
              hideTicks
              scale={categoryScale}
              stroke={textColor}
              tickStroke={textColor}
              tickLabelProps={() => ({
                fill: textColor,
                fontFamily: 'Calibre, sans-serif',
                fontSize: 20,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
            {/* <AxisBottom
              top={yMax}
              scale={frequencyScale}
              stroke={textColor}
              tickStroke={textColor}
              tickLabelProps={() => ({
                fill: textColor,
                fontFamily: 'Calibre, sans-serif',
                fontSize: 15,
                textAnchor: 'middle',
              })}
            /> */}
          </Group>
        </svg>
        <div
          style={{
            position: 'absolute',
            top: margin.top / 2 - 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
          }}
        >
        </div>
      </div>
    );
  },
);