import { html } from 'lit';
import '../components/chart';
import argTypes from '../common/config/chartArgTypes';

export default {
  title: 'Charts/Meter',
  component: 'kd-chart',
  decorators: [
    (story) => html` <div style="max-width: 600px;">${story()}</div> `,
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/uwR7B1xbaRXA5spwPvzzFO/Florence-Release?node-id=2051%3A93&mode=dev',
    },
  },
  argTypes: argTypes,
};

const args = {
  chartTitle: 'Meter Chart',
  description: 'Chart description.',
  labels: ['LOW', 'MED', 'HIGH'],
  datasets: [
    {
      data: [30, 30, 30],
      // Required needleValue to show needle
      needleValue: 40,
      // optional customWord to provide user to add extra word along woth label text below needle
      customWord: 'RISK',
    },
  ],
  hideDescription: false,
  hideCaptions: false,
  hideHeader: false,
  hideControls: false,
  colorPalette: 'rag03',
  noBorder: false,
  width: null,
  height: null,
};

export const Meter = {
  args,
  render: (args) => {
    return html`
      <kd-chart
        type="meter"
        .chartTitle=${args.chartTitle}
        .description=${args.description}
        .labels=${args.labels}
        .datasets=${args.datasets}
        ?hideDescription=${args.hideDescription}
        ?hideCaptions=${args.hideCaptions}
        ?hideHeader=${args.hideHeader}
        ?hideControls=${args.hideControls}
        ?noBorder=${args.noBorder}
        .options=${{ colorPalette: args.colorPalette, ...args.options }}
        .width=${args.width}
        .height=${args.height}
      ></kd-chart>
    `;
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/9NrpK3rmbOk0lhlFkEPSaO/Data-Viz-Component-Library?node-id=64%3A4703&mode=dev',
    },
  },
};
