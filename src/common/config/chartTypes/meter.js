import colorPalettes from '../colorPalettes';

const LabelColor =
  getComputedStyle(document.documentElement).getPropertyValue(
    '--kd-color-text-secondary'
  ) || '#6d6d6d';

export const type = 'meter';

export const options = () => {
  return {
    radius: '80%',
    circumference: 180,
    rotation: 270,
    plugins: {
      datalabels: {
        color: LabelColor,
        font: function (context) {
          var w = context.chart.width;
          return {
            size: w < 512 ? 10 : 12,
            weight: 'bold',
          };
        },
        display: 'auto',
        align: 'end',
        anchor: 'end',
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };
};

export const datasetOptions = (ctx, index) => {
  return {
    backgroundColor: colorPalettes[ctx.options.colorPalette || 'categorical'],
  };
};
