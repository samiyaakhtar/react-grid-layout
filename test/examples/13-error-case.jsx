import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 7,
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 3
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  onmsdown(e) {
    e.stopPropogation();
  }

  generateDOM() {
    return [
      <div key={"1"}>
        <span className="text">{"1"}</span>
      </div>,
      <div key={"2"}>
        <span className="text">{"2"}</span>
      </div>,
      <div key={"3"}>
        <span className="text">{"3"}</span>
      </div>,
      <div key={"4"} onMouseDown={this.onmsdown} className="dragCancel header">
        <span>I am the header</span>
      </div>,
      <div key={"5"}>
        <span className="text">{"5"}</span>
      </div>,
      <div key={"6"}>
        <span className="text">{"6"}</span>
      </div>,
      <div key={"7"}>
        <span className="text">{"7"}</span>
      </div>
    ];
  }

  generateLayout() {
    return [
      {
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        i: "1"
      },
      {
        x: 1,
        y: 0,
        w: 1,
        h: 3,
        i: "2"
      },
      {
        x: 0,
        y: 1,
        w: 2,
        h: 3,
        i: "3"
      },
      {
        x: 0,
        y: 1,
        w: 3,
        h: 1,
        i: "4",
        isResizable: false
      },
      {
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        i: "5"
      },
      {
        x: 4,
        y: 0,
        w: 1,
        h: 3,
        i: "6"
      },
      {
        x: 4,
        y: 1,
        w: 2,
        h: 3,
        i: "7"
      }
    ];
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <table style={{ width: "100%" }}>
        <tr>
          <td>
            <ReactGridLayout
              layout={this.state.layout}
              onLayoutChange={this.onLayoutChange}
              draggableCancel=".dragCancel"
              {...this.props}
            >
              {this.generateDOM()}
            </ReactGridLayout>
          </td>
        </tr>
      </table>
      // <div style={{width: "100%", whiteSpace: "nowrap", display: "inline-block"}}>

      //     <div style={{width: "50%"}}>
      //       <ReactGridLayout
      //         layout={this.state.layout}
      //         onLayoutChange={this.onLayoutChange}
      //         draggableCancel='.dragCancel'
      //         {...this.props}
      //       >
      //         {this.generateDOM()}
      //       </ReactGridLayout>
      //     </div>
      //     <div style={{width: "50%", float: "right"}}>
      //       <ReactGridLayout
      //           layout={this.state.layout}
      //           onLayoutChange={this.onLayoutChange}
      //           draggableCancel='.dragCancel'
      //           {...this.props}
      //         >
      //           {this.generateDOM()}
      //         </ReactGridLayout>
      //     </div>
      // </div>
    );
  }
}

module.exports = BasicLayout;

if (require.main === module) {
  require("../test-hook.jsx")(module.exports);
}
