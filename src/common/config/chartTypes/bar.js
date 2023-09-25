import colorPalettes from '../colorPalettes';

const BackgroundColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--kd-color-background-ui-default');

export const type = 'bar';

export const options = (ctx) => {
  const Horizontal = ctx.options.indexAxis === 'y';
  const FloatingBars = Array.isArray(ctx.datasets[0].data[0]);

  return {
    interaction: {
      mode: 'index',
    },
    borderRadius: 2,
    borderSkipped: FloatingBars ? false : 'start',
    borderColor: BackgroundColor,
    scales: {
      x: {
        grid: {
          display: FloatingBars || Horizontal,
          // offset: false,
        },
      },
      y: {
        grid: {
          display: !Horizontal,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tootltipItems) => {
            // add axis label to tooltip title
            const AxisLabel = Horizontal
              ? ctx.options.scales.y.title.text
              : ctx.options.scales.x.title.text;
            const Label = tootltipItems[0].label;

            return AxisLabel + ': ' + Label;
          },
          footer: (tooltipItems) => {
            // add total row
            let sum = 0;

            tooltipItems.forEach(function (tooltipItem) {
              sum += Horizontal ? tooltipItem.parsed.x : tooltipItem.parsed.y;
            });

            return 'Total: ' + sum;
          },
        },
      },
    },
  };
};

export const datasetOptions = (ctx, index) => {
  const Horizontal = ctx.options.indexAxis === 'y';
  const Stacked = ctx.options.scales.y.stacked;
  const Datasets = ctx.datasets;
  const BarDatasets = Datasets.filter((dataset) => dataset.type !== 'line');

  return {
    backgroundColor: colorPalettes[index],
    borderWidth: {
      top: !Horizontal && Stacked && index < BarDatasets.length - 1 ? 2 : 0, // stacked bars 2px gap
      right: Horizontal && Stacked && index < BarDatasets.length - 1 ? 2 : 0, // stacked bars 2px gap
    },
  };
};
