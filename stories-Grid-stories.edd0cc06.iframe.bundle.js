"use strict";(self.webpackChunk_kyndryl_design_system_shidoka_charts=self.webpackChunk_kyndryl_design_system_shidoka_charts||[]).push([[903],{"./src/common/config/chartArgTypes.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={colorPalette:{options:["categorical","sequential01","sequential02","sequential03","sequential04","sequential05","divergent01","divergent02"],control:{type:"select"}},type:{table:{disable:!0}},width:{control:{type:"number"}},height:{control:{type:"number"}},plugins:{table:{disable:!0}}}},"./src/stories/Grid.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Full:()=>Full,Half:()=>Half,Third:()=>Third,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js");__webpack_require__("./src/components/chart/index.ts"),__webpack_require__("./src/common/config/chartArgTypes.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Guidelines/Grid",argTypes:{height:{control:{type:"number"}}}},args={noBorder:!1,height:null},Full={args,render:args=>lit__WEBPACK_IMPORTED_MODULE_0__.qy` <div class="kd-grid">
      <div class="kd-grid__col--sm-4 kd-grid__col--md-8 kd-grid__col--lg-12">
        <kd-chart
          type="bar"
          chartTitle="Bar Chart"
          description="Full Example"
          .height=${args.height}
          ?noBorder=${args.noBorder}
          .labels=${["Red","Blue","Yellow","Green","Purple","Orange"]}
          .datasets=${[{label:"Dataset 1",data:[12,19,3,5,2,3]},{label:"Dataset 2",data:[8,15,7,9,6,13]}]}
          .options=${{scales:{x:{title:{text:"Color"}},y:{title:{text:"Votes"}}}}}
        ></kd-chart>
      </div>
    </div>`},Half={args,render:args=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <div class="kd-grid">
        <div class="kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-6">
          <kd-chart
            type="bar"
            chartTitle="Bar Chart"
            description="Half Example"
            .height=${args.height}
            ?noBorder=${args.noBorder}
            .labels=${["Red","Blue","Yellow","Green","Purple","Orange"]}
            .datasets=${[{label:"Dataset 1",data:[12,19,3,5,2,3]},{label:"Dataset 2",data:[8,15,7,9,6,13]}]}
            .options=${{aspectRatio:1.25,scales:{x:{title:{text:"Color"}},y:{title:{text:"Votes"}}}}}
          ></kd-chart>
        </div>

        <div class="kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-6">
          <kd-chart
            type="doughnut"
            chartTitle="Doughnut Chart"
            description="Half Example"
            .height=${args.height}
            ?noBorder=${args.noBorder}
            .labels=${["Blue","Red","Orange","Yellow","Green","Purple"]}
            .datasets=${[{label:"Dataset 1",data:[12,19,3,5,2,3]}]}
            .options=${{aspectRatio:1.25,scales:{x:{title:{text:"Color"}},y:{title:{text:"Votes"}}}}}
          ></kd-chart>
        </div>
      </div>
    `},Third={args,render:args=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <div class="kd-grid">
        <div class="kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-4">
          <kd-chart
            type="bar"
            chartTitle="Bar Chart"
            description="Third Example"
            .height=${args.height}
            ?noBorder=${args.noBorder}
            .labels=${["Red","Blue","Yellow","Green","Purple","Orange"]}
            .datasets=${[{label:"Dataset 1",data:[12,19,3,5,2,3]},{label:"Dataset 2",data:[8,15,7,9,6,13]}]}
            .options=${{aspectRatio:1,scales:{x:{title:{text:"Color"}},y:{title:{text:"Votes"}}}}}
          ></kd-chart>
        </div>

        <div class="kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-4">
          <kd-chart
            type="doughnut"
            chartTitle="Doughnut Chart"
            description="Third Example"
            .height=${args.height}
            ?noBorder=${args.noBorder}
            .labels=${["Blue","Red","Orange","Yellow","Green","Purple"]}
            .datasets=${[{label:"Dataset 1",data:[12,19,3,5,2,3]}]}
            .options=${{scales:{x:{title:{text:"Color"}},y:{title:{text:"Votes"}}}}}
          ></kd-chart>
        </div>

        <div class="kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-4">
          <kd-chart
            type="line"
            chartTitle="Line Chart"
            description="Third Example"
            .height=${args.height}
            ?noBorder=${args.noBorder}
            .labels=${["Red","Blue","Yellow","Green","Purple","Orange"]}
            .datasets=${[{label:"Dataset 1",data:[12,19,3,5,2,3]},{label:"Dataset 2",data:[8,15,7,9,6,13]}]}
            .options=${{aspectRatio:1,scales:{x:{title:{text:"Color"}},y:{title:{text:"Votes"}}}}}
          ></kd-chart>
        </div>
      </div>
    `};Full.parameters={...Full.parameters,docs:{...Full.parameters?.docs,source:{originalSource:"{\n  args,\n  render: args => {\n    return html` <div class=\"kd-grid\">\n      <div class=\"kd-grid__col--sm-4 kd-grid__col--md-8 kd-grid__col--lg-12\">\n        <kd-chart\n          type=\"bar\"\n          chartTitle=\"Bar Chart\"\n          description=\"Full Example\"\n          .height=${args.height}\n          ?noBorder=${args.noBorder}\n          .labels=${['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}\n          .datasets=${[{\n      label: 'Dataset 1',\n      data: [12, 19, 3, 5, 2, 3]\n    }, {\n      label: 'Dataset 2',\n      data: [8, 15, 7, 9, 6, 13]\n    }]}\n          .options=${{\n      scales: {\n        x: {\n          title: {\n            text: 'Color'\n          }\n        },\n        y: {\n          title: {\n            text: 'Votes'\n          }\n        }\n      }\n    }}\n        ></kd-chart>\n      </div>\n    </div>`;\n  }\n}",...Full.parameters?.docs?.source}}},Half.parameters={...Half.parameters,docs:{...Half.parameters?.docs,source:{originalSource:"{\n  args,\n  render: args => {\n    return html`\n      <div class=\"kd-grid\">\n        <div class=\"kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-6\">\n          <kd-chart\n            type=\"bar\"\n            chartTitle=\"Bar Chart\"\n            description=\"Half Example\"\n            .height=${args.height}\n            ?noBorder=${args.noBorder}\n            .labels=${['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}\n            .datasets=${[{\n      label: 'Dataset 1',\n      data: [12, 19, 3, 5, 2, 3]\n    }, {\n      label: 'Dataset 2',\n      data: [8, 15, 7, 9, 6, 13]\n    }]}\n            .options=${{\n      aspectRatio: 1.25,\n      scales: {\n        x: {\n          title: {\n            text: 'Color'\n          }\n        },\n        y: {\n          title: {\n            text: 'Votes'\n          }\n        }\n      }\n    }}\n          ></kd-chart>\n        </div>\n\n        <div class=\"kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-6\">\n          <kd-chart\n            type=\"doughnut\"\n            chartTitle=\"Doughnut Chart\"\n            description=\"Half Example\"\n            .height=${args.height}\n            ?noBorder=${args.noBorder}\n            .labels=${['Blue', 'Red', 'Orange', 'Yellow', 'Green', 'Purple']}\n            .datasets=${[{\n      label: 'Dataset 1',\n      data: [12, 19, 3, 5, 2, 3]\n    }]}\n            .options=${{\n      aspectRatio: 1.25,\n      scales: {\n        x: {\n          title: {\n            text: 'Color'\n          }\n        },\n        y: {\n          title: {\n            text: 'Votes'\n          }\n        }\n      }\n    }}\n          ></kd-chart>\n        </div>\n      </div>\n    `;\n  }\n}",...Half.parameters?.docs?.source}}},Third.parameters={...Third.parameters,docs:{...Third.parameters?.docs,source:{originalSource:"{\n  args,\n  render: args => {\n    return html`\n      <div class=\"kd-grid\">\n        <div class=\"kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-4\">\n          <kd-chart\n            type=\"bar\"\n            chartTitle=\"Bar Chart\"\n            description=\"Third Example\"\n            .height=${args.height}\n            ?noBorder=${args.noBorder}\n            .labels=${['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}\n            .datasets=${[{\n      label: 'Dataset 1',\n      data: [12, 19, 3, 5, 2, 3]\n    }, {\n      label: 'Dataset 2',\n      data: [8, 15, 7, 9, 6, 13]\n    }]}\n            .options=${{\n      aspectRatio: 1,\n      scales: {\n        x: {\n          title: {\n            text: 'Color'\n          }\n        },\n        y: {\n          title: {\n            text: 'Votes'\n          }\n        }\n      }\n    }}\n          ></kd-chart>\n        </div>\n\n        <div class=\"kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-4\">\n          <kd-chart\n            type=\"doughnut\"\n            chartTitle=\"Doughnut Chart\"\n            description=\"Third Example\"\n            .height=${args.height}\n            ?noBorder=${args.noBorder}\n            .labels=${['Blue', 'Red', 'Orange', 'Yellow', 'Green', 'Purple']}\n            .datasets=${[{\n      label: 'Dataset 1',\n      data: [12, 19, 3, 5, 2, 3]\n    }]}\n            .options=${{\n      scales: {\n        x: {\n          title: {\n            text: 'Color'\n          }\n        },\n        y: {\n          title: {\n            text: 'Votes'\n          }\n        }\n      }\n    }}\n          ></kd-chart>\n        </div>\n\n        <div class=\"kd-grid__col--sm-4 kd-grid__col--md-4 kd-grid__col--lg-4\">\n          <kd-chart\n            type=\"line\"\n            chartTitle=\"Line Chart\"\n            description=\"Third Example\"\n            .height=${args.height}\n            ?noBorder=${args.noBorder}\n            .labels=${['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}\n            .datasets=${[{\n      label: 'Dataset 1',\n      data: [12, 19, 3, 5, 2, 3]\n    }, {\n      label: 'Dataset 2',\n      data: [8, 15, 7, 9, 6, 13]\n    }]}\n            .options=${{\n      aspectRatio: 1,\n      scales: {\n        x: {\n          title: {\n            text: 'Color'\n          }\n        },\n        y: {\n          title: {\n            text: 'Votes'\n          }\n        }\n      }\n    }}\n          ></kd-chart>\n        </div>\n      </div>\n    `;\n  }\n}",...Third.parameters?.docs?.source}}};const __namedExportsOrder=["Full","Half","Third"]}}]);
//# sourceMappingURL=stories-Grid-stories.edd0cc06.iframe.bundle.js.map