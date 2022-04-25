import React from 'react';
import { BarStackHorizontal } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { withTooltip } from '@visx/tooltip';
import { PatternLines } from '@visx/pattern';

const barColor = '#000000';
const unusedColor = '#000000';
export const textColor = '#000000';
export const background = '#ffffff';
const defaultMargin = { top: 0, left: 250, right: 40, bottom: 0 };

export default withTooltip(
  ({
    width,
    height,
    data,
    events = false,
    margin = defaultMargin,
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
          <rect width={width} height={height} fill={background}/>
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
                        fill={'#6495ED'}
                        stroke="black"
                      />
                      <text x={bar.x + bar.width + 10} y={bar.y + bar.height/2 + 6} style={{fill: textColor, fontFamily: 'Poppins, sans-serif', fontSize: 15}}>
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
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
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