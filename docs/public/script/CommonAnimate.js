/**
 *   Create by Malson on 2018/6/1
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim';

class Animate extends React.Component{
  render(){
    let {type} = this.props;
    let defaultChange = [
      { opacity: [1, 0], translateX: [0, 8] },
      { opacity: [1, 0], translateX: [0, -8] }
    ];
    let showChange = type==='top'?[
      { opacity: [1, 0], translateY: [0, 15] },
      { opacity: [1, 0], translateY: [0, -15] }
    ]:defaultChange;
    return(
        <QueueAnim className="demo-content" animConfig={showChange}>
          { this.props.children }
        </QueueAnim>
    )
  }
}
export default Animate;