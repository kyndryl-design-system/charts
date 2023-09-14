import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { deepmerge } from 'deepmerge-ts';
import Chart from 'chart.js/auto';
import ChartDeferred from 'chartjs-plugin-deferred';
import {
  ChoroplethController,
  BubbleMapController,
  GeoFeature,
  ColorScale,
  SizeScale,
  ProjectionScale,
} from 'chartjs-chart-geo';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';
import a11yPlugin from 'chartjs-plugin-a11y-legend';
import musicPlugin from 'chartjs-plugin-chart2music';
import annotationPlugin from 'chartjs-plugin-annotation';
import { convertChartDataToCSV } from '../../common/helpers/helpers';
import ChartScss from './chart.scss';
import globalOptions from '../../common/config/globalOptions';
import colorPalettes from '../../common/config/colorPalettes.json';
import '@kyndryl-design-system/foundation/components/icon';
import chartIcon from '@carbon/icons/es/chart--line/24';
import tableIcon from '@carbon/icons/es/data-table/24';
import overflowIcon from '@carbon/icons/es/overflow-menu--vertical/24';
import maximizeIcon from '@carbon/icons/es/maximize/24';

Chart.register(
  ChartDeferred,
  annotationPlugin,
  ChoroplethController,
  BubbleMapController,
  GeoFeature,
  ColorScale,
  SizeScale,
  ProjectionScale,
  TreemapController,
  TreemapElement
);

/**
 * Chart.js wrapper component.
 */
@customElement('kd-chart')
export class KDChart extends LitElement {
  static override styles = ChartScss;

  /** Chart title. */
  @property({ type: String })
  chartTitle = '';

  /** Chart description. */
  @property({ type: String })
  description = '';

  /** Chart.js chart type. Can be 'bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter', 'choropleth', 'bubbleMap', 'treemap'. */
  @property({ type: String })
  type: any = '';

  /** Chart.js data.labels. */
  @property({ type: Array })
  labels!: Array<string>;

  /** Chart.js data.datasets. */
  @property({ type: Array })
  datasets!: Array<any>;

  /** Chart.js options. Can override Shidoka defaults. */
  @property({ type: Object })
  options: any = {};

  /** Chart.js additional plugins. Must be registerable inline via Chart.plugins array, not globally via Chart.register. */
  @property({ type: Array })
  plugins: any = [];

  /** Hides the description visually. */
  @property({ type: Boolean })
  hideDescription = false;

  /** Hides the closed captions visually. */
  @property({ type: Boolean })
  hideCaptions = false;

  /**
   * Queries the container element.
   * @ignore
   */
  @query('.container')
  container!: HTMLCanvasElement;

  /**
   * Queries the canvas element.
   * @ignore
   */
  @query('canvas')
  canvas!: HTMLCanvasElement;

  /**
   * Queries the closed caption div.
   * @ignore
   */
  @query('.closed-caption')
  ccDiv!: HTMLDivElement;

  /** The chart instance.
   * @ignore
   */
  @state()
  chart: any = null;

  /** Table view mode.
   * @ignore
   */
  @state()
  tableView = false;

  /** Disable table view feature.
   * @ignore
   */
  @state()
  tableDisabled = false;

  /** Merged options.
   * @ignore
   */
  @state()
  mergedOptions: any = {};

  /** Merged datasets.
   * @ignore
   */
  @state()
  mergedDatasets: any = {};

  override render() {
    return html`
      <div class="container">
        <div class="header">
          <div class="title">${this.chartTitle}</div>

          <div class="controls">
            ${!this.tableDisabled
              ? html`
                  <button
                    title="Toggle View Mode"
                    aria-label="Toggle View Mode"
                    class="view-toggle"
                    @click=${() => this.handleViewToggle()}
                  >
                    <kd-icon
                      .icon=${chartIcon}
                      class="${!this.tableView ? 'active' : ''}"
                    ></kd-icon>
                    <kd-icon
                      .icon=${tableIcon}
                      class="${this.tableView ? 'active' : ''}"
                    ></kd-icon>
                  </button>
                `
              : null}

            <button
              title="Toggle Fullscreen"
              aria-label="Toggle Fullscreen"
              @click=${() => this.handleFullscreen()}
            >
              <kd-icon .icon=${maximizeIcon}></kd-icon>
            </button>

            <button
              title="Overflow Menu"
              aria-label="Overflow Menu"
              class="overflow-button"
            >
              <kd-icon .icon=${overflowIcon}></kd-icon>

              <div class="overflow-menu">
                ${!this.tableDisabled
                  ? html` <a @click=${(e: Event) => this.handleDownloadCsv(e)}>
                      Download as CSV
                    </a>`
                  : null}
                <a @click=${(e: Event) => this.handleDownloadImage(e, false)}>
                  Download as PNG
                </a>
                <a @click=${(e: Event) => this.handleDownloadImage(e, true)}>
                  Download as JPG
                </a>
              </div>
            </button>
          </div>
        </div>

        <figure class="${this.tableView ? 'hidden' : ''}">
          <canvas role="img"></canvas>
          <figcaption>
            <div
              class="closed-caption ${this.hideCaptions
                ? 'hidden-visually'
                : ''}"
            ></div>
            <div
              class="description ${this.hideDescription
                ? 'hidden-visually'
                : ''}"
            >
              ${this.description}
            </div>
          </figcaption>
        </figure>

        ${!this.tableDisabled && this.tableView
          ? html`
              <div class="table">
                <table>
                  <thead>
                    <tr>
                      ${this.labels.length
                        ? html`<th>${this.getTableAxisLabel()}</th>`
                        : null}
                      ${this.datasets.map((dataset) => {
                        return html`<th>${dataset.label}</th>`;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    ${this.datasets[0].data.map((_value: any, i: number) => {
                      return html`
                        <tr>
                          ${this.labels.length
                            ? html`<td>${this.labels[i]}</td>`
                            : null}
                          ${this.datasets.map((dataset) => {
                            const dataPoint = dataset.data[i];

                            if (Array.isArray(dataPoint)) {
                              // handle data in array format
                              return html`
                                <td>${dataPoint[0]}, ${dataPoint[1]}</td>
                              `;
                            } else if (
                              typeof dataPoint === 'object' &&
                              !Array.isArray(dataPoint) &&
                              dataPoint !== null
                            ) {
                              // handle data in object format
                              return html`
                                <td>
                                  ${Object.keys(dataPoint).map((key) => {
                                    return html`
                                      <span>${key}: ${dataPoint[key]}</span>
                                    `;
                                  })}
                                </td>
                              `;
                            } else {
                              // handle data in number/basic format
                              return html`<td>${dataset.data[i]}</td>`;
                            }
                          })}
                        </tr>
                      `;
                    })}
                  </tbody>
                </table>
              </div>
            `
          : null}
      </div>
    `;
  }

  override updated(changedProps: any) {
    // Update chart instance when data changes.
    if (
      this.chart &&
      (changedProps.has('labels') || changedProps.has('datasets'))
    ) {
      this.mergeOptions().then(() => {
        this.chart.data.labels = this.labels;
        this.chart.data.datasets = this.mergedDatasets;
        this.chart.update();
      });
    }

    // Update chart instance when options change.
    if (this.chart && changedProps.has('options')) {
      this.chart.options = this.mergedOptions;
      this.chart.update();
    }

    // Update chart instance when type or plugins change.
    if (changedProps.has('type') || changedProps.has('plugins')) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.mergeOptions().then(() => {
        this.initChart();
      });
      this.checkType();
    }
  }

  /**
   * Initializes a bar chart using the Chart.js library with provided labels, datasets,
   * and options.
   */
  private initChart() {
    // Chart.defaults.font.family =
    //   "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    this.chart = new Chart(this.canvas, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: this.mergedDatasets,
      },
      options: this.mergedOptions,
      plugins: [a11yPlugin, musicPlugin, ...this.plugins],
    });
  }

  /**
   * Merges options and dataset options into a single object.
   */
  private async mergeOptions() {
    // get default global options and chart type options
    const { options, datasetOptions } = await import(
      `../../common/config/chartTypes/${this.type}.js`
    );

    // merge default global options and chart type options
    let mergedOptions = deepmerge(globalOptions(this), options(this));
    if (this.options) {
      // merge any consumer supplied options with defaults
      mergedOptions = deepmerge(mergedOptions, this.options);
    }
    this.mergedOptions = mergedOptions;

    // merge default chart type dataset options with consumer supplied datasets
    const mergedDatasets = deepmerge(datasetOptions(this), this.datasets);

    // inject color palette
    const ignoredTypes = ['choropleth', 'treemap', 'bubbleMap'];
    const singleDatasetTypes = ['pie', 'dougnut', 'polarArea'];
    if (!ignoredTypes.includes(this.type)) {
      mergedDatasets.forEach((dataset, index) => {
        if (!dataset.backgroundColor) {
          if (singleDatasetTypes.includes(this.type)) {
            // single dataset colors
            dataset.backgroundColor = colorPalettes.default;
            // dataset.borderColor = colorPalettes.default;
          } else {
            // multi dataset colors
            dataset.backgroundColor = colorPalettes.default[index];
            dataset.borderColor = colorPalettes.default[index];
          }
        }
      });
    }
    this.mergedDatasets = mergedDatasets;
  }

  private getTableAxisLabel() {
    let label = '';

    if (this.options?.indexAxis === 'y') {
      if (this.options?.scales?.y?.title?.text) {
        label = this.options?.scales.y.title.text;
      } else {
        label = 'Y Axis';
      }
    } else {
      if (this.options?.scales?.x?.title?.text) {
        label = this.options?.scales.x.title.text;
      } else {
        label = 'X Axis';
      }
    }

    return label;
  }

  private handleViewToggle() {
    this.tableView = !this.tableView;
  }

  private checkType() {
    // chart types that can't have a data table view
    const blacklist = ['choropleth', 'bubbleMap', 'treemap'];
    this.tableDisabled = blacklist.includes(this.type);
  }

  private handleDownloadImage(e: Event, jpeg: boolean) {
    e.preventDefault();

    const imgFormat = jpeg ? 'image/jpeg' : 'image/png';
    const fileExt = jpeg ? 'jpg' : 'png';
    const a = document.createElement('a');

    a.href = this.chart.toBase64Image(imgFormat, 1);
    a.download = this.chartTitle + '.' + fileExt;

    // trigger the download
    a.click();
  }

  private handleDownloadCsv(e: Event) {
    e.preventDefault();
    let csv = '';

    for (let i = 0; i < this.chart.data.datasets.length; i++) {
      csv += convertChartDataToCSV({
        data: this.chart.data.datasets[i],
        labels: this.labels,
      });
    }
    if (csv == null) return;
    console.log(csv);

    const filename = this.chartTitle + '.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }

    // not sure if anything below this comment works
    const data = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }

  private handleFullscreen() {
    if (this.shadowRoot?.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kd-chart': KDChart;
  }
}
