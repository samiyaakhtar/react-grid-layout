import React from "react";
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import Draggable from "react-draggable";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { ActionButton } from "office-ui-fabric-react";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 10,
    cols: { lg: 4, md: 4, sm: 3, xs: 2, xxs: 2 },
    rowHeight: 50,
    onLayoutChange: function() {},
    // This turns off compaction so you can place items wherever.
    verticalCompact: true
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = {
      layout,
      showPanel: false
    };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      var obj = {
        x: Math.round(i / 4),
        y: i % 4,
        w: 4,
        h: y,
        i: i.toString(),
        isResizable: false
      };
      console.log(obj);
      return obj;
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  onmsdown(e) {
    e.stopPropogation();
  }
  showPanel(show) {
    this.setState({ showPanel: show });
  }
  renderPanel() {
    return (
      <Panel
        type={PanelType.medium}
        headerText="Test panel"
        closeButtonAriaLabel="Close"
        isBlocking={false}
        isOpen={this.state.showPanel}
        onDismiss={this.setState({ showPanel: false })}
      >
        <Draggable
        // position={this.state.placeholderPosition}
        // onDrag={this.dragPlaceholder}
        // onStop={this.stopPlaceholder}
        >
          <button style={{ position: "relative", zIndex: 1000 }}>
            Drag external Item
          </button>
        </Draggable>

        <ResponsiveReactGridLayout
          // layout={this.state.layout}
          // isDraggable={false}
          draggableCancel=".dragCancel"
          layout={{
            lg: [
              { i: "0", x: 0, y: 0, w: 2, h: 1 },
              { i: "1", x: 1, y: 0, w: 2, h: 1 },
              { i: "2", x: 2, y: 0, w: 2, h: 1 },
              { i: "3", x: 3, y: 0, w: 2, h: 1 },
              { i: "4", x: 4, y: 0, w: 2, h: 1 },
              { i: "5", x: 5, y: 0, w: 2, h: 1 },
              { i: "6", x: 6, y: 0, w: 2, h: 1 },
              { i: "7", x: 7, y: 0, w: 2, h: 1 },
              { i: "8", x: 8, y: 0, w: 2, h: 1 },
              { i: "9", x: 9, y: 0, w: 2, h: 1 },
              { i: "10", x: 10, y: 0, w: 2, h: 1 }
            ]
          }}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </Panel>
    );
  }
  render() {
    return (
      <div>
        <ActionButton text="test" onClick={() => this.showPanel(true)} />

        {this.renderPanel()}
        <Draggable
        // position={this.state.placeholderPosition}
        // onDrag={this.dragPlaceholder}
        // onStop={this.stopPlaceholder}
        >
          <button style={{ position: "relative", zIndex: 1000 }}>
            Drag external Item
          </button>
        </Draggable>
        <ResponsiveReactGridLayout
          layout={this.state.layout}
          // isDraggable={false}
          draggableCancel=".dragCancel"
          // data-grid={
          //   {lg: [
          //     {i: '0', x: 0, y: 0, w: 2, h:1},
          //     {i: '1', x: 0, y: 0, w: 2, h:1},
          //     {i: '2', x: 1, y: 0, w: 2, h:1},
          //     {i: '3', x: 1, y: 0, w: 2, h:1},
          //     {i: '4', x: 2, y: 0, w: 2, h:1},
          //     {i: '5', x: 2, y: 0, w: 2, h:1},
          //     {i: '6', x: 3, y: 0, w: 2, h:1},
          //     {i: '7', x: 3, y: 0, w: 2, h:1},
          //     {i: '8', x: 8, y: 0, w: 2, h:1},
          //     {i: '9', x: 9, y: 0, w: 2, h:1},
          //     {i: '10', x: 10, y: 0, w: 2, h:1, isResizable: true},
          //     {i: '11', x: 10, y: 0, w: 2, h:1, isResizable: false},
          //   ]}
          // }
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {this.generateDOM()}
          <div key={10}>
            <span className="text">10 yo</span>
          </div>
          <div
            key={11}
            onMouseDown={this.onmsdown}
            className="dragCancel header"
          >
            <span>I am the header</span>
          </div>
          <div key={12}>
            <span className="text">12 yo</span>
          </div>
          <div key={13}>
            <span className="text">13 yo</span>
          </div>
          <div key={14}>
            <span className="text">14 yo</span>
          </div>
          <div key={15}>
            <span className="text">15 yo</span>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

module.exports = NoCompactingLayout;

if (require.main === module) {
  require("../test-hook.jsx")(module.exports);
}
